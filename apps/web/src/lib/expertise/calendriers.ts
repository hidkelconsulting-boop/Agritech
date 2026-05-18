// Calendriers : vaccinations, traitements préventifs, cycles de récolte.
// Sources :
// - OIE Manual of Diagnostic Tests for Terrestrial Animals
// - Pratiques recommandées par les services vétérinaires régionaux (Congo, RDC)
// Les doses et voies sont les valeurs standard ; toujours confirmer la notice du flacon.

import type { Calibre, UniteAge, VoieAdministration } from "./types";

export type ActeVaccinal = {
  age: { value: number; unite: UniteAge };
  vaccin: string;
  voie: VoieAdministration;
  /** Dose unitaire par animal (texte libre, ex "0.3 mL", "1 goutte"). */
  dose: string;
  obligatoire: boolean;
  /** Maladies couvertes (séparées par "+"). */
  protege: string;
  calibre: Calibre;
};

// ============================================================
// POULETS DE CHAIR
// ============================================================
export const vaccinationPouletChair: ActeVaccinal[] = [
  {
    age: { value: 1, unite: "jour" },
    vaccin: "Marek (HVT+SB1)",
    voie: "sous-cutanee",
    dose: "0.2 mL",
    obligatoire: true,
    protege: "Maladie de Marek",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true, note: "Idéalement au couvoir" },
  },
  {
    age: { value: 7, unite: "jour" },
    vaccin: "Newcastle + Bronchite Infectieuse (HB1+H120)",
    voie: "oculo-nasale",
    dose: "1 goutte/œil ou narine",
    obligatoire: true,
    protege: "Newcastle + Bronchite",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true },
  },
  {
    age: { value: 14, unite: "jour" },
    vaccin: "Gumboro intermédiaire (D78)",
    voie: "orale",
    dose: "Eau de boisson, 100 doses/100 oiseaux/2L",
    obligatoire: true,
    protege: "Maladie de Gumboro",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true, note: "Eau sans chlore, 2h max" },
  },
  {
    age: { value: 21, unite: "jour" },
    vaccin: "Newcastle (rappel La Sota)",
    voie: "orale",
    dose: "Eau de boisson",
    obligatoire: true,
    protege: "Newcastle",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true },
  },
];

// ============================================================
// POULES PONDEUSES (jusqu'à entrée en ponte)
// ============================================================
export const vaccinationPondeuse: ActeVaccinal[] = [
  ...vaccinationPouletChair.slice(0, 4),
  {
    age: { value: 6, unite: "semaine" },
    vaccin: "Variole aviaire",
    voie: "intra-musculaire",
    dose: "0.2 mL aile",
    obligatoire: true,
    protege: "Variole aviaire",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true },
  },
  {
    age: { value: 10, unite: "semaine" },
    vaccin: "Newcastle inactivé",
    voie: "intra-musculaire",
    dose: "0.5 mL",
    obligatoire: true,
    protege: "Newcastle (rappel longue durée)",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true, note: "Avant entrée en ponte" },
  },
  {
    age: { value: 16, unite: "semaine" },
    vaccin: "Syndrome chute de ponte EDS-76",
    voie: "intra-musculaire",
    dose: "0.5 mL",
    obligatoire: false,
    protege: "EDS-76",
    calibre: { source: "OIE Avian Vaccination Guidelines 2021", fiable: true },
  },
];

