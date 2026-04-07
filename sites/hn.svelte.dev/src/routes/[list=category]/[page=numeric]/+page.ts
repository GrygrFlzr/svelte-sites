import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const BASE = 'https://hacker-news.firebaseio.com/v0/';
const ITEMS_PER_PAGE = 30;

export const load = (async ({ params, fetch }) => {
	const list = params.list === 'jobs' ? 'job' : params.list;
	const page = +params.page;
	const offset = (page - 1) * ITEMS_PER_PAGE;

	const itemIds: number[] = await fetch(`${BASE}${list}stories.json`).then((res) => res.json());
	const relevantItemIds = itemIds.slice(offset, offset + ITEMS_PER_PAGE);

	if (relevantItemIds.length === 0) {
		error(404, 'Page not found');
	}

	const items: (HNStory | HNJob | HNPoll | { type: 'null'; id: number })[] = await Promise.all(
		relevantItemIds.map((id) =>
			fetch(`${BASE}item/${id}.json`).then((res) => res.json() ?? { type: 'null', id })
		)
	);

	return { list, page, items };
}) satisfies PageLoad;
