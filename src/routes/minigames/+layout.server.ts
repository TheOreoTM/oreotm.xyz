import path from 'path';
import * as fs from 'fs';
import type { LayoutServerLoad } from './$types';
import { parse } from 'csv-parse';

export const load = (async () => {
	return {};
}) satisfies LayoutServerLoad;

type Track = {
	track_name: string;
	album: string;
	release_date: string;
	duration_ms: number;
	popularity: number;
	speechiness: number;
	danceability: number;
	tempo: number;
	lyrics: string;
};

const tracks: Track[] = [];

(() => {
	const csvFilePath = path.resolve('./src/routes/minigames/data.csv');

	const headers = [
		'track_name',
		'album',
		'release_date',
		'duration_ms',
		'popularity',
		'speechiness',
		'danceability',
		'tempo',
		'lyrics'
	];

	const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

	parse(
		fileContent,
		{
			delimiter: ',',
			columns: headers
		},
		(error, result: Track[]) => {
			if (error) {
				console.error(error);
			}
			tracks.push(...result);
		}
	);
})();
