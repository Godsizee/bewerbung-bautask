<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		quelle?: string;
		children?: Snippet;
	}

	let { quelle = 'Aus eurer Stellenanzeige', children }: Props = $props();
</script>

<blockquote class="my-6 rounded-r-lg border-l-2 border-amber-500 bg-zinc-900/60 p-4 sm:p-5 text-zinc-200">
	<div class="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-amber-400/90">
		<span class="inline-block h-1 w-1 rounded-full bg-amber-400"></span>
		<span>{quelle}</span>
	</div>
	<div class="text-base sm:text-lg font-medium leading-relaxed italic text-zinc-100">
		{@render children?.()}
	</div>
</blockquote>
