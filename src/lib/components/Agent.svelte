<script lang="ts">
	import { Send, Sparkles, Terminal, AlertCircle, RefreshCw } from 'lucide-svelte';
	import { segmente } from '$lib/antworttext';

	let frage = $state('');
	let antwort = $state('');
	let loading = $state(false);
	let fehler = $state<string | null>(null);
	let isRateLimit = $state(false);
	let dauer = $state<number | null>(null);

	const beispielfragen = [
		'Hast du schon mal was Offline-fähiges gebaut?',
		'Was kannst du nicht?',
		'Warum Lokführer und jetzt Software?'
	];

	async function sendeFrage(text?: string) {
		const q = (text ?? frage).trim();
		if (!q || q.length < 3 || loading) return;

		frage = q;
		loading = true;
		fehler = null;
		isRateLimit = false;
		antwort = '';
		dauer = null;
		const start = performance.now();

		try {
			const res = await fetch('/api/frag', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ frage: q })
			});

			if (res.status === 429) {
				isRateLimit = true;
				fehler = 'Zu viele Anfragen in kurzer Zeit. Bitte kurz durchatmen.';
				return;
			}

			if (!res.ok) {
				const errData = await res.json().catch(() => null);
				fehler = errData?.message || 'Der Agent konnte gerade nicht antworten.';
				return;
			}

			const data = await res.json();
			antwort = data.antwort || 'Keine Antwort erhalten.';
			dauer = (performance.now() - start) / 1000;
		} catch (err: unknown) {
			fehler = 'Netzwerkfehler: Verbindung zum Server fehlgeschlagen.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-sm">
	<div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
		<div class="flex items-center gap-3">
			<div class="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
				<Sparkles class="w-5 h-5" />
			</div>
			<div>
				<h3 class="text-lg font-semibold text-zinc-100 flex items-center gap-2">
					<span>Basti-Agent</span>
					<span class="inline-flex items-center gap-1 text-xs sm:text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
						<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
						Haiku 4.5 via n8n
					</span>
				</h3>
				<p class="text-xs text-zinc-400 mt-0.5">
					Ihr müsst das hier nicht alles lesen. Fragt einfach direkt.
				</p>
			</div>
		</div>

		<!-- Architektur-Mini-Badge -->
		<div class="hidden lg:flex items-center gap-1.5 font-mono text-xs sm:text-[11px] text-zinc-500 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800/80">
			<Terminal class="w-3.5 h-3.5 text-zinc-400" />
			<span>Browser</span>
			<span class="text-zinc-700">→</span>
			<span>/api/frag (Rate-Limit)</span>
			<span class="text-zinc-700">→</span>
			<span>n8n Webhook</span>
			<span class="text-zinc-700">→</span>
			<span>Claude</span>
		</div>
	</div>

	<!-- Schnellklick-Beispielfragen -->
	<div class="mb-5">
		<div class="text-xs font-mono text-zinc-400 mb-2">Zum Anklicken:</div>
		<div class="flex flex-wrap gap-2">
			{#each beispielfragen as bFrage}
				<button
					type="button"
					onclick={() => sendeFrage(bFrage)}
					disabled={loading}
					class="text-xs text-left px-3 py-2.5 min-h-11 sm:min-h-0 sm:py-1.5 rounded-md bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-amber-300 transition-colors disabled:opacity-50"
				>
					„{bFrage}“
				</button>
			{/each}
		</div>
	</div>

	<!-- Eingabeformular -->
	<form
		onsubmit={(e) => {
			e.preventDefault();
			sendeFrage();
		}}
		class="space-y-3"
	>
		<div class="relative">
			<textarea
				bind:value={frage}
				aria-label="Frage an den Agenten"
				disabled={loading}
				rows="3"
				maxlength="300"
				placeholder="Zum Beispiel: Was hast du in der Nachtschicht gelernt? Oder: Welche Datenbanken kennst du wirklich?"
				class="w-full rounded-lg bg-zinc-950 border border-zinc-700/80 p-3.5 pr-12 text-sm text-zinc-100 placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/40 transition-colors resize-none disabled:opacity-60 font-sans"
			></textarea>

			<button
				type="submit"
				disabled={loading || frage.trim().length < 3 || frage.length > 300}
				class="absolute right-3 bottom-3 p-2.5 min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 sm:p-2 rounded-md bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 transition-all cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
				title="Frage absenden"
			>
				{#if loading}
					<RefreshCw class="w-4 h-4 animate-spin" />
				{:else}
					<Send class="w-4 h-4" />
				{/if}
			</button>
		</div>

		<div class="flex items-center justify-between text-xs text-zinc-500 font-mono">
			<span>Fragen laufen über meine Hetzner n8n-Instanz. Nichts wird gespeichert.</span>
			<span class={frage.length > 280 ? 'text-amber-400' : ''}>{frage.length}/300</span>
		</div>
	</form>

	<!-- Antwort- oder Fehlerbox -->
	{#if loading}
		<div class="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-3 text-sm text-amber-300/90 font-mono">
			<RefreshCw class="w-4 h-4 animate-spin text-amber-400" />
			<span>Der Agent denkt kurz nach ...</span>
		</div>
	{:else if fehler}
		<div class="mt-5 rounded-lg border border-red-500/30 bg-red-950/40 p-4 flex items-start gap-3 text-sm text-red-200">
			<AlertCircle class="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
			<div>
				<div class="font-semibold text-red-300">{isRateLimit ? 'Limit erreicht' : 'Da ging was schief'}</div>
				<p class="mt-1 text-xs text-red-200/80">{fehler}</p>
			</div>
		</div>
	{:else if antwort}
		<div class="mt-5 rounded-lg border border-zinc-700 bg-zinc-950 p-5 space-y-2">
			<div class="text-xs sm:text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center justify-between">
				<span>Antwort des Agenten</span>
				{#if dauer !== null}
					<span class="text-zinc-500 font-normal">Antwortzeit {dauer.toFixed(1)}s</span>
				{/if}
			</div>
			<div class="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans whitespace-pre-line">
				{#each segmente(antwort) as s}{#if s.fett}<strong class="font-semibold text-zinc-100">{s.text}</strong>{:else}{s.text}{/if}{/each}
			</div>
		</div>
	{/if}
</div>
