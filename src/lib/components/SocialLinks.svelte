<script>
	import SocialButton from '$lib/components/SocialButton.svelte';
</script>

<div class="flex-row flex justify-between space-x-4">
	<SocialButton href="https://discord.com/users/600707283097485322" icon="fa-brands fa-discord"
		>Discord.</SocialButton
	>
	<SocialButton href="https://github.com/theoreotm" icon="fa-brands fa-github">GitHub.</SocialButton
	>
	<SocialButton
		href="https://www.youtube.com/channel/UCOHPqs9jE_0SsLcZU9UI0iA"
		icon="fa-brands fa-youtube">Youtube.</SocialButton
	>
	<SocialButton
		className="hidden lg:inline"
		href="https://open.spotify.com/user/oreo_tm"
		icon="fa-brands fa-spotify">Spotify.</SocialButton
	>
	<SocialButton
		className="hidden lg:inline"
		href="https://www.twitch.tv/theoreotm"
		icon="fa-brands fa-twitch">Twitch.</SocialButton
	>
	<SocialButton
		className="hidden md:inline"
		href="https://twitter.com/theoreotm"
		icon="fa-brands fa-twitter">Twitter.</SocialButton
	>
</div>
