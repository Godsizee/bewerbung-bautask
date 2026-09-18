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
			was: 'Ein Bot, der mir jeden Morgen passende Stellenanzeigen auf Telegram legt. Läuft nachts von allein auf meiner eigenen n8n-Instanz.',
			problem: 'Jeden Tag durch fünf Jobportale klicken kostet Stunden. Und die Hälfte der Treffer ist alt, doppelt oder passt überhaupt nicht.',
			entscheidung: 'Die Sucherei komplett an n8n abgegeben: nachts die Feeds abholen, alles Unpassende rauswerfen, jeden Link einmal live aufrufen — ist die Stelle schon weg, kommt sie gar nicht erst an. Morgens liegt die fertige Liste im Chat.',
			ergebnis: 'Läuft seitdem ohne mein Zutun. In 16 Stunden gebaut, spart mir jeden Tag rund anderthalb Stunden Klickerei.',
			repos: []
		},
		{
			titel: 'Life OS',
			badge: 'SvelteKit · TypeScript · Supabase RLS · PWA',
			was: 'Eine App für den gemeinsamen Alltag zu zweit: Aufgaben, Notizen, Einkaufsliste und Termine an einem Ort statt in fünf Apps. Installiert sich wie eine native App.',
			problem: 'Genau solche Apps steigen aus, sobald das Netz weg ist — im Zug, im Keller, im Funkloch. Und das ist meistens der Moment, in dem man schnell etwas eintragen will.',
			entscheidung: 'Die App arbeitet zuerst lokal, nicht zuerst am Server. Jede Eingabe landet sofort in einer Datenbank im Browser, der Abgleich mit Postgres läuft später im Hintergrund nach. Wer was sehen darf, entscheidet die Datenbank selbst per Row-Level Security — nicht der Client.',
			ergebnis: 'Offline fühlt sich an wie online: unter 16 ms, bis die Eingabe steht. Kommt das Netz zurück, gleicht sich alles von allein ab, ohne dass man davon etwas mitbekommt.',
			repos: [{ label: 'Repo ansehen', url: 'https://github.com/Godsizee/Life-OS' }]
		},
		{
			titel: 'PAUSE Portal',
			badge: 'PHP 8 MVC · MySQL · Vorbereitung Laravel 12',
			was: 'Ein Schulportal mit vier Rollen — Schüler, Lehrer, Planer, Admin. Stundenplan und Vertretungen, Anwesenheit, Ankündigungen, Sprechstunden, Schwarzes Brett.',
			problem: 'Vier Rollen heißt: an jeder Stelle die Frage, wer etwas sehen, ändern oder nur lesen darf. Ein großes Framework nimmt einem da viel ab — versteckt aber auch, was wirklich passiert.',
			entscheidung: 'Ein eigenes, schlankes MVC in PHP 8 mit klar getrennten Schichten (Controller → Service → Repository), PDO mit Prepared Statements und 21 sauber normalisierten Tabellen samt Fremdschlüsseln. Einmal alles selbst bauen, um es wirklich zu verstehen.',
			ergebnis: '21 Tabellen, rund 98 Routen, im Betrieb. Und weil die Struktur sitzt, lässt sie sich fast 1:1 nach Laravel 12 + Vue 3 umziehen — der Migrationsplan liegt fertig daneben.',
			repos: [{ label: 'Repo ansehen', url: 'https://github.com/Godsizee/PAUSE' }]
		},
		{
			titel: 'TramPuls',
			badge: 'Go · DuckDB · Parquet · dbt · GTFS-RT',
			was: 'Pünktlichkeits-Statistik für Straßenbahn und Bus der RNV. Der offene Echtzeit-Fahrplanstrom des VRN wird durchgehend mitgehört und archiviert — damit man am Ende beantworten kann, wie pünktlich eine Linie wirklich fährt.',
			problem: 'Nach ein paar Monaten liegen da Millionen Fahrtmeldungen. Eine normale Datenbank ist auf einzelne Schreibvorgänge ausgelegt und braucht für eine Frage wie „Wie pünktlich war Linie 5 im März?“ spürbar lange.',
			entscheidung: 'Kein Data Warehouse dafür mieten. Ein Go-Dienst holt die Daten ab und schreibt sie in komprimierte Parquet-Dateien; ausgewertet wird direkt darauf mit DuckDB, die Auswertungen selbst sind dbt-Modelle.',
			ergebnis: 'Eine Auswertung über einen ganzen Monat kommt in Millisekunden zurück — auf demselben kleinen Server, der die Daten auch sammelt. Läuft öffentlich, könnt ihr anklicken.',
			repos: [
				{ label: 'Live ansehen', url: 'https://trampuls.dasdann.jetzt/' },
				{ label: 'Repo ansehen', url: 'https://github.com/Godsizee/trampuls' }
			]
		}
	];

	const buildLogCommits = buildLog.commits;
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-amber-500 focus:text-zinc-950 focus:font-semibold"
>
	Zum Hauptinhalt springen
