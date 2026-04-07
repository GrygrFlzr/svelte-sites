import type { ParamMatcher } from '@sveltejs/kit';

const categories = new Set(['top', 'new', 'best', 'show', 'ask', 'jobs']);

export const match = ((name: string): name is 'top' | 'new' | 'best' | 'show' | 'ask' | 'jobs' =>
	categories.has(name)) satisfies ParamMatcher;
