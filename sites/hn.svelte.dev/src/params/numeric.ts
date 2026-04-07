import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((numeric: string): numeric is `${number}` =>
	/^\d+$/.test(numeric)) satisfies ParamMatcher;
