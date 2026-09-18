/**
 * Svelte-Action: blendet ein Element sanft ein, sobald es beim Scrollen in den
 * Viewport kommt. Einmalig (kein Ein-/Ausblenden je Scrollrichtung), rein
 * CSS-transition-getrieben, damit die globale prefers-reduced-motion-Regel in
 * app.css automatisch greift (dort wird transition-duration auf 0.01ms gesetzt).
 *
 * Zusätzlich hier in JS geprüft: Wer reduzierte Bewegung eingestellt hat, sieht
 * den Inhalt sofort — ohne kurzes "unsichtbar, bis der Observer feuert".
 */
export function reveal(node: HTMLElement) {
	const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduziert || typeof IntersectionObserver === 'undefined') {
		return {};
	}

	node.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700', 'ease-out');

	const beobachter = new IntersectionObserver(
		(eintraege) => {
			for (const eintrag of eintraege) {
				if (eintrag.isIntersecting) {
					node.classList.remove('opacity-0', 'translate-y-4');
					beobachter.unobserve(node);
				}
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
	);
	beobachter.observe(node);

	return {
		destroy() {
			beobachter.disconnect();
		}
	};
}
