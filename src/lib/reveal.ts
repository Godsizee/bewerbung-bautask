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

	// Was beim Hydrieren schon im Bild steht, wurde serverseitig sichtbar
	// ausgeliefert. Wuerde die Action es jetzt noch auf opacity-0 setzen, blitzte
	// es einmal weg und wieder herein. Solche Sektionen bleiben deshalb, wie sie
	// sind - eingeblendet wird nur, was der Besucher noch gar nicht gesehen hat.
	const kasten = node.getBoundingClientRect();
	if (kasten.top < window.innerHeight && kasten.bottom > 0) {
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
