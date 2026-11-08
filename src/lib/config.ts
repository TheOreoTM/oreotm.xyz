import { dev } from '$app/environment';

export const siteName = 'OreoTM';
export const siteDescription =
	'OreoTM is a full-stack developer based in the Maldives, building Discord bots, websites, and backend projects.';
export const url = dev ? 'http://localhost:5173' : 'https://oreotm.xyz';
export const defaultImage = `${url}/discord-pfp.png`;

// Used by the RSS feed.
export const title = 'OreoTM.';
export const description =
	'My own personal blog. Because everyone and their grandmother has one nowadays';
