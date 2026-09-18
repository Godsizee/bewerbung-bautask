<script lang="ts">
	import { sektionen } from '$lib/sektionen';
	import Sektionsmenue from './Sektionsmenue.svelte';

	interface Props {
		commitCount?: number;
		stunden?: number;
	}

	let { commitCount = 6, stunden = 3 }: Props = $props();

	let leiste = $state<HTMLElement | null>(null);
	let aktiv = $state('hero');
	let angefordert = false;

	/* Bewusst kein IntersectionObserver: Die Sektionen sind zwischen ~600px und
	   ~1400px hoch, damit wird rootMargin je nach Scrollrichtung unzuverlässig.
	   Regel hier: die letzte Sektion, deren Oberkante schon unter der Kopfzeile
	   durch ist. Deterministisch und in beide Richtungen gleich. */
	function neuBerechnen() {
		angefordert = false;
		const grenze = (leiste?.offsetHeight ?? 56) + 8;
		let gefunden = 'hero';
		for (const s of sektionen) {
			const el = document.getElementById(s.id);
			if (el && el.getBoundingClientRect().top <= grenze) gefunden = s.id;
		}
		// Am Seitenende immer die letzte Sektion markieren — sonst bleibt "Kontakt"
		// unerreichbar, weil die Sektion kürzer ist als der Viewport.
		if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
			gefunden = sektionen[sektionen.length - 1].id;
		}
		aktiv = gefunden;
	}

	function beiScroll() {
		if (angefordert) return;
		angefordert = true;
		requestAnimationFrame(neuBerechnen);
	}

	$effect(() => {
		neuBerechnen();
		window.addEventListener('scroll', beiScroll, { passive: true });
		window.addEventListener('resize', beiScroll);
		return () => {
			window.removeEventListener('scroll', beiScroll);
			window.removeEventListener('resize', beiScroll);
		};
	});
</script>

<header bind:this={leiste} class="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
	<div class="spur h-14 lg:h-12 flex items-center justify-between gap-4 text-xs font-mono">
		<div class="flex items-center gap-3 min-w-0 shrink-0">
			<a
				href="#hero"
				class="font-bold tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 shrink-0"
			>
				<span class="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
				<span>BAUTASK // BADE</span>
			</a>
			<span class="text-zinc-600 hidden sm:inline">|</span>
			<span class="text-zinc-400 hidden sm:inline">SvelteKit 2 · TS · Tailwind 4</span>
		</div>

		<div class="flex items-center gap-3 sm:gap-6 text-zinc-400 shrink-0">
			<div
				class="hidden 2xl:flex items-center gap-2 text-zinc-500"
				title="Aktive Zeit zwischen zwei Commits. Pausen über zwei Stunden zählen nicht mit — kalendarisch waren es zwei Tage."
			>
				<span>Git: <strong class="text-zinc-300 font-normal">{commitCount} Commits</strong></span>
				<span>·</span>
				<span>Zeit: <strong class="text-zinc-300 font-normal">~{stunden}h aktiv</strong></span>
			</div>

			<a
				href="#agent"
				class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
				<span class="hidden sm:inline">Frag den Agenten</span>
				<span class="text-amber-400/60">↓</span>
			</a>

			<Sektionsmenue {aktiv} />
		</div>
	</div>
</header>
