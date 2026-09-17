import { json, error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const FENSTER_MS = 10 * 60 * 1000;
const PRO_IP = 8;
const PRO_TAG = 200;

const treffer = new Map<string, number[]>();
let tagesZaehler = 0;
let tagesStart = Date.now();

export const POST: RequestHandler = async ({ request, getClientAddress, fetch }) => {
	if (Date.now() - tagesStart > 86_400_000) {
		tagesZaehler = 0;
		tagesStart = Date.now();
	}
	if (tagesZaehler >= PRO_TAG) {
		throw error(429, 'Tageslimit für Agent-Anfragen erreicht. Morgen geht es weiter.');
	}

	let ip = '127.0.0.1';
	try {
		ip = getClientAddress();
	} catch {
		// Fallback in lokaler Entwicklungsumgebung
	}

	const jetzt = Date.now();
	const bisher = (treffer.get(ip) ?? []).filter((t) => jetzt - t < FENSTER_MS);
	if (bisher.length >= PRO_IP) {
		throw error(429, 'Zu viele Fragen in kurzer Zeit. Bitte kurz durchatmen.');
	}
	treffer.set(ip, [...bisher, jetzt]);

	let frage: string;
	try {
		const data = await request.json();
		frage = data?.frage;
	} catch {
		throw error(400, 'Ungültiger Request-Body.');
	}

	if (typeof frage !== 'string' || frage.trim().length < 3) {
		throw error(400, 'Keine Frage erkannt (mindestens 3 Zeichen).');
	}
	if (frage.length > 300) {
		throw error(400, 'Bitte kürzer fassen (maximal 300 Zeichen).');
	}

	const webhookUrl = env.N8N_AGENT_WEBHOOK_URL;
	const secret = env.AGENT_SHARED_SECRET;
	if (!webhookUrl || !secret) {
		throw error(500, 'Agent ist serverseitig noch nicht vollständig konfiguriert.');
	}

	tagesZaehler++;

	try {
		const antwort = await fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-agent-secret': secret
			},
			body: JSON.stringify({ frage: frage.trim() }),
			signal: AbortSignal.timeout(25_000)
		});

		if (!antwort.ok) {
			throw error(502, 'Der Agent antwortet gerade nicht.');
		}

		const daten = await antwort.json();
		return json(daten);
	} catch (err: unknown) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(502, 'Verbindung zum Agenten fehlgeschlagen oder Timeout.');
	}
};
