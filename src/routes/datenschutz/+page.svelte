<svelte:head>
	<title>Datenschutzerklärung · Sebastian Bade · BauTask</title>
</svelte:head>

<div class="min-h-screen py-16 px-4 sm:px-6 max-w-3xl mx-auto">
	<a href="/" class="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300 mb-8">
		← Zurück zur Bewerbung
	</a>

	<h1 class="text-3xl font-bold tracking-tight text-zinc-100 mb-8">Datenschutzerklärung</h1>

	<div class="space-y-8 text-sm text-zinc-300 leading-relaxed">
		<div>
			<h2 class="text-xs font-mono uppercase tracking-wider text-amber-500/90 mb-2">1. Datenschutz auf einen Blick</h2>
			<p>
				Diese Seite verzichtet bewusst auf Tracker, Webanalyse, Marketing-Cookies und Werbenetzwerke. Schriften werden vollständig lokal vom Server ausgeliefert (kein Google Fonts CDN).
			</p>
		</div>

		<div>
			<h2 class="text-xs font-mono uppercase tracking-wider text-amber-500/90 mb-2">2. Verantwortliche Stelle</h2>
			<p>
				Sebastian Bade<br />
				Friedrich-Dürr-Str. 12<br />
				68307 Mannheim<br />
				E-Mail: <a href="mailto:badesebastian@outlook.com" class="text-amber-400 hover:underline">badesebastian@outlook.com</a>
			</p>
		</div>

		<div>
			<h2 class="text-xs font-mono uppercase tracking-wider text-amber-500/90 mb-2">3. Server-Log-Dateien & Rate-Limiting</h2>
			<p>
				Beim Aufruf der Website erfasst der Webserver temporär die üblichen Zugriffsdaten (IP-Adresse, Zeitpunkt, aufgerufene URL, User-Agent).
				Zur Vermeidung von Missbrauch und Kostenkontrolle für die KI-Schnittstelle wird Ihre IP-Adresse im Arbeitsspeicher des Webservers für maximal 10 Minuten für ein Ratenlimit (max. 8 Anfragen pro 10 Min.) zwischengespeichert. Es findet keine dauerhafte Speicherung oder Verknüpfung mit Benutzerprofilen statt.
			</p>
		</div>

		<div>
			<h2 class="text-xs font-mono uppercase tracking-wider text-amber-500/90 mb-2">4. Interaktiver Bewerbungs-Agent („Frag den Agenten“)</h2>
			<p>
				Wenn Sie das Chat-Widget („Frag den Agenten“) nutzen, wird der eingegebene Fragetext über eine serverseitige Route (<code class="text-xs font-mono bg-zinc-900 px-1 py-0.5 rounded text-amber-300">/api/frag</code>) an meine eigene, selbst gehostete n8n-Instanz (<code class="text-xs font-mono bg-zinc-900 px-1 py-0.5 rounded text-amber-300">n8n.godsize.info</code> auf einem Hetzner-Server) weitergeleitet.
			</p>
			<p class="mt-2">
				Dort wird die Frage zur Generierung einer passenden Antwort an die API von <strong>Anthropic (Claude Haiku 4.5)</strong> übermittelt.
				Weder im n8n-Workflow noch auf dem Webserver werden Ihre Fragen in einer Datenbank protokolliert. Bitte geben Sie dennoch keine vertraulichen oder personenbezogenen Daten Dritter in das Textfeld ein.
			</p>
		</div>

		<div>
			<h2 class="text-xs font-mono uppercase tracking-wider text-amber-500/90 mb-2">5. Ihre Rechte</h2>
			<p>
				Sie haben das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Datenschutz können Sie sich jederzeit an die oben angegebene Adresse wenden.
			</p>
		</div>
	</div>
</div>
