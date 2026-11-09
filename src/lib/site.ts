/** Facts about the site and its owner, shared by pages, the terminal and the command menu. */

export const site = {
	name: 'OreoTM',
	handle: 'theoreotm',
	role: 'Full-stack developer',
	location: 'Maldives',
	timeZone: 'Indian/Maldives',
	utcOffset: 'GMT+5',
	repo: 'https://github.com/TheOreoTM/oreotm.xyz'
};

export type PageLink = { path: string; label: string; description: string };

export const pages: PageLink[] = [
	{ path: '/', label: 'home', description: 'Who I am and what I build' },
	{ path: '/projects', label: 'projects', description: 'Case studies of things I have built' },
	{ path: '/blog', label: 'blog', description: 'Posts and notes' },
	{ path: '/contact', label: 'contact', description: 'How to reach me' }
];

export type SocialId = 'discord' | 'github' | 'x' | 'youtube' | 'spotify' | 'twitch';

export type Social = {
	id: SocialId;
	label: string;
	href: string;
	handle?: string;
	/** Shown on the contact page as a way to reach me. */
	contact?: { note: string };
};

export const socials: Social[] = [
	{
		id: 'discord',
		label: 'Discord',
		handle: '@theoreotm',
		href: 'https://discord.com/users/600707283097485322',
		contact: { note: 'Send me a message.' }
	},
	{
		id: 'github',
		label: 'GitHub',
		handle: 'theoreotm',
		href: 'https://github.com/theoreotm',
		contact: { note: "See what I'm working on." }
	},
	{
		id: 'x',
		label: 'X (Twitter)',
		handle: '@theoreotm',
		href: 'https://twitter.com/theoreotm',
		contact: { note: 'Follow along.' }
	},
	{
		id: 'youtube',
		label: 'YouTube',
		href: 'https://www.youtube.com/channel/UCOHPqs9jE_0SsLcZU9UI0iA'
	},
	{ id: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/user/oreo_tm' },
	{ id: 'twitch', label: 'Twitch', handle: 'theoreotm', href: 'https://www.twitch.tv/theoreotm' }
];

export const toolbox: { group: string; items: string[] }[] = [
	{ group: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'Python'] },
	{ group: 'Backend & data', items: ['Node.js', 'PostgreSQL', 'Redis', 'MongoDB', 'Prisma'] },
	{ group: 'Frontend', items: ['SvelteKit', 'Next.js', 'React', 'Tailwind CSS'] },
	{ group: 'Bots', items: ['discord.js', 'Sapphire'] },
	{ group: 'Tooling', items: ['Docker', 'Git', 'GitHub Actions', 'Vercel'] }
];

const timeFormatter = new Intl.DateTimeFormat('en', {
	timeZone: site.timeZone,
	hour: 'numeric',
	minute: '2-digit'
});

/** The current time where I live, e.g. "3:42 PM". */
export function localTime(date = new Date()) {
	return timeFormatter.format(date);
}
