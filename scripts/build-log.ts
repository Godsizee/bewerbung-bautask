import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outputPath = path.resolve(process.cwd(), 'src/lib/data/build-log.json');

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

function formatZeit(unixSekunden: number): string {
	const d = new Date(unixSekunden * 1000);
	const pad = (n: number) => n.toString().padStart(2, '0');
	return `${TAGE[d.getDay()]} ${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function parseSubject(subject: string): { typ: string; desc: string } {
	const match = subject.match(/^([a-z]+)(\(([^)]+)\))?:\s*(.+)$/i);
	if (!match) return { typ: 'Commit', desc: subject };
	const [, type, , scope, desc] = match;
	const typ = scope ? scope.toUpperCase() : TYP_LABELS[type.toLowerCase()] ?? type;
	return { typ, desc };
}

function parseWer(body: string): string {
	return /co-authored-by:\s*claude/i.test(body) ? 'Basti + Agent' : 'Basti';
}

function buildLog() {
	try {
		const raw = execSync("git log --reverse --pretty=format:%H%x1f%at%x1f%s%x1f%b%x1e", {
			cwd: process.cwd(),
			encoding: 'utf-8'
		});

		const commits = raw
			.split('\x1e')
			.map((r) => r.trim())
			.filter(Boolean)
			.map((record) => {
				const [, at, subject, body] = record.split('\x1f');
				const { typ, desc } = parseSubject(subject ?? '');
				return {
					zeit: formatZeit(Number(at)),
					unix: Number(at),
					typ,
					desc,
					wer: parseWer(body ?? '')
				};
			});

		if (commits.length === 0) throw new Error('Keine Commits gefunden.');

		const ersterCommit = commits[0].unix;
		const letzterCommit = commits[commits.length - 1].unix;
		const stunden = Math.max(1, Math.round((letzterCommit - ersterCommit) / 3600));

		const result = {
			commits: commits.map(({ zeit, typ, desc, wer }) => ({ zeit, typ, desc, wer })),
			commitCount: commits.length,
			stunden
		};

		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, JSON.stringify(result, null, '\t') + '\n', 'utf-8');
		console.log(`[build-log] Aktualisiert: ${commits.length} Commits, ~${stunden}h Spanne.`);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		console.warn(`[build-log] Fehler beim git log: ${message}. Nutze gecachte build-log.json.`);
	}
}

buildLog();
