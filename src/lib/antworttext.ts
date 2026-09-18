export interface Segment {
	fett: boolean;
	text: string;
}

/**
 * Zerlegt eine Modellantwort in Textsegmente und **fett** markierte Segmente.
 *
 * Der System-Prompt verlangt reinen Text (siehe n8n/system-prompt.md), aber ein LLM
 * liefert gelegentlich doch **fett**. Die Segmente werden einzeln gerendert statt per
 * {@html} - so kann aus der Modellantwort kein Markup in die Seite gelangen.
 */
export function segmente(text: string): Segment[] {
	return text
		.split(/(\*\*[^*]+\*\*)/g)
		.filter(Boolean)
		.map((teil) =>
			teil.startsWith('**') && teil.endsWith('**')
				? { fett: true, text: teil.slice(2, -2) }
				: { fett: false, text: teil }
		);
}