// ============================================================
// CABRIS
// ============================================================
export const vaccinationCabris: ActeVaccinal[] = [
  {
    age: { value: 1, unite: "mois" },
    vaccin: "Entérotoxémie (Clostridium)",
    voie: "sous-cutanee",
    dose: "2 mL",
    obligatoire: true,
    protege: "Entérotoxémie",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true, note: "Rappel 1 mois plus tard" },
  },
  {
    age: { value: 2, unite: "mois" },
    vaccin: "Entérotoxémie (rappel)",
    voie: "sous-cutanee",
    dose: "2 mL",
    obligatoire: true,
    protege: "Entérotoxémie",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true },
  },
  {
    age: { value: 3, unite: "mois" },
    vaccin: "Peste des Petits Ruminants (PPR)",
    voie: "sous-cutanee",
    dose: "1 mL",
    obligatoire: true,
    protege: "PPR",
    calibre: { source: "OIE PPR Eradication Programme", fiable: true, note: "Rappel annuel" },
  },
  {
    age: { value: 4, unite: "mois" },
    vaccin: "Pasteurellose",
    voie: "sous-cutanee",
    dose: "2 mL",
    obligatoire: true,
    protege: "Pasteurellose",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true, note: "Rappel 6 mois" },
  },
];

export const deparasitageCabris = [
  { frequence: "Tous les 3 mois", produit: "Albendazole 10%", dose: "1 mL pour 10 kg PV", note: "Strongles digestifs" },
  { frequence: "Tous les 6 mois", produit: "Ivermectine 1%", dose: "0.2 mL pour 10 kg PV (sous-cutané)", note: "Parasites externes + internes" },
];

// ============================================================
// CYCLES DE RÉCOLTE — VERGERS (Congo, climat tropical humide)
// ============================================================
export type CycleRecolte = {
  espece: string;
  /** Mois de pleine récolte (1-12). */
  moisRecolte: number[];
  /** Indication florale précédant la récolte. */
  floraison: string;
  /** Rendement moyen par arbre adulte (kg/an). */
  rendementMoyen_kg_arbre: number;
  calibre: Calibre;
};

export const cyclesVergers: CycleRecolte[] = [
  {
    espece: "Avocatier (Persea americana)",
    moisRecolte: [4, 5, 6, 9, 10],
    floraison: "Septembre à novembre",
    rendementMoyen_kg_arbre: 80,
    calibre: { source: "FAO Tropical Fruit Compendium 2020", fiable: true, note: "Variable selon variété (Hass, Fuerte, locale)" },
  },
  {
    espece: "Litchi (Litchi chinensis)",
    moisRecolte: [11, 12, 1],
    floraison: "Juillet à septembre",
    rendementMoyen_kg_arbre: 50,
    calibre: { source: "FAO Tropical Fruit Compendium 2020", fiable: true, note: "Récolte étalée sur 3-4 semaines" },
  },
  {
    espece: "Manguier (Mangifera indica)",
    moisRecolte: [11, 12, 1, 2],
    floraison: "Août à octobre",
    rendementMoyen_kg_arbre: 100,
    calibre: { source: "FAO Tropical Fruit Compendium 2020", fiable: true },
  },
  {
    espece: "Ananas (Ananas comosus)",
    moisRecolte: [12, 1, 2, 3, 4],
    floraison: "Stimulation acétylène possible",
    rendementMoyen_kg_arbre: 1.5,
    calibre: { source: "FAO Pineapple Production", fiable: true, note: "Par plant, sur 14-18 mois" },
  },
];

// ============================================================
// AROMATIQUES
// ============================================================
export const cyclesAromatiques: CycleRecolte[] = [
  {
    espece: "Citronnelle (Cymbopogon citratus)",
    moisRecolte: [3, 6, 9, 12],
    floraison: "Non commercial — récolte des feuilles",
    rendementMoyen_kg_arbre: 12,
    calibre: { source: "CIRAD Plantes aromatiques tropicales", fiable: true, note: "Coupe tous les 3-4 mois, par souche" },
  },
  {
    espece: "Lippia / Verveine citronnée (Aloysia citrodora)",
    moisRecolte: [4, 7, 10],
    floraison: "Mars-avril (à éviter pour la coupe)",
    rendementMoyen_kg_arbre: 8,
    calibre: { source: "CIRAD Plantes aromatiques tropicales", fiable: true, note: "Récolte feuilles avant floraison" },
  },
];
