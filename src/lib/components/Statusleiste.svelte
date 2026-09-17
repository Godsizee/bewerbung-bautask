<script lang="ts">
	interface Props {
		commitCount?: number;
		stunden?: number;
	}

	let { commitCount = 6, stunden = 3 }: Props = $props();
</script>

<header class="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
	<div class="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between text-xs font-mono">
		<div class="flex items-center gap-3">
			<a href="#hero" class="font-bold tracking-wider text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2">
				<span class="inline-block w-2 h-2 rounded-full bg-amber-400"></span>
				<span>BAUTASK // BADE</span>
			</a>
			<span class="text-zinc-600 hidden sm:inline">|</span>
			<span class="text-zinc-400 hidden sm:inline">SvelteKit 2 · TS · Tailwind 4</span>
		</div>

		<div class="flex items-center gap-4 sm:gap-6 text-zinc-400">
			<div class="hidden md:flex items-center gap-2 text-zinc-500">
				<span>Git: <strong class="text-zinc-300 font-normal">{commitCount} Commits</strong></span>
				<span>·</span>
				<span>Zeit: <strong class="text-zinc-300 font-normal">~{stunden}h</strong></span>
			</div>

			<a
				href="#agent"
				class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors"
			>
				<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
				<span>Frag den Agenten</span>
				<span class="text-amber-400/60">↓</span>
			</a>
		</div>
	</div>
</header>
