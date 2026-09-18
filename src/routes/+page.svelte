<script lang="ts">
	import Statusleiste from '$lib/components/Statusleiste.svelte';
	import Sektion from '$lib/components/Sektion.svelte';
	import Zitat from '$lib/components/Zitat.svelte';
	import Agent from '$lib/components/Agent.svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import n8nStats from '$lib/data/n8n.json';
	import buildLog from '$lib/data/build-log.json';
	import {
		FileText,
		ExternalLink,
		Mail,
		Phone,
		MapPin,
		Calendar,
		Briefcase,
		ShieldCheck,
		Database,
		Layers,
		CheckCircle2,
		XCircle,
		ArrowUpRight,
		Terminal,
		Cpu,
		Radio
	} from 'lucide-svelte';

	const projekte = [
		{
			titel: 'JobPuls',
			badge: 'n8n · PostgreSQL · Telegram',
			problem: 'Die manuelle Jobsuche über diverse Stellenportale frisst täglich Stunden und spült veraltete oder irrelevante Anzeigen ein.',
			entscheidung: 'Autonomer Bewerbungs-Radar auf der eigenen n8n-Instanz: nächtlicher Feed-Abruf, strenge Positiv-/Negativ-Filter, Live-HTTP-Validierung gegen Phantomstellen und Zustellung kuratierter Matches direkt via Telegram.',
			ergebnis: 'Vollautomatischer Ablauf mit hartem Bauzeit-Deckel von 16 Stunden. Spart täglich 90 Minuten Klickarbeit.',
			link: 'https://github.com/Godsizee/jobpuls'
		},
		{
			titel: 'Life OS',
			badge: 'SvelteKit · TypeScript · Supabase RLS · PWA',
			problem: 'Herkömmliche Produktivitäts-Apps versagen im Funkloch oder blockieren bei schlechter mobiler Netzabdeckung.',
			entscheidung: 'Progressive Web App mit striktem Offline-First-Ansatz: Service Worker, IndexedDB als lokale Datenbank und eine optimistische Sync-Queue mit PostgreSQL/Supabase (Row-Level Security).',
			ergebnis: 'Reaktionszeiten unter 16 ms im Offline-Modus; geräuschlose Hintergrund-Synchronisation sobald wieder Netz da ist.',
			link: 'https://github.com/Godsizee/life-os'
		},
		{
			titel: 'PAUSE Portal',
			badge: 'PHP 8 MVC · MySQL · Vorbereitung Laravel 12',
			problem: 'Ein komplexes Fachportal benötigt klare Datenstrukturen und feingranulare Rechte ohne schwerfälligen Boilerplate.',
			entscheidung: 'Eigenes schlankes MVC-Framework in modernem PHP 8 mit strikter Schichtung (Controller → Service → Repository), PDO mit Prepared Statements und 21 normalisierten Tabellen mit Foreign Keys.',
			ergebnis: 'Null Sicherheitslücken, saubere Testbarkeit und vorbereiteter Migrationspfad auf Laravel 12 + Vue 3.',
			link: 'https://github.com/Godsizee/pause-portal'
		},
		{
			titel: 'TramPuls & Bahnpuls',
			badge: 'Go · DuckDB · Parquet · dbt · GTFS-RT',
			problem: 'Millionen historische und laufende Echtzeit-Verkehrsdaten überlasten klassische relationale OLTP-Datenbanken bei Ad-hoc-Verspätungsanalysen.',
			entscheidung: 'Analytische Ingestion-Pipeline in Go, Speicherung in komprimierten Apache-Parquet-Dateien und Transformationen mit DuckDB & dbt.',
			ergebnis: 'Analytische Abfragen über Monatsdaten in wenigen Millisekunden direkt auf dem Server ohne teure Data-Warehouse-Infrastruktur.',
			link: 'https://github.com/Godsizee/bahnpuls'
		}
	];

	const buildLogCommits = buildLog.commits;
</script>

<Statusleiste commitCount={buildLog.commitCount} stunden={buildLog.stunden} />

