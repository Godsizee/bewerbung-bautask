import { describe, it, expect } from 'vitest';
import { segmente } from './antworttext';

describe('segmente', () => {
	it('laesst reinen Text unangetastet', () => {
		expect(segmente('Moin.')).toEqual([{ fett: false, text: 'Moin.' }]);
	});

	it('trennt **fett** vom umgebenden Text', () => {
		expect(segmente('Ab **01.10.2026** verfuegbar.')).toEqual([
			{ fett: false, text: 'Ab ' },
			{ fett: true, text: '01.10.2026' },
			{ fett: false, text: ' verfuegbar.' }
		]);
	});

	it('wirft leere Teilstuecke weg', () => {
		expect(segmente('**nur fett**')).toEqual([{ fett: true, text: 'nur fett' }]);
	});

	// Der eigentliche Zweck der Funktion: die Modellantwort wird segmentweise
	// gerendert statt per {@html}. Markup aus dem LLM bleibt damit Text.
	it('behandelt Markup als Text und nicht als Auszeichnung', () => {
		const boesartig = '<img src=x onerror=alert(1)>';
		expect(segmente(boesartig)).toEqual([{ fett: false, text: boesartig }]);
	});
});
