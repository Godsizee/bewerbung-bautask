import { describe, it, expect } from 'vitest';
import { aktiveStunden, parseSubject, parseWer } from './historie';

const STUNDE = 3600;

describe('aktiveStunden', () => {
	it('zaehlt nur Abstaende bis zwei Stunden', () => {
		// 0h -> 1h -> 2h: zwei Abstaende von je einer Stunde.
		expect(aktiveStunden([0, STUNDE, 2 * STUNDE])).toBe(2);
	});

	it('ignoriert die Nacht zwischen zwei Arbeitstagen', () => {
		// Zwei Stunden Arbeit, 20 Stunden Pause, dann wieder eine Stunde.
		const zeiten = [0, STUNDE, 2 * STUNDE, 22 * STUNDE, 23 * STUNDE];
		expect(aktiveStunden(zeiten)).toBe(3);
	});

	it('meldet nie weniger als eine Stunde', () => {
		expect(aktiveStunden([0])).toBe(1);
		expect(aktiveStunden([])).toBe(1);
	});
});

describe('parseSubject', () => {
	it('uebersetzt Conventional-Commit-Typen ins Deutsche', () => {
		expect(parseSubject('feat: Scroll-Reveal')).toEqual({ typ: 'Feature', desc: 'Scroll-Reveal' });
		expect(parseSubject('chore: Setup')).toEqual({ typ: 'Setup', desc: 'Setup' });
	});

	it('nimmt den Scope als Label, wenn einer da ist', () => {
		expect(parseSubject('fix(api): Rate-Limit')).toEqual({ typ: 'API', desc: 'Rate-Limit' });
	});

	it('faellt bei freier Betreffzeile auf "Commit" zurueck', () => {
		expect(parseSubject('irgendwas ohne Praefix')).toEqual({
			typ: 'Commit',
			desc: 'irgendwas ohne Praefix'
		});
	});
});

describe('parseWer', () => {
	it('erkennt den Agenten am Co-Authored-By-Trailer', () => {
		expect(parseWer('Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>')).toBe('Basti + Agent');
	});

	it('schreibt alles andere Basti zu', () => {
		expect(parseWer('')).toBe('Basti');
		expect(parseWer('Signed-off-by: jemand')).toBe('Basti');
	});
});
