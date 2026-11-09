import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Work in progress: not linked from the site, and hidden from search engines.
export const metadata: Metadata = {
	title: 'Minigames',
	robots: { index: false, follow: false }
};

export default function MinigamesPage() {
	return (
		<div className="max-w-2xl">
			<p className="font-mono text-sm text-muted-foreground">
				<span className="text-primary">❯</span> ./guess-lamar
			</p>
			<h1 className="mt-4 text-4xl font-semibold tracking-tight">Guess Lamar</h1>
			<p className="mt-4 text-lg text-muted-foreground">
				The song&apos;s original name will be replaced with a synonym. Try to figure out which song
				it is!
			</p>

			<form className="mt-8 rounded-xl border bg-card p-6">
				<label htmlFor="guess" className="block text-lg font-medium">
					<em>&ldquo;Monarch Kunta&rdquo;</em> – What Kendrick Lamar song is this?
				</label>
				<div className="mt-4 flex gap-2">
					<Input id="guess" placeholder="Your guess here" autoComplete="off" className="h-10" />
					<Button type="button" className="h-10 px-4">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}
