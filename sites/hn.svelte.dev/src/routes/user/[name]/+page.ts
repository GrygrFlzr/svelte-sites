import type { PageLoad } from './$types.js';
export const csr = false;

export const load = (async ({ params, fetch }) => {
	const user: HNUser = await fetch(
		`https://hacker-news.firebaseio.com/v0/user/${params.name}.json`
	).then((r) => r.json());

	const now = Date.now();
	return { user, now };
}) satisfies PageLoad;
