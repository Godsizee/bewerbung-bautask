<script lang="ts">
	import { ChevronDown, X } from 'lucide-svelte';
	import { sektionen } from '$lib/sektionen';

	let { aktiv = 'hero' }: { aktiv?: string } = $props();

	let offen = $state(false);
	let istSchmalViewport = $state(false);
	let wrapper = $state<HTMLElement | null>(null);
	let panel = $state<HTMLElement | null>(null);
	let ausloeser = $state<HTMLElement | null>(null);

	/** Sichtbare fokussierbare Elemente im Panel, in Dokumentreihenfolge.
	 *  offsetParent filtert die Eintraege raus, die per lg:hidden weg sind. */
	function fokussierbare(): HTMLElement[] {
		if (!panel) return [];
		return Array.from(
			panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
		).filter((el) => el.offsetParent !== null);
	}

	function schliessen() {
		offen = false;
	}

	function umschalten() {
		offen = !offen;
	}

	function viewportPruefen() {
		// < lg: Vollbild-Overlay (Modal). Ab lg: kleines angedocktes Dropdown,
		// dahinter bleibt die Seite bedien- und scrollbar.
		istSchmalViewport = window.matchMedia('(max-width: 1023px)').matches;
	}

	$effect(() => {
		viewportPruefen();
		window.addEventListener('resize', viewportPruefen);
		return () => window.removeEventListener('resize', viewportPruefen);
	});

	$effect(() => {
		if (!offen) return;

		const vorherOverflow = document.body.style.overflow;
		if (istSchmalViewport) document.body.style.overflow = 'hidden';
		panel?.focus();

		function beiTaste(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				schliessen();
				return;
			}

			// Fokus-Trap nur im Vollbild-Modus: dort ist das Panel ein Dialog mit
			// aria-modal, hinter dem nichts mehr erreichbar sein darf. Das angedockte
			// Dropdown ab lg ist kein Modal - da gehoert Tab weiter in die Seite.
			if (e.key !== 'Tab' || !istSchmalViewport) return;

			const elemente = fokussierbare();
			if (elemente.length === 0) return;

			const erster = elemente[0];
			const letzter = elemente[elemente.length - 1];
			const aktuell = document.activeElement;

			if (e.shiftKey && (aktuell === erster || aktuell === panel)) {
				e.preventDefault();
				letzter.focus();
			} else if (!e.shiftKey && aktuell === letzter) {
				e.preventDefault();
				erster.focus();
			}
		}
		function beiKlickAusserhalb(e: MouseEvent) {
			if (wrapper && !wrapper.contains(e.target as Node)) schliessen();
		}
		window.addEventListener('keydown', beiTaste);
		// Erst im naechsten Tick registrieren, sonst schliesst der Klick, der das
		// Menue oeffnet (Bubble-Phase erreicht window noch im selben Umlauf), es
		// im selben Moment wieder.
		const timer = window.setTimeout(() => window.addEventListener('click', beiKlickAusserhalb), 0);

		return () => {
			document.body.style.overflow = vorherOverflow;
			window.removeEventListener('keydown', beiTaste);
			window.removeEventListener('click', beiKlickAusserhalb);
			window.clearTimeout(timer);

			// Fokus zurueck an den Oeffner, sonst faellt er beim Schliessen auf <body>
			// und die naechste Tab-Taste faengt wieder ganz oben an.
			if (panel?.contains(document.activeElement)) ausloeser?.focus();
		};
	});
</script>

<div bind:this={wrapper} class="relative">
	<button
		bind:this={ausloeser}
		type="button"
		onclick={umschalten}
		aria-expanded={offen}
		aria-controls="sektionsmenue-panel"
		class="inline-flex items-center gap-1.5 h-10 px-2.5 rounded border border-zinc-700
		       text-zinc-300 hover:text-amber-300 hover:border-zinc-600 transition-colors"
	>
		<span>// Sektionen</span>
		<ChevronDown class="h-3.5 w-3.5 transition-transform duration-200 {offen ? 'rotate-180' : ''}" />
	</button>

	<div
		bind:this={panel}
		id="sektionsmenue-panel"
		role={istSchmalViewport ? 'dialog' : undefined}
		aria-modal={istSchmalViewport ? 'true' : undefined}
		aria-label="Sektionen"
		tabindex="-1"
		class="fixed inset-0 z-60 bg-zinc-950 overflow-y-auto
		       lg:absolute lg:inset-auto lg:right-0 lg:top-full lg:mt-2 lg:z-50
		       lg:w-80 lg:overflow-hidden lg:rounded-xl lg:border lg:border-zinc-800
		       lg:bg-zinc-950 lg:shadow-2xl lg:shadow-black/40
		       origin-top-right transition-all duration-150 ease-out
		       {offen
		         ? 'opacity-100 scale-100 translate-y-0 visible pointer-events-auto'
		         : 'opacity-0 lg:scale-95 lg:-translate-y-1 invisible pointer-events-none'}"
	>
		<div class="px-4 sm:px-6 lg:px-4 py-4 lg:py-3">
			<div class="flex items-center justify-between h-14 lg:hidden">
				<span class="font-mono text-xs text-zinc-500">// Sektionen</span>
				<button
					type="button"
					onclick={schliessen}
					aria-label="Menü schließen"
					class="inline-flex h-11 w-11 items-center justify-center rounded-md border border-zinc-700 text-zinc-300"
				>
					<X class="h-4 w-4" />
				</button>
			</div>

			<nav class="mt-4 lg:mt-0 divide-y divide-zinc-900 border-y border-zinc-900 lg:divide-y-0 lg:border-none">
				<a href="#hero" onclick={schliessen}
				   class="flex items-baseline gap-3 py-4 lg:py-2 lg:px-2 lg:rounded-lg lg:hover:bg-zinc-900 transition-colors font-mono text-sm
				          {aktiv === 'hero' ? 'text-amber-400' : 'text-zinc-300'}">
					<span class="text-amber-500/80 w-8 shrink-0">//</span>
					<span>Nach oben</span>
				</a>
				{#each sektionen as s (s.id)}
					<a href="#{s.id}" onclick={schliessen}
					   aria-current={aktiv === s.id ? 'true' : undefined}
					   class="flex items-baseline gap-3 py-4 lg:py-2 lg:px-2 lg:rounded-lg lg:hover:bg-zinc-900 transition-colors font-mono text-sm
					          {aktiv === s.id ? 'text-amber-400' : 'text-zinc-300'}">
						<span class="text-amber-500/80 w-8 shrink-0">{s.nummer}</span>
						<span class="font-sans">{s.titel}</span>
					</a>
				{/each}
			</nav>

			<div class="mt-6 lg:mt-3 lg:pt-3 lg:border-t lg:border-zinc-900 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
				<a href="/impressum" onclick={schliessen} class="hover:text-amber-400">Impressum</a>
				<a href="/datenschutz" onclick={schliessen} class="hover:text-amber-400">Datenschutz</a>
			</div>
		</div>
	</div>
</div>
