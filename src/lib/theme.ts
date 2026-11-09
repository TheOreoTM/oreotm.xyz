// app.html resolves the initial theme before paint; these helpers change it afterwards.

export type Theme = 'light' | 'dark';

export function currentTheme(): Theme {
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// Storage can be unavailable (private mode); the theme still applies for this visit.
	}
}

export function toggleTheme(): Theme {
	const next = currentTheme() === 'dark' ? 'light' : 'dark';
	setTheme(next);
	return next;
}
