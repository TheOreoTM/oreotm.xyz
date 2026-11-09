type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

/** Post dates are written like 2025-5-02; Safari can't parse dashes without zero padding. */
export function parsePostDate(date: string) {
	return new Date(date.replaceAll('-', '/'));
}

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	return new Intl.DateTimeFormat(locales, { dateStyle }).format(parsePostDate(date));
}
