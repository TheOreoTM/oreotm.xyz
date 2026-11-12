'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * The site's ground: a slow marbling, like cream turned through something darker, printed
 * in the theme's own colours and fixed behind every page.
 *
 * Nothing is downloaded. A WebGL fragment shader folds noise through itself (domain
 * warping), then cuts the result into three flat tones taken from the page's CSS variables,
 * with a fine hatch and grain at the cuts so it reads as print rather than gradient. The
 * pointer is a lamp: near it the marbling comes up brighter, is stirred a little, and its
 * contours are drawn in the primary colour.
 *
 * It is at full strength at the top of the home page and quieter everywhere there is
 * something to read: further down the home page, and on every other page.
 *
 * It draws to a pixel budget, 30 times a second while the lamp is lit and five while the
 * pointer rests, stops in a hidden tab, and follows the theme toggle. With reduced motion it draws one still frame. Without
 * JavaScript or WebGL the page keeps its plain background.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision highp float;
uniform vec2 res;    // canvas, in device pixels
uniform vec2 lamp;   // pointer, 0..1 from the top left
uniform float glow;  // lamp strength
uniform float time;
uniform float px;    // canvas pixels per CSS pixel
uniform float level; // overall strength: 1 at the top of the home page, less where there is text
uniform vec3 c1;     // quietest tone
uniform vec3 c2;
uniform vec3 c3;
uniform vec3 ink;    // accent

float hash(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 q){
  vec2 i = floor(q), f = fract(q);
  f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), f.x), f.y);
}
float fbm(vec2 q){
  float v = 0., a = .5;
  for (int i = 0; i < 4; i++) { v += a * noise(q); q = q * 2.03 + 17.; a *= .5; }
  return v;
}

// Three octaves: enough for the two folds, which only steer the last one.
float fbm3(vec2 q){
  float v = 0., a = .5;
  for (int i = 0; i < 3; i++) { v += a * noise(q); q = q * 2.03 + 17.; a *= .5; }
  return v;
}

