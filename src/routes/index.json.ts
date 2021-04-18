import * as cheerio from 'cheerio';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const url = `https://www.bbc.co.uk/news`;
	const res = await fetch(url);

	if (!res.ok) {
		return;
	}

	const $ = cheerio.load(await res.text());

	return {
		body: {
			source: url,
			links: $(`[data-entityid^="most-popular-read-"] a`)
				.toArray()
				.map((el) => ({
					href: $(el).attr('href'),
					text: $(el).text()
				}))
		}
	};
};
