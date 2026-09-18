export interface Sektionseintrag {
	id: string;
	nummer: string;
	titel: string;
	kurz: string;
}

/** Reihenfolge und ids müssen exakt zu den <Sektion>-Aufrufen in
 *  src/routes/+page.svelte passen. Wird von Statusleiste und Mobilmenü gelesen.
 *  Die Kurzlabels sind von Basti abgenommen — nicht umbenennen. */
export const sektionen: Sektionseintrag[] = [
	{ id: 'test', nummer: '01', titel: 'Der Test', kurz: 'Test' },
	{ id: 'build-log', nummer: '02', titel: 'Build-Log', kurz: 'Build-Log' },
	{ id: 'weggeworfen', nummer: '03', titel: 'Weggeworfen', kurz: 'Weggeworfen' },
	{ id: 'zwei-balken', nummer: '04', titel: 'Zwei Balken Empfang', kurz: 'Zwei Balken' },
	{ id: 'profil', nummer: '05', titel: 'Euer Profil → mein Beleg', kurz: 'Profil' },
	{ id: 'luecken', nummer: '06', titel: 'Was ich nicht kann', kurz: 'Lücken' },
	{ id: 'projekte', nummer: '07', titel: 'Projekte', kurz: 'Projekte' },
	{ id: 'agent', nummer: '08', titel: 'Frag den Agenten', kurz: 'Agent' },
	{ id: 'kontakt', nummer: '09', titel: 'Formales & Kontakt', kurz: 'Kontakt' }
];
