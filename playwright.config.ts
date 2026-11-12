import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	retries: process.env.CI ? 1 : 0,
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'off'
	},
	webServer: {
		// Serve the standalone output the way the Dockerfile does, so the tests cover what ships.
		command:
			'pnpm build && cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ && node .next/standalone/server.js',
		env: { PORT: '4173', HOSTNAME: 'localhost' },
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	]
});
