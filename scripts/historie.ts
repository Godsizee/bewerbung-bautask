/**
 * Reine Hilfsfunktionen fuer scripts/build-log.ts.
 *
 * Bewusst in einer eigenen Datei ohne Seiteneffekte: build-log.ts fuehrt beim
 * Import sofort git aus, waere also nicht testbar, ohne den Prebuild zu starten.
 */

const TAGE = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const TYP_LABELS: Record<string, string> = {
	feat: 'Feature',
	fix: 'Fix',
	chore: 'Setup',
	docs: 'Doku',
	refactor: 'Refactor',
	test: 'Tests',
	style: 'Style',
	perf: 'Performance'
};

export function formatZeit(unixSekunden: number): string {
	const d = new Date(unixSekunden * 1000);
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${TAGE[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function parseSubject(subject: string): { typ: string; desc: string } {
	const match = subject.match(/^([a-z]+)(\(([^)]+)\))?:\s*(.+)$/i);
	if (!match) return { typ: 'Commit', desc: subject };
	const [, type, , scope, desc] = match;
	const typ = scope ? scope.toUpperCase() : TYP_LABELS[type.toLowerCase()] ?? type;
	return { typ, desc };
}

export function parseWer(body: string): string {
	return /co-authored-by:\s*claude/i.test(body) ? 'Basti + Agent' : 'Basti';
}

/**
 * Aktive Arbeitszeit statt Kalenderspanne.
 *
 * Erster bis letzter Commit waere ueber Nacht irrefuehrend: zwei Commits am Abend und
 * am naechsten Mittag ergaeben ~20h, obwohl dazwischen geschlafen wurde. Gezaehlt wird
 * deshalb nur der Abstand zwischen zwei Commits, wenn er hoechstens PAUSE_SEKUNDEN
 * betraegt. Groessere Luecken sind Pausen und zaehlen gar nicht.
 *
 * Die Zahl untertreibt damit bewusst - die Arbeit vor dem allerersten Commit taucht
 * nicht auf. Auf einer Seite, die mit Nachpruefbarkeit wirbt, ist das die richtige
 * Richtung zu irren.
 */
export function aktiveStunden(unixZeiten: number[]): number {
	const PAUSE_SEKUNDEN = 2 * 3600;

	const sekunden = unixZeiten
		.slice(1)
		.map((zeit, i) => zeit - unixZeiten[i])
		.filter((abstand) => abstand <= PAUSE_SEKUNDEN)
		.reduce((summe, abstand) => summe + abstand, 0);

	return Math.max(1, Math.round(sekunden / 3600));
}
