import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/** The shared link-preview card: a dark, terminal-style title card. */
export function ogImage({
	eyebrow,
	title,
	subtitle
}: {
	eyebrow: string;
	title: string;
	subtitle?: string;
}) {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 72,
				background: '#0c0c0d',
				color: '#ececec',
				fontFamily: 'sans-serif'
			}}
		>
			<div style={{ display: 'flex', fontSize: 30, color: '#a3a3a8' }}>
				<span style={{ color: '#a3e635', marginRight: 16 }}>{'>'}</span>
				{eyebrow}
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
					{title}
				</div>
				{subtitle && (
					<div style={{ marginTop: 24, fontSize: 34, color: '#a3a3a8', lineHeight: 1.3 }}>
						{subtitle}
					</div>
				)}
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					borderTop: '2px solid #27272b',
					paddingTop: 28,
					fontSize: 28,
					color: '#a3a3a8'
				}}
			>
				<span>oreotm.xyz</span>
				<span style={{ color: '#a3e635' }}>Full-stack developer</span>
			</div>
		</div>,
		ogSize
	);
}
