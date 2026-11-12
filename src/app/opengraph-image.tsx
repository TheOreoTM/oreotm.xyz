import { ogImage, ogSize } from '@/lib/og';

export const alt = 'OreoTM, full-stack developer';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
	return ogImage({
		eyebrow: 'whoami',
		title: "I'm OreoTM, a full-stack developer",
		subtitle: 'Building Discord bots, websites, and the backends behind them.'
	});
}
