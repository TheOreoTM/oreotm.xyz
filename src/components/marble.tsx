'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The ground behind the home page's hero: a slow marbling, like cream turned through
 * something darker, printed in the theme's own colours.
 *
 * Nothing is downloaded. A WebGL fragment shader folds noise through itself (domain
 * warping), then cuts the result into three flat tones taken from the page's CSS variables,
 * with a fine hatch and grain at the cuts so it reads as print rather than gradient. The
 * pointer is a lamp: near it the marbling comes up brighter, is stirred a little, and its
 * contours are drawn in the accent colour.
 *
 * It draws to a pixel budget and at most 30 times a second, stops while off screen or in a
 * hidden tab, and follows the theme toggle. With reduced motion it draws one still frame.
 * Without JavaScript or WebGL the page keeps its plain background.
 */

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision highp float;
uniform vec2 res;    // canvas, in device pixels
uniform vec2 lamp;   // pointer, 0..1 from the top left
uniform float glow;  // lamp strength
uniform float time;
uniform float px;    // canvas pixels per CSS pixel
uniform float tall;  // 1 on portrait screens
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

void main(){
  vec2 uv = vec2(gl_FragCoord.x / res.x, 1. - gl_FragCoord.y / res.y);
  float a = res.x / res.y;
  vec2 p = vec2(uv.x * a, uv.y);

  // The lamp, and the stir around it.
  vec2 d = p - vec2(lamp.x * a, lamp.y);
  float beam = exp(-dot(d, d) / .09);
  p += vec2(-d.y, d.x) * beam * .22 * glow;

  // Noise folded through itself twice: the marbling.
  float t = time * .035;
  vec2 q = vec2(fbm(p * 1.5 + vec2(0., t)), fbm(p * 1.5 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.5 + 3. * q + vec2(1.7, 9.2) + t), fbm(p * 1.5 + 3. * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.5 + 3.2 * r);

  float l = f * (.72 + glow * .7 * beam);
  // Quiet behind the headline (the left on wide screens, everything on narrow ones)…
  l *= mix(mix(.62, 1., smoothstep(.12, .55, uv.x)), .7, tall);
  // …and it runs out before the page's next section.
  float fade = 1. - smoothstep(.55, 1., uv.y);

  vec2 fc = gl_FragCoord.xy / px;
  float n = l + sin((fc.x + fc.y) * 1.9) * .018 + (hash(floor(gl_FragCoord.xy)) - .5) * .02;

  float k1 = smoothstep(.335, .345, n);
  float k2 = smoothstep(.435, .445, n);
  float k3 = smoothstep(.545, .555, n);
  vec3 col = mix(mix(c1, c2, k2), c3, k3);
  float alpha = k1;

  // Contours in the accent colour, only where the lamp is.
  float line = 1. - smoothstep(.004, .011, abs(fract(l * 9. + .5) - .5));
  float lit = line * beam * glow * .85;
  col = mix(col, ink, lit);
  alpha = max(alpha, lit);

  alpha *= fade;
  gl_FragColor = vec4(col * alpha, alpha);
}`;

export function Marble() {
	const hostRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [shown, setShown] = useState(false);

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
		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const at = gl.getAttribLocation(program, 'p');
		gl.enableVertexAttribArray(at);
		gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
		const u = Object.fromEntries(
			['res', 'lamp', 'glow', 'time', 'px', 'tall', 'c1', 'c2', 'c3', 'ink'].map((name) => [
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
		const tones = () => {
			const border = rgb('--border');
			const faint = rgb('--faint');
			gl.uniform3f(u.c1, ...rgb('--muted'));
			gl.uniform3f(u.c2, ...border);
			// The brightest tone: a step from the border colour towards the faint text colour.
			gl.uniform3f(u.c3, ...(border.map((v, k) => v * 0.62 + faint[k] * 0.38) as typeof border));
			gl.uniform3f(u.ink, ...rgb('--primary'));
		};

		// Drawn to a budget (700 thousand pixels), not to the screen; CSS scales it up.
		const size = () => {
			const box = host.getBoundingClientRect();
			scale = Math.min(
				devicePixelRatio || 1,
				1.5,
				Math.sqrt(7e5 / Math.max(1, box.width * box.height))
			);
			width = Math.max(2, Math.round(box.width * scale));
			height = Math.max(2, Math.round(box.height * scale));
			canvas.width = width;
			canvas.height = height;
			gl.viewport(0, 0, width, height);
		};

		// The lamp eases after the pointer; with no mouse it wanders on its own.
		let targetX = 0.7;
		let targetY = 0.35;
		let x = targetX;
		let y = targetY;
		let glow = still ? 0.6 : 0;
		let moved = -1e9;
		const onMove = (event: PointerEvent) => {
			if (event.pointerType !== 'mouse') return;
			const box = host.getBoundingClientRect();
			targetX = (event.clientX - box.left) / box.width;
			targetY = (event.clientY - box.top) / box.height;
			moved = event.timeStamp;
		};

		const draw = (time: number, step: number) => {
			const idle = time - moved > 2600;
			const tx = idle ? 0.68 + Math.sin(time / 3100) * 0.18 : targetX;
			const ty = idle ? 0.36 + Math.sin(time / 4300 + 1) * 0.14 : targetY;
			const ease = still ? 1 : 1 - Math.exp(-step / (idle ? 800 : 160));
			x += (tx - x) * ease;
			y += (ty - y) * ease;
			if (!still) glow += ((idle ? 0.6 : 1) - glow) * (1 - Math.exp(-step / 600));
			gl.uniform2f(u.res, width, height);
			gl.uniform2f(u.lamp, x, y);
			gl.uniform1f(u.glow, glow);
			gl.uniform1f(u.time, still ? 40 : time / 1000);
			gl.uniform1f(u.px, scale);
			gl.uniform1f(u.tall, height > width ? 1 : 0);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			setShown(true);
		};

		let frame = 0;
		let last = 0;
		let visible = false;
		const loop = (time: number) => {
			frame = 0;
			if (lost || still || !visible || document.hidden) return;
			if (time - last >= 32) {
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
		const seen = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) wake();
		});
		seen.observe(host);
		const onLost = (event: Event) => {
			event.preventDefault();
			lost = true;
			setShown(false);
		};
		canvas.addEventListener('webglcontextlost', onLost);
		addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('visibilitychange', wake);

		return () => {
			cancelAnimationFrame(frame);
			resized.disconnect();
			themed.disconnect();
			seen.disconnect();
			canvas.removeEventListener('webglcontextlost', onLost);
			removeEventListener('pointermove', onMove);
			document.removeEventListener('visibilitychange', wake);
			probe.remove();
		};
	}, []);

	return (
		// Laid against the page, not the content column: with no positioned ancestor, inset-x-0 is
		// the page's own width, so it never causes sideways scrolling.
		<div
			ref={hostRef}
			className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[min(52rem,115svh)]"
			aria-hidden="true"
		>
			<canvas
				ref={canvasRef}
				className={`size-full transition-opacity duration-1000 ${shown ? 'opacity-100' : 'opacity-0'}`}
			/>
		</div>
	);
}
