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
		command: 'pnpm build && pnpm preview --port 4173',
		port: 4173,
		reuseExistingServer: !process.env.CI,
		timeout: 180_000
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 7'] } }
	]
});
