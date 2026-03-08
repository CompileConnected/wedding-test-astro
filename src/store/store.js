/**
 * Tiny reactive atom (drop-in replacement for nanostores/atom).
 * Supports .get(), .set(), .subscribe() — same API, zero dependencies.
 */
function atom(initial) {
	let value = initial
	const listeners = new Set()
	return {
		get: () => value,
		set: (v) => {
			value = v
			listeners.forEach((fn) => fn(v))
		},
		subscribe: (fn) => {
			fn(value)
			listeners.add(fn)
			return () => listeners.delete(fn)
		},
	}
}

export const isInvitationOpen = atom(false)