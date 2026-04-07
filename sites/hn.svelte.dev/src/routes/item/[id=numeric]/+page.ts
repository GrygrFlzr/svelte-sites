import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const [hnItem, algoliaItem]: [HNItem | null, AlgoliaItem] = await Promise.all([
		fetch(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`).then((r) => r.json()),
		fetch(`https://hn.algolia.com/api/v1/items/${params.id}`).then((r) => r.json())
	]);

	// if hn available, use their top-level sort
	if (hnItem) {
		if ('kids' in hnItem && hnItem.kids) {
			const { kids } = hnItem;
			algoliaItem.children.sort((a, b) => {
				const indexA = kids.indexOf(a.id);
				const indexB = kids.indexOf(b.id);
				return indexA - indexB;
			});
		}
		if ('parts' in hnItem && hnItem.parts) {
			algoliaItem.options = hnItem.parts;
		}
	}

	let pollOptions: HNPollOption[] = [];
	if (algoliaItem && algoliaItem.type === 'poll') {
		pollOptions = await Promise.all(
			algoliaItem.options.map((id) =>
				fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json())
			)
		);
	}

	return { algoliaItem, pollOptions };
}) satisfies PageLoad;
