'use client';

import { useEffect, useState } from 'react';
import { localTime } from '@/lib/site';
import { cn } from '@/lib/utils';

/** The current time in the Maldives. Pages are prerendered, so it fills in on the client. */
export function LocalTime({ className }: { className?: string }) {
	const [time, setTime] = useState('');

	useEffect(() => {
		const update = () => setTime(localTime());
		update();
		const interval = setInterval(update, 15_000);
		return () => clearInterval(interval);
	}, []);

	return <span className={cn('inline-block min-w-[7ch] tabular-nums', className)}>{time}</span>;
}
