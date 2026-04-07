// this compresses stupidly well
const ORDERED_UNITS_AND_FACTOR = [
	['year', 31_556_952], // using 365.2425 days
	['month', 2_629_746], // divive year by 12
	['week', 604_800],
	['day', 86_400],
	['hour', 3_600],
	['minute', 60],
	['second', 1]
] as const;

export function timeAgo(timestampSeconds: number): string {
	const deltaSeconds = Date.now() / 1000 - timestampSeconds;
	for (const [unit, factor] of ORDERED_UNITS_AND_FACTOR) {
		if (deltaSeconds >= factor) {
			const truncValue = Math.trunc(deltaSeconds / factor);
			const displayUnit = truncValue === 1 ? unit : `${unit}s`;
			return `${truncValue} ${displayUnit} ago`;
		}
	}
	// under 1s, you must be very quick or a time traveler
	return 'now';
}
