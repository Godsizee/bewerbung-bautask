<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	import { sektionen } from '$lib/sektionen';

	let { aktiv = 'hero' }: { aktiv?: string } = $props();

	let offen = $state(false);
	let dialog = $state<HTMLElement | null>(null);

	function schliessen() {
		offen = false;
	}

	$effect(() => {
		if (!offen) return;
		// Hintergrund nicht mitscrollen lassen, solange das Menü offen ist.
		const vorher = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		dialog?.focus();

		function beiTaste(e: KeyboardEvent) {
			if (e.key === 'Escape') schliessen();
		}
		window.addEventListener('keydown', beiTaste);

		return () => {
			document.body.style.overflow = vorher;
			window.removeEventListener('keydown', beiTaste);
		};
	});
</script>

<button
	type="button"
	onclick={() => (offen = true)}
	aria-expanded={offen}
	aria-haspopup="dialog"
	class="lg:hidden inline-flex items-center gap-1.5 h-10 px-2.5 rounded border border-zinc-700
	       text-zinc-300 hover:text-amber-300 transition-colors"
>
	<Menu class="h-4 w-4" />
	<span>// Sektionen</span>
</button>

{#if offen}
	<div
		bind:this={dialog}
		role="dialog"
		aria-modal="true"
		aria-label="Sektionen"
		tabindex="-1"
		class="fixed inset-0 z-[60] bg-zinc-950 lg:hidden overflow-y-auto"
	>
		<div class="spur py-4">
			<div class="flex items-center justify-between h-14">
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

			<nav class="mt-4 divide-y divide-zinc-900 border-y border-zinc-900">
				<a href="#hero" onclick={schliessen}
				   class="flex items-baseline gap-3 py-4 font-mono text-sm
				          {aktiv === 'hero' ? 'text-amber-400' : 'text-zinc-300'}">
					<span class="text-amber-500/80 w-8 shrink-0">//</span>
					<span>Nach oben</span>
				</a>
				{#each sektionen as s (s.id)}
					<a href="#{s.id}" onclick={schliessen}
					   aria-current={aktiv === s.id ? 'true' : undefined}
					   class="flex items-baseline gap-3 py-4 font-mono text-sm
					          {aktiv === s.id ? 'text-amber-400' : 'text-zinc-300'}">
						<span class="text-amber-500/80 w-8 shrink-0">{s.nummer}</span>
						<span class="font-sans">{s.titel}</span>
					</a>
				{/each}
			</nav>

			<div class="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-zinc-500">
				<a href="/impressum" onclick={schliessen} class="hover:text-amber-400">Impressum</a>
				<a href="/datenschutz" onclick={schliessen} class="hover:text-amber-400">Datenschutz</a>
			</div>
		</div>
	</div>
{/if}
