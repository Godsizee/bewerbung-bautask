<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		nummer?: string;
		titel: string;
		subtitel?: string;
		class?: string;
		children?: Snippet;
	}

	let { id, nummer, titel, subtitel, class: className = '', children }: Props = $props();
</script>

<section {id} class="py-16 sm:py-20 border-b border-zinc-900 scroll-mt-14 {className}">
	<div class="max-w-4xl mx-auto px-4 sm:px-6">
		<header class="mb-8">
			{#if nummer}
				<div class="font-mono text-xs text-amber-500/80 mb-1.5 tracking-wider uppercase">
					// {nummer}
				</div>
			{/if}
			<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
				{titel}
			</h2>
			{#if subtitel}
				<p class="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
					{subtitel}
				</p>
			{/if}
		</header>

		<div class="space-y-6 text-zinc-300 leading-relaxed">
			{@render children?.()}
		</div>
	</div>
</section>
