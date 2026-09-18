import type { Handle } from '@sveltejs/kit';

/**
 * Sicherheits-Header fuer jede Antwort.
 *
 * Bewusst in der App und nicht im Traefik-Labelsatz: so gelten sie auch lokal
 * unter `npm run start` und wandern mit dem Repo mit, statt in einer
 * Coolify-Oberflaeche zu leben, die niemand mitliest.
 *
 * Keine Content-Security-Policy: die liesse sich hier nur blind setzen. Eine CSP,
 * die man nicht im Browser gegengeprueft hat, faellt entweder auf eine weisse
 * Seite oder auf ein wirkungsloses unsafe-inline zurueck.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const antwort = await resolve(event);

	antwort.headers.set('X-Content-Type-Options', 'nosniff');
	antwort.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	antwort.headers.set('X-Frame-Options', 'DENY');
	antwort.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

	// Nur ueber TLS senden. Ueber http waere der Header wirkungslos, und lokal
	// unter http://localhost wuerde er nur stoeren.
	if (event.url.protocol === 'https:') {
		antwort.headers.set('Strict-Transport-Security', 'max-age=31536000');
	}

	return antwort;
};