void main(){
  vec2 uv = vec2(gl_FragCoord.x / res.x, 1. - gl_FragCoord.y / res.y);
  float a = res.x / res.y;
  vec2 p = vec2(uv.x * a, uv.y);

  // The lamp, and the stir around it.
  vec2 d = p - vec2(lamp.x * a, lamp.y);
  // The lamp's reach is a share of the shorter side, so it is no wider on a phone.
  float reach = .09 * min(1., a * a);
  float beam = exp(-dot(d, d) / reach);
  p += vec2(-d.y, d.x) * beam * .22 * glow;

  // Noise folded through itself twice: the marbling.
  float t = time * .035;
  vec2 q = vec2(fbm3(p * 1.5 + vec2(0., t)), fbm3(p * 1.5 + vec2(5.2, -t)));
  vec2 r = vec2(fbm3(p * 1.5 + 3. * q + vec2(1.7, 9.2) + t), fbm3(p * 1.5 + 3. * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.5 + 3.2 * r);

  // The lamp only brightens the marbling where the page is not mostly text (level near 1);
  // elsewhere it still draws its contours.
  float l = f * (.78 + glow * .7 * beam * smoothstep(.86, 1., level)) * level;

  vec2 fc = gl_FragCoord.xy / px;
  // A trace of hatch and grain, so the cuts read as print, not vector.
  float n = l + sin((fc.x + fc.y) * 1.9) * .006 + (hash(floor(gl_FragCoord.xy)) - .5) * .008;

  // Each cut is about one device pixel wide whatever the slope of the field under it:
  // AA() is the field's change per pixel where the browser can report it.
  float w = AA(l) * .75 + .0005;
  float k1 = smoothstep(.335 - w, .335 + w, n);
  float k2 = smoothstep(.44 - w, .44 + w, n);
  float k3 = smoothstep(.55 - w, .55 + w, n);
  vec3 col = mix(mix(c1, c2, k2), c3, k3);
  float alpha = k1;

  // Contours in the accent colour, only where the lamp is.
  // Contours as even hairlines, a little over a pixel wide, for the same reason.
  // They follow the marbling itself, not the lamp's brightening of it, so they stay put
  // and the lamp only reveals them.
  float v9 = f * 13.;
  float lw = AA(v9);
  float line = 1. - smoothstep(lw * .3, lw * .85, abs(fract(v9 + .5) - .5));
  // Full strength at the top of the home page, a third of it where there is text to read.
  float lit = line * beam * glow * mix(.3, .6, smoothstep(.86, 1., level));
  col = mix(col, ink, lit);
  alpha = max(alpha, lit);

  gl_FragColor = vec4(col * alpha, alpha);
}`;

/** Milliseconds after the pointer rests before the lamp starts to go out. */
const REST = 2600;

/** The most pixels the canvas draws; above this it is drawn smaller and scaled up. Enough for
 *  a 1600x1000 window at one canvas pixel per CSS pixel. */
const BUDGET = 1.6e6;

/** Strength where there is text to read over it. */
const QUIET = 0.86;

export function Marble() {
	const pathname = usePathname();
	const pathRef = useRef(pathname);
	const hostRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [shown, setShown] = useState(false);
	const redrawRef = useRef(() => {});

	useEffect(() => {
		const host = hostRef.current;
		const canvas = canvasRef.current;
		if (!host || !canvas) return;
		const gl = canvas.getContext('webgl', {
			alpha: true,
			premultipliedAlpha: true,
			antialias: false,
			powerPreference: 'low-power'
		});
		if (!gl) return;

		const compile = (type: number, source: string) => {
			const shader = gl.createShader(type)!;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			return shader;
		};
		// With screen-space derivatives the cuts and contours can be exactly a pixel wide. Without
		// them (rare), a fixed width that suits a typical window.
		const fragment = gl.getExtension('OES_standard_derivatives')
			? `#extension GL_OES_standard_derivatives : enable\n#define AA(x) fwidth(x)\n${FRAG}`
			: `#define AA(x) 0.006\n${FRAG}`;
		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const at = gl.getAttribLocation(program, 'p');
		gl.enableVertexAttribArray(at);
		gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
		const u = Object.fromEntries(
			['res', 'lamp', 'glow', 'time', 'px', 'level', 'c1', 'c2', 'c3', 'ink'].map((name) => [
				name,
				gl.getUniformLocation(program, name)
			])
		);

		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let width = 2;
		let height = 2;
		let scale = 1;
		let lost = false;

		// The three tones and the accent come from the theme, so the toggle repaints it.
		const probe = document.createElement('span');
		probe.style.display = 'none';
		host.append(probe);
		const rgb = (variable: string) => {
			probe.style.color = `var(${variable})`;
			const parts = getComputedStyle(probe).color.match(/[\d.]+/g) ?? ['0', '0', '0'];
			return parts.slice(0, 3).map((part) => Number(part) / 255) as [number, number, number];
		};
		// Three tones stepped from the muted surface towards the faint text colour. The steps are
		// small on purpose: muted text at body size still clears 4.5:1 on the brightest one
		// (about 5.2:1 dark, 5:1 light), and none of them equals the hairline colour.
		const tones = () => {
			const muted = rgb('--muted');
			const faint = rgb('--faint');
			const step = (t: number) => muted.map((v, k) => v * (1 - t) + faint[k] * t) as typeof muted;
			gl.uniform3f(u.c1, ...muted);
			gl.uniform3f(u.c2, ...step(0.18));
			gl.uniform3f(u.c3, ...step(0.42));
			gl.uniform3f(u.ink, ...rgb('--primary'));
		};

		// Drawn to a budget (1.6 million pixels), not to the screen; CSS scales it up.
		const size = () => {
			const box = host.getBoundingClientRect();
			scale = Math.min(
				devicePixelRatio || 1,
				1.5,
				Math.sqrt(BUDGET / Math.max(1, box.width * box.height))
			);
			width = Math.max(2, Math.round(box.width * scale));
			height = Math.max(2, Math.round(box.height * scale));
			canvas.width = width;
			canvas.height = height;
			gl.viewport(0, 0, width, height);
		};

		// The lamp eases after the pointer, or a tap, and goes out once it rests.
		let targetX = 0.7;
		let targetY = 0.35;
		let x = targetX;
		let y = targetY;
		let glow = still ? 0.6 : 0;
		let moved = -1e9;
		const onMove = (event: PointerEvent) => {
			// A mouse leads the lamp as it moves; a finger or pen places it where it lands.
			if (event.type === 'pointermove' && event.pointerType !== 'mouse') return;
			const box = host.getBoundingClientRect();
			targetX = (event.clientX - box.left) / box.width;
			targetY = (event.clientY - box.top) / box.height;
			moved = event.timeStamp;
		};

		// Full strength at the top of the home page, easing down over the first screen of
		// scrolling; quiet on every page that is mostly reading.
		const level = () => {
			if (pathRef.current !== '/') return QUIET;
			const t = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.8)));
			return 1 + (QUIET - 1) * t * t * (3 - 2 * t);
		};

		const draw = (time: number, step: number) => {
			// The lamp follows the pointer and goes out a few seconds after it rests.
			const idle = time - moved > REST;
			const ease = still ? 1 : 1 - Math.exp(-step / 160);
			x += (targetX - x) * ease;
			y += (targetY - y) * ease;
			if (!still) glow += ((idle ? 0 : 1) - glow) * (1 - Math.exp(-step / (idle ? 900 : 400)));
			gl.uniform2f(u.res, width, height);
			gl.uniform2f(u.lamp, x, y);
			gl.uniform1f(u.glow, glow);
			gl.uniform1f(u.time, still ? 40 : time / 1000);
			gl.uniform1f(u.px, scale);
			gl.uniform1f(u.level, level());
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			setShown(true);
		};

		let frame = 0;
		let last = 0;
		const loop = (time: number) => {
			frame = 0;
			if (lost || still || document.hidden) return;
			// While the lamp is lit: 30 frames a second. Once it is out only the slow drift is
			// left, and five a second is plenty for that.
			const every = time - moved > REST && glow < 0.03 ? 200 : 32;
			if (time - last >= every) {
				draw(time, Math.min(100, time - last));
				last = time;
			}
			frame = requestAnimationFrame(loop);
		};
		const wake = () => {
			if (!frame && !still) frame = requestAnimationFrame(loop);
		};
		const redraw = () => {
			if (lost) return;
			if (still) draw(0, 0);
			else wake();
		};

		size();
		tones();
		redraw();
		redrawRef.current = redraw;
		const onScroll = () => still && redraw();
		addEventListener('scroll', onScroll, { passive: true });

		const resized = new ResizeObserver(() => {
			size();
			redraw();
		});
		resized.observe(host);
		const themed = new MutationObserver(() => {
			tones();
			redraw();
		});
		themed.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		const onLost = (event: Event) => {
			event.preventDefault();
			lost = true;
			setShown(false);
		};
		canvas.addEventListener('webglcontextlost', onLost);
		addEventListener('pointermove', onMove, { passive: true });
		addEventListener('pointerdown', onMove, { passive: true });
		document.addEventListener('visibilitychange', wake);

		return () => {
			cancelAnimationFrame(frame);
			resized.disconnect();
			themed.disconnect();
			canvas.removeEventListener('webglcontextlost', onLost);
			removeEventListener('pointermove', onMove);
			removeEventListener('pointerdown', onMove);
			removeEventListener('scroll', onScroll);
			redrawRef.current = () => {};
			document.removeEventListener('visibilitychange', wake);
			probe.remove();
		};
	}, []);

	// A new page changes the strength; with reduced motion nothing else would redraw it.
	useEffect(() => {
		pathRef.current = pathname;
		redrawRef.current();
	}, [pathname]);

	return (
		<div ref={hostRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
			<canvas
				ref={canvasRef}
				className={`size-full transition-opacity duration-1000 ${shown ? 'opacity-100' : 'opacity-0'}`}
			/>
		</div>
	);
}
