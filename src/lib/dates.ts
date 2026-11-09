type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

/** Post dates are written like 2025-5-02; Safari can't parse dashes without zero padding. */
export function parsePostDate(date: string) {
	return new Date(date.replaceAll('-', '/'));
}

export function formatDate(date: string, dateStyle: DateStyle = 'medium') {
	return new Intl.DateTimeFormat('en', { dateStyle }).format(parsePostDate(date));
}

/** An ISO date (YYYY-MM-DD) for <time datetime> and sitemaps. */
export function isoDate(date: string) {
	const d = parsePostDate(date);
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
