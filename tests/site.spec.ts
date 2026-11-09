import { expect, test, type Page } from '@playwright/test';

const pages = [
	'/',
	'/projects',
	'/projects/cardinal-bot',
	'/projects/frieren-rag',
	'/blog',
	'/blog/first-post',
	'/contact'
];

/** Collects uncaught errors and console errors for a page. */
function trackErrors(page: Page) {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') errors.push(message.text());
	});
	return errors;
}

/** Opens a page and waits for it to settle, so event handlers are attached before we type. */
async function open(page: Page, path: string) {
	await page.goto(path);
	await page.waitForLoadState('networkidle');
}

for (const path of pages) {
	test(`${path} renders without errors or sideways scrolling`, async ({ page }) => {
		const errors = trackErrors(page);
		const response = await page.goto(path);
		expect(response?.status()).toBe(200);
		// getByRole skips the hidden copy of the previous page that Next keeps mounted.
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page).toHaveTitle(/OreoTM/);
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		expect(overflow).toBe(0);
		expect(errors).toEqual([]);
	});
}

test.describe('terminal', () => {
	async function run(page: Page, command: string) {
		const input = page.getByLabel(/Terminal command/);
		await input.fill(command);
		await input.press('Enter');
	}

	test('lists commands and projects', async ({ page }) => {
		await open(page, '/');
		const log = page.getByRole('log');
		await run(page, 'help');
		await expect(log).toContainText('open <name>');
		await run(page, 'projects');
		await expect(log.getByRole('link', { name: /cardinal-bot/ })).toBeVisible();
		await run(page, 'nope');
		await expect(log).toContainText('command not found: nope');
	});

	test('completes with Tab and opens a project', async ({ page }) => {
		await open(page, '/');
		const input = page.getByLabel(/Terminal command/);
		await input.fill('ope');
		await input.press('Tab');
		await expect(input).toHaveValue('open ');
		await input.pressSequentially('card');
		await input.press('Tab');
		await expect(input).toHaveValue('open cardinal-bot');
		await input.press('Enter');
		await expect(page).toHaveURL('/projects/cardinal-bot');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cardinal Bot');
	});
});

test('command menu opens with the shortcut and navigates', async ({ page }) => {
	await open(page, '/');
	await page.keyboard.press('Control+K');
	const dialog = page.getByRole('dialog', { name: 'Command menu' });
	await expect(dialog).toBeVisible();
	await page.keyboard.type('rag');
	// cmdk re-ranks on the next render; wait for the match before pressing Enter.
	await expect(page.getByRole('option', { name: /Frieren RAG System/ })).toHaveAttribute(
		'aria-selected',
		'true'
	);
	await page.keyboard.press('Enter');
	await expect(page).toHaveURL('/projects/frieren-rag');
	await expect(dialog).toBeHidden();
});

test('command menu opens from the header button', async ({ page }) => {
	await open(page, '/blog');
	await page.getByRole('button', { name: 'Open command menu' }).click();
	await expect(page.getByRole('dialog', { name: 'Command menu' })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog', { name: 'Command menu' })).toBeHidden();
});

test('theme toggle switches and remembers the theme', async ({ page }) => {
	await open(page, '/');
	// next-themes marks the dark theme with a `dark` class on <html>.
	const root = page.locator('html');
	const wasDark = ((await root.getAttribute('class')) ?? '').includes('dark');
	await page.getByRole('button', { name: 'Toggle light and dark theme' }).click();
	const expected = wasDark ? /^(?!.*\bdark\b)/ : /\bdark\b/;
	await expect(root).toHaveClass(expected);
	await page.reload();
	await expect(root).toHaveClass(expected);
});

test('blog tag filter narrows the list', async ({ page }) => {
	await page.goto('/blog?categories=discord');
	const posts = page.locator('main article:visible');
	await expect(posts).toHaveCount(1);
	await expect(posts).toContainText('How to not make a discord bot');
});

test('unknown pages return a 404 with a way back', async ({ page }) => {
	const response = await page.goto('/definitely-not-here');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page doesn't exist.");
	await expect(page.getByRole('link', { name: 'cd projects' })).toBeVisible();
});

test('feeds and crawler files are served', async ({ request }) => {
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.ok()).toBe(true);
	expect(await sitemap.text()).toContain('https://oreotm.xyz/projects/cardinal-bot');

	const rss = await request.get('/rss.xml');
	expect(await rss.text()).toContain('<guid isPermaLink="true">https://oreotm.xyz/blog/');

	const robots = await request.get('/robots.txt');
	expect(await robots.text()).toContain('Sitemap: https://oreotm.xyz/sitemap.xml');
});
