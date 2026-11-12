import {
	SiDiscord,
	SiGithub,
	SiSpotify,
	SiTwitch,
	SiYoutube
} from '@icons-pack/react-simple-icons';
import type { SocialId } from '@/lib/site';

const icons = {
	discord: SiDiscord,
	github: SiGithub,
	youtube: SiYoutube,
	spotify: SiSpotify,
	twitch: SiTwitch
};

export function SocialIcon({ id, className = 'size-4' }: { id: SocialId; className?: string }) {
	const Icon = icons[id];
	return <Icon className={className} aria-hidden="true" />;
}
