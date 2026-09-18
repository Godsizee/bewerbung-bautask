<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Bewerbung · Sebastian Bade · BauTask</title>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://betrachte.dasdann.jetzt/" />
	<meta property="og:title" content="Bewerbung · Sebastian Bade · BauTask" />
	<meta property="og:description" content="Bewerbung von Sebastian Bade als Software Entwickler bei der BauTask GmbH" />
	<meta property="og:image" content="https://betrachte.dasdann.jetzt/portrait-700.webp" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}
