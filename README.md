# Bewerbung BauTask

Bewerbungsseite von Sebastian Bade für die Stelle als Software Entwickler bei der BauTask GmbH. SvelteKit 2 / Svelte 5, Tailwind 4, `adapter-node`, deployt via Nixpacks auf Coolify.

## Architektur

- `src/routes/+page.svelte` – Die eigentliche Seite: Hero, Build-Log, Projekte, Lebenslauf, Agent-Chat.
- `src/routes/api/frag/+server.ts` – Server-Proxy für den Chat-Agenten. Validiert die Eingabe, rate-limitet pro IP (8 Fragen / 10 Minuten) und pro Tag (200), reicht die Frage dann an einen n8n-Webhook weiter, der das eigentliche LLM anspricht.
- `src/lib/components/Agent.svelte` – Der Chat-Client für obigen Endpoint.
- `src/lib/sektionen.ts` – Zentrale Liste der neun Sektionen (id, Nummer, Titel, Kurzlabel), gelesen von Statusleiste und Sektionsmenü.
- `src/lib/components/Sektionsmenue.svelte` – Vollbild-Sprungmarken-Menü für Mobil/Tablet (< `lg`), inklusive Fokus-Trap und Scroll-Sperre.
- `src/lib/components/Statusleiste.svelte` – Sticky Kopfzeile mit Desktop-Sprungmarken-Navigation und eigenem Scroll-Spy (rAF-gedrosselter Scroll-Handler, kein IntersectionObserver – Begründung im Ausbauplan).
- `n8n/system-prompt.md` – System-Prompt des n8n-Agenten (läuft auf einer eigenen n8n-Instanz, nicht in diesem Repo).
- `scripts/n8n-zahlen.ts` – Prebuild-Skript, holt Live-Workflow-Zahlen von der n8n-API und schreibt sie nach `src/lib/data/n8n.json`. Ohne gültigen Key wird der letzte Cache-Stand weiterverwendet.
- `scripts/build-log.ts` – Prebuild-Skript, liest die echte Git-Historie aus und erzeugt `src/lib/data/build-log.json` für die Build-Log-Sektion.

## Environment-Variablen

Siehe [.env.example](.env.example) für die vollständige Liste. Kurzfassung:

| Variable | Zweck |
|---|---|
| `N8N_AGENT_WEBHOOK_URL` | Ziel-Webhook des Chat-Agenten |
| `AGENT_SHARED_SECRET` | Shared Secret zwischen `+server.ts` und n8n-Webhook |
| `ORIGIN` | Von `adapter-node` für korrekte URL-Auflösung hinter dem Proxy benötigt |
| `N8N_API_KEY` | Nur für den Prebuild-Schritt, holt aktuelle Workflow-Zahlen |
| `ADDRESS_HEADER` / `XFF_DEPTH` | **Produktiv zwingend** (`x-forwarded-for` / `1`) – ohne diese Werte liefert `getClientAddress()` hinter Traefik/Coolify für alle Besucher dieselbe Proxy-IP, das Rate-Limit greift dann global statt pro Besucher |

## Entwicklung

```sh
npm install
cp .env.example .env   # Werte eintragen
npm run dev
```

## Build

```sh
npm run build      # führt vorher die beiden Prebuild-Skripte aus
npm run preview
```

## Deploy

Coolify baut über [nixpacks.toml](nixpacks.toml) und startet mit `npm run start` (`node build`, `adapter-node`). Alle Variablen aus `.env.example` müssen als Coolify-Environment gesetzt sein, insbesondere `ADDRESS_HEADER` und `XFF_DEPTH` für ein funktionierendes Rate-Limit hinter dem Traefik-Proxy.
