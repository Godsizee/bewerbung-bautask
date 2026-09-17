import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outputPath = path.resolve(process.cwd(), 'src/lib/data/n8n.json');

async function getApiKey(): Promise<string | null> {
	if (process.env.N8N_API_KEY) {
		return process.env.N8N_API_KEY;
	}

	// Try reading from DPAPI secret file on Windows
	const secretFile = 'C:\\Users\\bades\\.secrets\\n8n-api-key.dpapi';
	if (fs.existsSync(secretFile)) {
		try {
			const psCmd = `$sec = Get-Content '${secretFile}' | ConvertTo-SecureString; [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))`;
			const key = execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: ['pipe', 'pipe', 'ignore'] })
				.toString()
				.trim();
			if (key && key.length > 5) return key;
		} catch {
			// Ignore DPAPI failure
		}
	}
	return null;
}

async function updateNumbers() {
	try {
		const apiKey = await getApiKey();
		if (!apiKey) {
			console.warn('[n8n-zahlen] Kein API-Key gefunden. Nutze gecachte n8n.json.');
			return;
		}

		const res = await fetch('https://n8n.godsize.info/api/v1/workflows?limit=250', {
			headers: { 'X-N8N-API-KEY': apiKey },
			signal: AbortSignal.timeout(6000)
		});

		if (!res.ok) {
			console.warn(`[n8n-zahlen] API-Aufruf fehlgeschlagen (${res.status}). Nutze gecachte n8n.json.`);
			return;
		}

		const data = (await res.json()) as { data: Array<{ id: string; active: boolean }> };
		const workflows = data.data || [];
		const gesamt = workflows.length;
		const aktiv = workflows.filter((w) => w.active).length;

		const today = new Date();
		const pad = (n: number) => n.toString().padStart(2, '0');
		const stand = `${pad(today.getDate())}.${pad(today.getMonth() + 1)}.${today.getFullYear()}`;

		const result = { gesamt, aktiv, stand };
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });
		fs.writeFileSync(outputPath, JSON.stringify(result, null, '\t') + '\n', 'utf-8');
		console.log(`[n8n-zahlen] Aktualisiert: ${gesamt} Workflows (${aktiv} aktiv) zum Stand ${stand}.`);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		console.warn(`[n8n-zahlen] Fehler beim Abruf: ${message}. Nutze gecachte Daten.`);
	}
}

updateNumbers();