<main class="min-h-screen">
	<!-- 1. HERO -->
	<section id="hero" class="pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-zinc-900">
		<div class="max-w-4xl mx-auto px-4 sm:px-6">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-6">
				<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
				<span>Bewerbung // Software Entwickler Full-Stack</span>
			</div>

			<h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]">
				Ihr wollt keine perfekte Bewerbung.<br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
					Hier sind zwei Tage.
				</span>
			</h1>

			<p class="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
				Donnerstagmittag angefangen, Freitag online. Gebaut mit denselben Werkzeugen, mit denen ihr arbeitet. Das Protokoll steht weiter unten — inklusive der Stellen, an denen ich den Output weggeworfen habe.
			</p>

			<div class="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm font-mono text-zinc-400">
				<span class="flex items-center gap-1.5 text-zinc-300">
					<span class="font-semibold text-zinc-100">Sebastian Bade</span>
				</span>
				<span class="text-zinc-700 hidden sm:inline">/</span>
				<span class="flex items-center gap-1.5">
					<MapPin class="w-3.5 h-3.5 text-amber-400" />
					<span>Mannheim (100% Remote)</span>
				</span>
				<span class="text-zinc-700 hidden sm:inline">/</span>
				<span class="flex items-center gap-1.5 text-emerald-400 font-semibold">
					<Calendar class="w-3.5 h-3.5" />
					<span>Verfügbar ab 01.10.2026</span>
				</span>
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-3">
				<a
					href="#agent"
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
				>
					<span>Frag den Agenten</span>
					<ArrowUpRight class="w-4 h-4" />
				</a>

				<a
					href="https://github.com/Godsizee"
					target="_blank"
					rel="noreferrer"
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 text-sm hover:bg-zinc-800 transition-colors"
				>
					<GithubIcon class="w-4 h-4 text-zinc-400" />
					<span>GitHub Profil</span>
				</a>

				<a
					href="/Lebenslauf-Sebastian-Bade.pdf"
					download
					class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm hover:text-amber-300 hover:border-zinc-700 transition-colors"
				>
					<FileText class="w-4 h-4 text-zinc-400" />
					<span>Lebenslauf (PDF)</span>
				</a>
			</div>
		</div>
	</section>

	<!-- 2. DER TEST -->
	<Sektion id="test" nummer="01" titel="Der Test">
		<Zitat>
			„Wer das beherrscht, liefert hier in einer Woche, wofür klassische Teams ein Quartal einplanen.“
		</Zitat>

		<div class="space-y-4 text-base sm:text-lg">
			<p>
				Ich hatte kein Quartal und keine Woche. Ich hatte zwei Tage.
			</p>
			<p>
				Die Seite vor euch ist der praktische Nachweis. Ein Live-Agent, angebunden an ein eigenes n8n-System, ein serverseitiger Node-Proxy mit Schutz vor Missbrauch, komponentenbasiertes SvelteKit mit Svelte 5 Runes und Tailwind 4.
			</p>
			<p class="text-zinc-400 text-sm">
				Die Git-Historie liegt offen, jeder Commit trägt einen unverfälschten Zeitstempel. Ihr müsst mir kein Wort glauben — schaut euch den Code an.
			</p>
		</div>
	</Sektion>

	<!-- 3. BUILD-LOG -->
	<Sektion id="build-log" nummer="02" titel="Build-Log" subtitel="Die Entstehung dieser Seite im Protokoll: Transparenz über Tempo, Werkzeuge und Eingriffe.">
		<div class="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-xs">
			<div class="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between text-zinc-400">
				<span class="flex items-center gap-2">
					<Terminal class="w-3.5 h-3.5 text-amber-400" />
					<span>git log --reverse --pretty=format</span>
				</span>
				<span class="text-zinc-500">Branch: main</span>
			</div>

			<div class="divide-y divide-zinc-900">
				{#each buildLogCommits as c}
					<div class="p-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-900/40 transition-colors">
						<div class="flex items-start sm:items-center gap-3">
							<span class="text-amber-500/80 shrink-0 w-16">{c.zeit}</span>
							<span class="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-300 shrink-0 text-[11px] border border-zinc-700/50">{c.typ}</span>
							<span class="text-zinc-200 font-sans text-xs sm:text-sm">{c.desc}</span>
						</div>
						<span class="text-zinc-500 text-[11px] shrink-0 sm:text-right">{c.wer}</span>
					</div>
				{/each}
			</div>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
			<div class="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
				<div class="text-2xl font-bold text-amber-400 font-mono">80 %</div>
				<div class="text-xs text-zinc-400 mt-1">KI-generiertes Grundgerüst</div>
			</div>
			<div class="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
				<div class="text-2xl font-bold text-zinc-200 font-mono">10 %</div>
				<div class="text-xs text-zinc-400 mt-1">Von Hand nachgeschärft & refactored</div>
			</div>
			<div class="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
				<div class="text-2xl font-bold text-rose-400 font-mono">10 %</div>
				<div class="text-xs text-zinc-400 mt-1">Vorschläge bewusst weggeworfen</div>
			</div>
		</div>
	</Sektion>

	<!-- 4. WEGGEWORFEN -->
	<Sektion id="weggeworfen" nummer="03" titel="Weggeworfen" subtitel="Wer mit LLMs arbeitet, muss wissen, wann er Code kassiert. Drei konkrete Fälle aus genau diesem Build.">
		<div class="space-y-6">
			<!-- Fall 1 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 1: Veraltetes Tailwind-3-Setup vorgeschlagen</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Erzeugung von <code class="text-rose-300">tailwind.config.js</code> und <code class="text-rose-300">@tailwind base</code>.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Tailwind 4 läuft als Vite-Plugin ohne Config-File. Das Resultat wäre eine ungestylte weiße Seite gewesen.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans">Einbindung via <code class="text-emerald-300">@tailwindcss/vite</code> und genau eine Importzeile in <code class="text-emerald-300">app.css</code>.</span>
					</div>
				</div>
			</div>

			<!-- Fall 2 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 2: Statische Umgebungsvariablen für Container-Deploy</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Nutzung von <code class="text-rose-300">$env/static/private</code> für das n8n-Shared-Secret.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Statische Variablen werden beim Build gebacken. Coolify setzt Envs zur Laufzeit im Docker-Container — der Key wäre in Produktion leer geblieben.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans">Umstellung auf <code class="text-emerald-300">$env/dynamic/private</code> mit Validierungs-Guard im Server-Handler.</span>
					</div>
				</div>
			</div>

			<!-- Fall 3 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 3: Unbegrenztes Rate-Limiting ohne Tagesdeckel</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Ein einfaches IP-Fenster ohne globalen Budget-Deckel.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Bei wechselnden IPs oder einem Botnet wäre das API-Guthaben bei Anthropic binnen Minuten leer gewesen.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans">Zweistufiges Limit: maximal 8 Anfragen pro IP / 10 Min und harter Stopp bei 200 Anfragen / 24h global.</span>
					</div>
				</div>
			</div>
		</div>

		<p class="text-sm font-medium text-zinc-300 pt-2 italic border-l-2 border-zinc-700 pl-4">
			„Das ist der Teil, der sich nicht delegieren lässt. Die Verantwortung für jede Zeile, die meinen Namen trägt, bleibt bei mir.“
		</p>
	</Sektion>

	<!-- 5. ZWEI BALKEN EMPFANG -->
	<Sektion id="zwei-balken" nummer="04" titel="Zwei Balken Empfang" subtitel="Domänenverständnis entsteht nicht im Bootcamp, sondern in der echten Welt.">
		<Zitat>
			„Wenn eine Arbeitszeit falsch berechnet wird, steht das am Monatsende auf einer echten Lohnabrechnung.“
		</Zitat>

		<div class="text-xl sm:text-2xl font-bold text-amber-400">
			Das war sieben Jahre lang meine Lohnabrechnung.
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<div class="lg:col-span-8 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
				<p>
					Von 2017 bis 2024 war ich Güterzuglokführer. Tausende Tonnen Stahl quer durch Deutschland für SBB Cargo International, Rail Cargo Carrier, Crossrail, Ecco Rail und Rheincargo — inklusive Berechtigungen für die Schweiz und Österreich.
				</p>
				<p>
					Nachtschichten bei minus zehn Grad, Funkloch mitten im Wald, strikte Dokumentationspflicht für jede Bremsberechnung und jeden Wagen. Wenn die App des Eisenbahnverkehrsunternehmens abstürzt oder Daten verliert, steht der Zug. Punkt.
				</p>
				<p>
					<strong>2024 war Schluss:</strong> Zwei Bandscheibenvorfälle haben die Bahntauglichkeit dauerhaft beendet. Kein freiwilliger Karrierewechsel, sondern medizinische Realität. Seitdem berufliche Rehabilitation: Umschulung zum staatlich geprüften Wirtschaftsinformatiker an der SRH Heidelberg mit planmäßigem Abschluss am <strong>24. September 2026</strong>.
				</p>
				<p class="text-amber-300/90 font-medium">
					Ihr baut Software für Menschen auf der Baustelle im Schlamm mit zwei Balken Edge-Empfang. Ich war genau dieser Nutzer — nur auf Schienen statt auf dem Gerüst.
				</p>
			</div>

			<div class="lg:col-span-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs">
				<div class="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 aspect-square max-w-[220px] mx-auto">
					<img
						src="/portrait-700.webp"
						alt="Sebastian Bade"
						class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
					/>
				</div>
				<div class="text-center font-mono text-[11px] text-zinc-400">
					Sebastian Bade · ehem. Triebfahrzeugführer
				</div>
				<div class="pt-2 border-t border-zinc-800 space-y-1.5 font-mono text-zinc-400">
					<div class="flex justify-between">
						<span>Lokführer:</span>
						<span class="text-zinc-200">2017 – 2024</span>
					</div>
					<div class="flex justify-between">
						<span>Reha / Umschulung:</span>
						<span class="text-zinc-200">SRH Heidelberg</span>
					</div>
					<div class="flex justify-between">
						<span>Abschluss:</span>
						<span class="text-emerald-400 font-semibold">24.09.2026</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Technischer Beleg: Offline-First -->
		<div class="mt-6 p-5 rounded-lg border border-zinc-800 bg-zinc-900/30">
			<h3 class="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
				<Radio class="w-4 h-4 text-amber-400" />
				<span>Der technische Beweis: Offline-First in der Praxis</span>
			</h3>
			<p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
				Offline-Fähigkeit ist bei mir kein Buzzword aus dem Vorstellungsgespräch: In <strong>Life OS</strong> habe ich einen Service Worker mit strukturierter IndexedDB-Speicherung und optimistischer Synchronisations-Warteschlange für Supabase umgesetzt. In der <strong>Notiz PWA</strong> läuft die Echtzeit-Synchronisation gegen PocketBase mit lokalem Fallback. Datenverlust ist keine Option.
			</p>
		</div>
	</Sektion>

	<!-- 6. EUER PROFIL -> MEIN BELEG -->
	<Sektion id="profil" nummer="05" titel="Euer Profil → mein Beleg" subtitel="Fünf Kriterien aus eurer Stellenanzeige — belegt mit echten Artefakten statt austauschbarer Adjektive.">
		<div class="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
			<!-- Kriterium 1 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Layers class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Solides Verständnis von Softwareentwicklung</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Eigenes MVC-Framework in modernem PHP 8 im <em>PAUSE Portal</em>: Strikte Trennung von <code class="text-xs font-mono bg-zinc-900 px-1 py-0.5 rounded text-amber-300">Controller → Service → Repository</code>, PDO mit echten Prepared Statements und 21-Tabellen-MySQL-Schema mit Fremdschlüsseln und Indizes. Dazu relationale Datenmodellierung mit dbt und analytische Queries in DuckDB bei <em>Bahnpuls</em>.
				</div>
			</div>

			<!-- Kriterium 2 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Cpu class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Driven arbeiten</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					<strong>JobPuls</strong>: Statt jeden Morgen Jobportale manuell durchzuklicken, habe ich einen autonomen Radar gebaut. n8n aggregiert nachts die Feeds der Region, filtert streng, prüft Links per HTTP-Live-Request auf Phantomstellen und liefert morgens eine saubere Auswahl auf Telegram. Fertiggestellt mit einem harten Bauzeit-Deckel von 16 Stunden.
				</div>
			</div>

			<!-- Kriterium 3 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Radio class="w-4 h-4 text-amber-400 shrink-0" />
					<span>KI-native Arbeitsweise</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Eigene n8n-Instanz auf Hetzner-Server mit <strong class="text-amber-400 font-mono">{n8nStats.gesamt} Workflows ({n8nStats.aktiv} aktiv)</strong> (Stand: {n8nStats.stand}, automatisiert zur Build-Zeit verifiziert). Einsatz von Claude Code mit projektspezifischen Skills, MCP-Servern und Hooks. Und diese Bewerbungsseite hier.
				</div>
			</div>

			<!-- Kriterium 4 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<ShieldCheck class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Qualitätsanspruch</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Siehe Sektion <em>Weggeworfen</em> weiter oben: Ich prüfe KI-Code systematisch gegen Framework-Besonderheiten, Container-Laufzeiten und Sicherheitsrisiken, bevor irgendetwas in Produktion geht.
				</div>
			</div>

			<!-- Kriterium 5 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Database class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Die Plattform gemeinsam pushen</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Ich dokumentiere Architekturentscheidungen als Architecture Decision Records (ADRs), pflege strukturierte Backlogs und hinterlege KI-Kontexte so, dass fremde Entwickler und Agenten jederzeit nahtlos ansetzen können.
				</div>
			</div>
		</div>
	</Sektion>

	<!-- 7. WAS ICH NICHT KANN -->
	<Sektion id="luecken" nummer="06" titel="Was ich nicht kann" subtitel="Ehrlichkeit als Kompetenznachweis. Kein Bewerbungs-Bingo, sondern mein echter technischer Status.">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Ruby & Rails</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Noch nie produktiv geschrieben. Was ich habe: Ein selbst gebautes MVC-Framework in PHP 8 mit strikter Schichtung. Rails ist dasselbe Architekturmuster mit fertigen Konventionen, die ich mir in PHP erst selbst zusammenbauen musste.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>React Native & Expo</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Bislang nicht angefasst. Was ich beherrsche: TypeScript im Strict Mode, dateibasiertes Routing, Offline-Persistenz und Schema-Validierung mit Zod — aus SvelteKit und PWAs.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Redis & Mandanten-Subdomains</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Konzeptionell verstanden, aber noch nicht selbst im Cluster betrieben. Am nächsten dran: Row-Level Security in PostgreSQL über Supabase — saubere Mandantentrennung auf Datenbankebene statt im Applikations-Code.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Hotwire</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Bisher nur Dokumentation gelesen. Diese Seite wäre der ehrlichere Ort für einen Beweis gewesen — dafür haben zwei Tage nicht gereicht. Eine halbfertige Rails-App wäre ein schlechteres Argument gewesen als eine funktionierende SvelteKit-Seite.
				</p>
			</div>
		</div>

		<div class="mt-6 p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200">
			Ihr schreibt in der Anzeige, kein Abschluss sei zwingend erforderlich. <strong class="text-amber-400">Ich habe trotzdem einen</strong> — ab dem 24.09.2026 als staatlich geprüfter Wirtschaftsinformatiker.
		</div>
	</Sektion>

	<!-- 8. PROJEKTE -->
	<Sektion id="projekte" nummer="07" titel="Projekte" subtitel="Ausgewählte Arbeiten aus meinem Portfolio: Problem → Entscheidung → Ergebnis.">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			{#each projekte as p}
				<div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
					<div>
						<div class="flex items-start justify-between gap-2 mb-2">
							<h3 class="text-lg font-bold text-zinc-100">{p.titel}</h3>
							<span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
								{p.badge}
							</span>
						</div>

						<div class="space-y-3 text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
							<div>
								<span class="text-zinc-500 font-mono uppercase text-[10px] block">Problem</span>
								<p class="text-zinc-300">{p.problem}</p>
							</div>
							<div>
								<span class="text-zinc-500 font-mono uppercase text-[10px] block">Entscheidung</span>
								<p class="text-zinc-300">{p.entscheidung}</p>
							</div>
							<div>
								<span class="text-emerald-500/90 font-mono uppercase text-[10px] block">Ergebnis</span>
								<p class="text-zinc-200 font-medium">{p.ergebnis}</p>
							</div>
						</div>
					</div>

					<div class="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
						<a
							href={p.link}
							target="_blank"
							rel="noreferrer"
							class="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono transition-colors"
						>
							<span>Repo ansehen</span>
							<ArrowUpRight class="w-3.5 h-3.5" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</Sektion>

	<!-- 9. FRAG DEN AGENTEN -->
	<Sektion id="agent" nummer="08" titel="Frag den Agenten" subtitel="Ein echter n8n-Workflow mit Claude Haiku 4.5. Testet den Agenten mit euren eigenen technischen Fragen.">
		<Agent />
	</Sektion>

	<!-- 10. FORMALES & KONTAKT -->
	<Sektion id="kontakt" nummer="09" titel="Formales & Kontakt" subtitel="Die Eckdaten ohne Umschweife auf den Punkt.">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="space-y-4 text-sm text-zinc-300">
				<div class="flex items-start gap-3">
					<Calendar class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
					<div>
						<div class="font-semibold text-zinc-100">Verfügbarkeit</div>
						<div class="text-zinc-300">Fest zum <strong>01.10.2026</strong> (Abschluss der Umschulung am 24.09.2026). Vollzeit, unbefristet.</div>
					</div>
				</div>

				<div class="flex items-start gap-3">
					<Briefcase class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
					<div>
						<div class="font-semibold text-zinc-100">Qualifikation</div>
						<div class="text-zinc-300">Staatlich geprüfter Wirtschaftsinformatiker (SRH Heidelberg, berufliche Rehabilitation).</div>
					</div>
				</div>

				<div class="flex items-start gap-3">
					<MapPin class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
					<div>
						<div class="font-semibold text-zinc-100">Standort & Arbeitsmodell</div>
						<div class="text-zinc-300">100 % Remote bundesweit. Wohnort Mannheim. Reisetätigkeit zu Team-Events per Bahn unproblematisch.</div>
					</div>
				</div>
			</div>

			<div class="p-6 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-4">
				<div class="font-mono text-xs uppercase tracking-wider text-amber-400">Direkter Draht</div>

				<div class="space-y-2.5 text-sm">
					<a href="mailto:badesebastian@outlook.com" class="flex items-center gap-2.5 text-zinc-200 hover:text-amber-300 transition-colors">
						<Mail class="w-4 h-4 text-zinc-400" />
						<span>badesebastian@outlook.com</span>
					</a>

					<a href="tel:+491736644010" class="flex items-center gap-2.5 text-zinc-200 hover:text-amber-300 transition-colors">
						<Phone class="w-4 h-4 text-zinc-400" />
						<span>+49 173 6644010</span>
					</a>

					<a href="https://github.com/Godsizee" target="_blank" rel="noreferrer" class="flex items-center gap-2.5 text-zinc-200 hover:text-amber-300 transition-colors">
						<GithubIcon class="w-4 h-4 text-zinc-400" />
						<span>github.com/Godsizee</span>
					</a>

					<a href="https://ichbin.dasdann.jetzt" target="_blank" rel="noreferrer" class="flex items-center gap-2.5 text-zinc-200 hover:text-amber-300 transition-colors">
						<ExternalLink class="w-4 h-4 text-zinc-400" />
						<span>ichbin.dasdann.jetzt (Portfolio)</span>
					</a>
				</div>

				<div class="pt-4 border-t border-zinc-800">
					<a
						href="/Lebenslauf-Sebastian-Bade.pdf"
						download
						class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs transition-colors border border-zinc-700"
					>
						<FileText class="w-4 h-4 text-amber-400" />
						<span>Lebenslauf herunterladen (PDF)</span>
					</a>
				</div>
			</div>
		</div>
	</Sektion>
</main>

<footer class="border-t border-zinc-900 bg-zinc-950 py-12 text-xs font-mono text-zinc-500">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
		<div>
			<span>© 2026 Sebastian Bade · Gebaut für die BauTask GmbH</span>
		</div>
		<div class="flex items-center gap-4 text-zinc-400">
			<a href="/impressum" class="hover:text-amber-400 transition-colors">Impressum</a>
			<span>·</span>
			<a href="/datenschutz" class="hover:text-amber-400 transition-colors">Datenschutz</a>
			<span>·</span>
			<a href="#hero" class="hover:text-amber-400 transition-colors">Nach oben ↑</a>
		</div>
	</div>
</footer>
