import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { aktiveStunden, formatZeit, parseSubject, parseWer } from './historie';

const outputPath = path.resolve(process.cwd(), 'src/lib/data/build-log.json');

/** Anzahl Commits in der eingecheckten build-log.json, oder 0. */
function gecachteAnzahl(): number {
	try {
		const cache = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
		return typeof cache?.commitCount === 'number' ? cache.commitCount : 0;
	} catch {
		return 0;
	}
}

function buildLog() {
	const cacheAnzahl = gecachteAnzahl();

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

		// Ein flacher Clone (git clone --depth 1, Default mancher CI-Runner) liefert
		// genau einen Commit. Ohne diesen Deckel wuerde das Build-Log auf der Seite
		// stillschweigend auf eine einzige Zeile zusammenschrumpfen - schlimmer als
		// ein leicht veralteter Cache. Historie kann nur wachsen, nie schrumpfen.
		if (commits.length < cacheAnzahl) {
			throw new Error(
				`Nur ${commits.length} Commits sichtbar, im Cache stehen ${cacheAnzahl}. ` +
					`Vermutlich ein flacher Clone - Cache wird nicht ueberschrieben.`
			);
		}

		const stunden = aktiveStunden(commits.map((c) => c.unix));

		const result = {
			commits: commits.map(({ zeit, typ, desc, wer }) => ({ zeit, typ, desc, wer })),
			commitCount: commits.length,
			stunden
		};

		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, JSON.stringify(result, null, '\t') + '\n', 'utf-8');
		console.log(`[build-log] Aktualisiert: ${commits.length} Commits, ~${stunden}h aktive Arbeitszeit.`);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		console.warn(
			`[build-log] ${message} Nutze gecachte build-log.json (${cacheAnzahl} Commits).\n` +
				`[build-log] Achtung: Die Seite zeigt damit einen aelteren Stand als die echte Historie.`
		);
	}
}

buildLog();