</a>

<Statusleiste commitCount={buildLog.commitCount} stunden={buildLog.stunden} />

<main id="main-content" class="min-h-screen">
	<!-- 1. HERO -->
	<section id="hero" class="pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-zinc-900">
		<div class="max-w-4xl mx-auto px-4 sm:px-6">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-6">
				<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
				<span>Bewerbung // Software Entwickler Full-Stack</span>
			</div>

			<p class="text-base sm:text-lg text-zinc-400 mb-3">Moin nach Hamburg.</p>

			<h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-100 leading-[1.15]">
				Ihr wollt keine perfekte Bewerbung.<br />
				<span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
					Hier sind zwei Tage.
				</span>
			</h1>

			<p class="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
				Donnerstagmittag angefangen, Freitag online. Gebaut mit denselben Werkzeugen, mit denen ihr auch arbeitet. Weiter unten steht das komplette Protokoll — inklusive der Stellen, an denen ich den Output der KI weggeworfen habe.
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
				Ich hatte kein Quartal. Und keine Woche. Ich hatte zwei Tage.
			</p>
			<p>
				Was dabei rausgekommen ist, seht ihr gerade. Ein Agent, der wirklich antwortet — dahinter meine eigene n8n-Instanz. Eine Server-Route, die den Webhook versteckt und Missbrauch abfängt. Drumherum SvelteKit mit Svelte 5 und Tailwind 4.
			</p>
			<p>
				Nicht Rails, nicht Hotwire. Warum nicht, steht weiter unten. Ohne Ausreden.
			</p>
			<p class="text-zinc-400 text-sm">
				Die Git-Historie liegt offen, jeder Commit hat einen Zeitstempel, an dem ich nicht gedreht habe. Ihr müsst mir also kein Wort glauben — schaut in den Code.
			</p>
		</div>
	</Sektion>

	<!-- 3. BUILD-LOG -->
	<Sektion id="build-log" nummer="02" titel="Build-Log" subtitel="Jeder Commit dieser Seite, in der Reihenfolge, in der er passiert ist. Direkt aus git log gezogen, nicht von Hand hübsch gemacht.">
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
				<div class="text-xs text-zinc-400 mt-1">kamen so von der KI</div>
			</div>
			<div class="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
				<div class="text-2xl font-bold text-zinc-200 font-mono">10 %</div>
				<div class="text-xs text-zinc-400 mt-1">von Hand nachgezogen</div>
			</div>
			<div class="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
				<div class="text-2xl font-bold text-rose-400 font-mono">10 %</div>
				<div class="text-xs text-zinc-400 mt-1">wieder rausgeworfen</div>
			</div>
		</div>
		<div class="text-[11px] text-zinc-500 pt-1">Diese drei Zahlen sind geschätzt, nicht gemessen. Commits und Stunden oben sind echt.</div>
	</Sektion>

	<!-- 4. WEGGEWORFEN -->
	<Sektion id="weggeworfen" nummer="03" titel="Weggeworfen" subtitel="Ihr sucht jemanden, der weiß, wann er ein Ergebnis wegwirft. Hier sind drei Stellen aus genau diesen zwei Tagen.">
		<div class="space-y-6">
			<!-- Fall 1 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 1: Die KI wollte mir ein Tailwind-3-Setup andrehen</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Leg eine <code class="text-rose-300">tailwind.config.js</code> an und schreib <code class="text-rose-300">@tailwind base</code> ins CSS.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Tailwind 4 läuft als Vite-Plugin und will gar keine Config-Datei. Rausgekommen wäre eine blütenweiße Seite ohne ein einziges Style.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans"><code class="text-emerald-300">@tailwindcss/vite</code> ins Plugin-Array, eine Importzeile in <code class="text-emerald-300">app.css</code>. Fertig.</span>
					</div>
				</div>
			</div>

			<!-- Fall 2 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 2: Statische Env-Variablen in einem Container</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Nimm <code class="text-rose-300">$env/static/private</code> für das n8n-Secret.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Statische Variablen werden beim Build fest eingebacken. Coolify setzt die Envs aber erst zur Laufzeit im Container. Der Key wäre in Produktion schlicht leer gewesen.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans"><code class="text-emerald-300">$env/dynamic/private</code>, dazu ein Guard im Server-Handler, der meckert wenn nichts drinsteht.</span>
					</div>
				</div>
			</div>

			<!-- Fall 3 -->
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-3">
				<div class="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
					<XCircle class="w-4 h-4" />
					<span>Fall 3: Rate-Limit ohne Deckel nach oben</span>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Vorschlag</span>
						<span class="text-zinc-300 font-sans">Ein simples Zeitfenster pro IP. Sonst nichts.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-zinc-900">
						<span class="text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">Problem</span>
						<span class="text-zinc-300 font-sans">Wechselnde IPs oder ein gelangweiltes Botnet — und mein Guthaben bei Anthropic ist in ein paar Minuten weg. Auf meine Rechnung.</span>
					</div>
					<div class="p-3 rounded bg-zinc-950 border border-emerald-950/60">
						<span class="text-emerald-500 block mb-1 uppercase tracking-wider text-[10px]">Stattdessen</span>
						<span class="text-zinc-200 font-sans">Zwei Stufen: 8 Anfragen pro IP in 10 Minuten, und global harter Stopp bei 200 am Tag.</span>
					</div>
				</div>
			</div>
		</div>

		<p class="text-sm font-medium text-zinc-300 pt-2 italic border-l-2 border-zinc-700 pl-4">
			„Das ist der Teil, den ich nicht abgeben kann. Für jede Zeile, unter der mein Name steht, geradestehen muss am Ende ich.“
		</p>
	</Sektion>

	<!-- 5. ZWEI BALKEN EMPFANG -->
	<Sektion id="zwei-balken" nummer="04" titel="Zwei Balken Empfang" subtitel="Sieben Jahre Güterzug. Warum das für eine Baustellen-App relevanter ist, als es zuerst klingt.">
		<Zitat>
			„Wenn eine Arbeitszeit falsch berechnet wird, steht das am Monatsende auf einer echten Lohnabrechnung.“
		</Zitat>

		<div class="text-xl sm:text-2xl font-bold text-amber-400">
			Das war sieben Jahre lang meine Lohnabrechnung.
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<div class="lg:col-span-8 space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
				<p>
					Von 2017 bis 2024 bin ich Güterzüge gefahren. Tausende Tonnen quer durch Deutschland, für SBB Cargo International, Rail Cargo Carrier, Crossrail, Ecco Rail und Rheincargo. Berechtigungen für die Schweiz und Österreich inklusive.
				</p>
				<p>
					Nachtschicht bei minus zehn Grad. Funkloch mitten im Wald. Dokumentationspflicht für jede Bremsberechnung und jeden einzelnen Wagen.
				</p>
				<p>
					Wenn die App vom Eisenbahnverkehrsunternehmen abstürzt oder Daten verschluckt, steht der Zug. Nicht metaphorisch.
				</p>
				<p>
					<strong>2024 war Schluss.</strong> Zwei Bandscheibenvorfälle, Bahntauglichkeit dauerhaft weg. Das war keine Sinnsuche und kein Karrierewechsel, sondern ein Attest. Seitdem berufliche Reha: Umschulung zum staatlich geprüften Wirtschaftsinformatiker an der SRH Heidelberg, Abschluss am <strong>24. September 2026</strong>. Planmäßig.
				</p>
				<p class="text-amber-300/90 font-medium">
					Ihr baut Software für Leute, die im Schlamm stehen und zwei Balken Empfang haben. Ich war dieser Nutzer. Nur auf Schienen statt auf dem Gerüst.
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
				<span>Offline-First, nachweisbar</span>
			</h3>
			<p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
				Ich sage „Offline-First“ nicht, weil es in eurer Anzeige steht. In <strong>Life OS</strong> stecken ein Service Worker, eine IndexedDB als lokale Datenbank und eine Sync-Queue, die später mit Supabase abgleicht. In der <strong>Notiz-PWA</strong> läuft dasselbe gegen PocketBase, mit lokalem Fallback. Beides gebaut, bevor ich eure Anzeige gelesen habe.
			</p>
		</div>
	</Sektion>

	<!-- 6. EUER PROFIL -> MEIN BELEG -->
	<Sektion id="profil" nummer="05" titel="Euer Profil → mein Beleg" subtitel="Fünf Punkte aus eurer Anzeige. Zu jedem etwas, das man anklicken und nachlesen kann.">
		<div class="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
			<!-- Kriterium 1 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Layers class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Solides Verständnis von Softwareentwicklung</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Im <em>PAUSE Portal</em> steckt ein MVC-Framework, das ich selbst in PHP 8 geschrieben habe: <code class="text-xs font-mono bg-zinc-900 px-1 py-0.5 rounded text-amber-300">Controller → Service → Repository</code> sauber getrennt, PDO mit echten Prepared Statements, 21 Tabellen mit Fremdschlüsseln und Indizes. Bei <em>TramPuls</em> dann die andere Seite: Datenmodellierung mit dbt und analytische Queries in DuckDB.
				</div>
			</div>

			<!-- Kriterium 2 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Cpu class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Driven arbeiten</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					<strong>JobPuls</strong>. Ich hatte keine Lust, jeden Morgen fünf Jobportale durchzuklicken, also habe ich es einmal richtig gebaut: n8n holt nachts die Feeds, filtert hart, ruft jeden Link live auf und legt mir morgens eine fertige Liste auf Telegram. Bauzeit-Deckel waren 16 Stunden, danach war Schluss.
				</div>
			</div>

			<!-- Kriterium 3 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Radio class="w-4 h-4 text-amber-400 shrink-0" />
					<span>KI-native Arbeitsweise</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Auf meinem Hetzner-Server läuft eine eigene n8n-Instanz mit <strong class="text-amber-400 font-mono">{n8nStats.gesamt} Workflows, davon {n8nStats.aktiv} aktiv</strong> (Stand {n8nStats.stand}, beim Build automatisch nachgezählt). Dazu Claude Code mit eigenen Skills, MCP-Servern und Hooks. Und die Seite, auf der ihr gerade seid.
				</div>
			</div>

			<!-- Kriterium 4 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<ShieldCheck class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Qualitätsanspruch</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Steht oben unter <em>Weggeworfen</em>. Kurzfassung: Ich lese, was die KI mir hinlegt, bevor es deployed wird — gegen Framework-Eigenheiten, gegen die Laufzeitumgebung, gegen die offensichtlichen Sicherheitslöcher.
				</div>
			</div>

			<!-- Kriterium 5 -->
			<div class="py-5 grid grid-cols-1 md:grid-cols-12 gap-4">
				<div class="md:col-span-4 font-semibold text-zinc-100 flex items-center gap-2">
					<Database class="w-4 h-4 text-amber-400 shrink-0" />
					<span>Die Plattform gemeinsam pushen</span>
				</div>
				<div class="md:col-span-8 text-sm text-zinc-300 leading-relaxed">
					Architekturentscheidungen schreibe ich als ADRs mit, Backlogs sind gepflegt, und der KI-Kontext liegt so im Repo, dass jemand anderes — oder ein Agent — ohne Rückfragen weitermachen kann. Ich baue ungern Sachen, die nur ich verstehe.
				</div>
			</div>
		</div>
	</Sektion>

	<!-- 7. WAS ICH NICHT KANN -->
	<Sektion id="luecken" nummer="06" titel="Was ich nicht kann" subtitel="Was ich noch nicht kann. Ungeschönt, weil ihr es im ersten Technical sowieso merkt.">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Ruby & Rails</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Noch keine Zeile produktiv geschrieben. Was ich habe: ein MVC-Framework, das ich in PHP 8 selbst gebaut habe. Rails ist dasselbe Muster, nur mit Konventionen, die einem jemand abnimmt. Ich musste sie mir selbst zusammenschrauben.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>React Native & Expo</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Nie angefasst. Was da ist: TypeScript im Strict Mode, dateibasiertes Routing, Offline-Persistenz, Schema-Validierung mit Zod — alles aus SvelteKit und PWAs. Das meiste trägt sich rüber, der Rest ist Lernkurve.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Redis & Mandanten-Subdomains</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Verstanden, aber nie selbst im Cluster betrieben. Am dichtesten dran bin ich mit Row-Level Security in Postgres über Supabase: Mandanten sauber getrennt, und zwar in der Datenbank statt im Anwendungscode.
				</p>
			</div>

			<div class="p-5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2">
				<div class="flex items-center gap-2 text-amber-400 font-mono text-sm font-semibold">
					<XCircle class="w-4 h-4 text-zinc-500" />
					<span>Hotwire</span>
				</div>
				<p class="text-xs text-zinc-400 leading-relaxed">
					Bisher nur die Doku gelesen. Diese Seite wäre der ehrlichere Ort für einen Beweis gewesen, keine Frage. Dafür haben zwei Tage aber nicht gereicht. Eine halbfertige Rails-App hätte weniger für mich gesprochen als eine Seite, die läuft.
				</p>
			</div>
		</div>

		<div class="mt-6 p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 text-sm text-zinc-200">
			In eurer Anzeige steht, ein Abschluss sei nicht zwingend nötig. <strong class="text-amber-400">Ich habe trotzdem einen.</strong> Ab dem 24.09.2026 staatlich geprüfter Wirtschaftsinformatiker.
		</div>
	</Sektion>

	<!-- 8. PROJEKTE -->
	<Sektion id="projekte" nummer="07" titel="Projekte" subtitel="Vier Projekte von meinem GitHub. Jeweils kurz: was es überhaupt ist, woran es hakte, wofür ich mich entschieden habe und was am Ende dabei rauskam.">
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

						<p class="text-sm text-zinc-300 leading-relaxed">{p.was}</p>

						<div class="space-y-3 text-xs sm:text-sm text-zinc-300 mt-4 pt-4 border-t border-zinc-800/60 leading-relaxed">
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

					<div class="mt-6 pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
						{#each p.repos as repo}
							<a
								href={repo.url}
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono transition-colors"
							>
								<span>{repo.label}</span>
								<ArrowUpRight class="w-3.5 h-3.5" />
							</a>
						{:else}
							<span class="font-mono text-zinc-500">Repo privat — zeige ich euch gern im Gespräch</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</Sektion>

	<!-- 9. FRAG DEN AGENTEN -->
	<Sektion id="agent" nummer="08" titel="Frag den Agenten" subtitel="Dahinter läuft ein echter n8n-Workflow mit Claude Haiku 4.5. Fragt ihn was — er kennt meinen Lebenslauf inzwischen besser als ich.">
		<Agent />
	</Sektion>

	<!-- 10. FORMALES & KONTAKT -->
	<Sektion id="kontakt" nummer="09" titel="Formales & Kontakt" subtitel="Die Eckdaten. Mehr gibt es dazu nicht zu sagen.">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div class="space-y-4 text-sm text-zinc-300">
				<div class="flex items-start gap-3">
					<Calendar class="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
					<div>
						<div class="font-semibold text-zinc-100">Verfügbarkeit</div>
						<div class="text-zinc-300">Fest ab <strong>01.10.2026</strong>, Vollzeit und unbefristet. Vorher geht nicht, da läuft die Umschulung noch (Abschluss 24.09.2026).</div>
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
						<div class="text-zinc-300">100 % remote, bundesweit. Ich wohne in Mannheim. Zu Team-Events komme ich mit der Bahn — damit kenne ich mich aus.</div>
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
			<span>© 2026 Sebastian Bade · Gebaut für die Bewerbung bei der BauTask GmbH</span>
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
