// src/lib/merger.store.ts  ←  FIXED FOR SSR + STATIC BUILD
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import * as Diff from 'diff';

// --- Safe localStorage wrapper ---
const safeGet = (key: string, fallback: string) => browser ? localStorage.getItem(key) ?? fallback : fallback;
const safeSet = (key: string, value: string) => { if (browser) localStorage.setItem(key, value); };
const safeGetJson = (key: string, fallback: object) => {
	if (!browser) return fallback;
	const item = localStorage.getItem(key);
	return item ? JSON.parse(item) : fallback;
};

// Raw inputs
export const baseText = writable(browser ? safeGet('merger_base', '') : '');
export const modifiedText = writable(browser ? safeGet('merger_modified', '') : '');

// Persist only in browser
if (browser) {
	baseText.subscribe(v => safeSet('merger_base', v));
	modifiedText.subscribe(v => safeSet('merger_modified', v));
}

// Diff & decisions
const rawHunks = derived([baseText, modifiedText], ([$base, $mod]) => {
	if (!$base || !$mod) return [];
	return Diff.diffLines($base, $mod, { newlineIsToken: true })
		.reduce((hunks: any[], part) => {
			if (part.added || part.removed) {
				const last = hunks[hunks.length - 1];
				if (!last || last.lines.length > 30) hunks.push({ id: hunks.length, lines: [], decision: 'pending' });
				hunks[hunks.length - 1].lines.push(part);
			} else if (hunks.length) {
				hunks[hunks.length - 1].lines.push(part);
			}
			return hunks;
		}, []);
}, []);

const initialDecisions = browser ? safeGetJson('merger_decisions', {}) : {};
export const decisions = writable(initialDecisions);
if (browser) {
	decisions.subscribe(d => safeSet('merger_decisions', JSON.stringify(d)));
}

export const hunks = derived([rawHunks, decisions], ([$hunks, $dec]) =>
	$hunks.map(h => ({ ...h, decision: $dec[h.id] ?? 'pending' }))
);

export const result = derived([baseText, hunks], ([$base, $hunks]) => {
	if (!$base) return '';
	const baseLines = $base.split('\n');
	const lines: string[] = [];
	let cursor = 0;

	$hunks.forEach(hunk => {
		// Context before hunk
		while (cursor < baseLines.length && !hunk.lines.some((l: any) => l.added || l.removed)) {
			lines.push(baseLines[cursor++]);
		}

		if (hunk.decision === 'accepted') {
			hunk.lines.forEach((part: any) => { if (part.added) lines.push(...part.value.split('\n').filter(Boolean)); });
		} else if (hunk.decision === 'rejected' || hunk.decision === 'pending') {
			hunk.lines.forEach((part: any) => { if (!part.added) lines.push(...part.value.split('\n').filter(Boolean)); });
		}
		cursor += hunk.lines.filter((l: any) => l.removed).reduce((a: number, l: any) => a + (l.count || 0), 0);
	});

	// Remaining lines
	lines.push(...baseLines.slice(cursor));
	return lines.join('\n');
});

// Actions
export const acceptHunk = (id: number) => decisions.update(d => ({ ...d, [id]: 'accepted' }));
export const rejectHunk = (id: number) => decisions.update(d => ({ ...d, [id]: 'rejected' }));
export const resetDecisions = () => decisions.set({});
export const useResultAsBase = () => { baseText.set(result.get?.() ?? ''); resetDecisions(); };
export const copyResult = async () => browser && await navigator.clipboard.writeText(result.get?.() ?? '');
export const downloadResult = () => {
	if (!browser) return;
	const blob = new Blob([result.get?.() ?? ''], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url; a.download = 'merged.txt'; a.click();
	URL.revokeObjectURL(url);
};