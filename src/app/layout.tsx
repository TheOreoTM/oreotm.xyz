import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CommandMenu } from '@/components/command-menu';
import { CommandMenuProvider } from '@/components/command-menu-context';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { getProjects } from '@/lib/content';
import { site, siteUrl } from '@/lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: { default: `${site.name} | Full-stack developer`, template: `%s | ${site.name}` },
	description: site.description,
	alternates: {
		canonical: '/',
		types: { 'application/rss+xml': [{ url: '/rss.xml', title: "OreoTM's blog" }] }
	},
	openGraph: { type: 'website', siteName: site.name, locale: 'en' },
	twitter: { card: 'summary_large_image' },
	icons: { icon: '/favicon.png' }
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f6f5f1' },
		{ media: '(prefers-color-scheme: dark)', color: '#0c0c0d' }
	]
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
	const projects = await getProjects();
	const summaries = projects.map(({ slug, name, tagline }) => ({ slug, name, tagline }));

	return (
		// next-themes sets the theme class before paint, so the server and client markup differ.
		<html
			lang="en"
			suppressHydrationWarning
			className={`${inter.variable} ${jetbrainsMono.variable}`}
		>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<CommandMenuProvider>
						<a
							href="#main"
							className="sr-only z-50 rounded-md bg-primary px-3 py-2 font-mono text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
						>
							Skip to content
						</a>
						<Header />
						<main id="main" className="mx-auto max-w-5xl px-4 pt-10 sm:pt-16">
							{children}
						</main>
						<Footer />
						<CommandMenu projects={summaries} />
					</CommandMenuProvider>
				</ThemeProvider>
				{/* Their scripts are served by Vercel only, so skip them in local builds. */}
				{process.env.VERCEL && (
					<>
						<Analytics />
						<SpeedInsights />
					</>
				)}
			</body>
		</html>
	);
}
