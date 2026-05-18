// Rations alimentaires par espèce, âge et phase.
// Quantités exprimées en grammes par tête par jour (g/tête/j).
// Sources principales :
// - FAO Animal Production and Health Manuals (cabris, volailles)
// - FAO Aquaculture Development & Management Series (silures, carpes)
// - Programme BSF Hermetia illucens (CIRAD 2019, contexte tropical)
// À CALIBRER avec les pratiques réelles de la ferme et la qualité des aliments locaux.

import type { AgeRange, Calibre, Filiere } from "./types";

export type LigneRation = {
  filiere: Filiere;
  phase: string;
  age: AgeRange;
  quantiteParTete_g_j: number;
  aliment: string;
  /** Matière azotée totale visée (% MS) pour les aliments composés. */
  matiereAzoteeTotale_pct?: number;
  /** Fréquence quotidienne recommandée. */
  repartition: string;
  calibre: Calibre;
};

// ============================================================
// CABRIS (caprin local africain, race de petit gabarit ~25-30 kg adulte)
// ============================================================
export const rationsCabris: LigneRation[] = [
  {
    filiere: "elevage-cabris",
    phase: "lacto-allaitement",
    age: { min: 0, max: 4, unite: "semaine" },
    quantiteParTete_g_j: 0,
    aliment: "Lait maternel exclusif",
    repartition: "À volonté sur la mère",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true, note: "Pas de complément avant 4 sem." },
  },
  {
    filiere: "elevage-cabris",
    phase: "sevrage",
    age: { min: 1, max: 4, unite: "mois" },
    quantiteParTete_g_j: 300,
    aliment: "Concentré démarrage 16% MAT + foin de bonne qualité à volonté",
    matiereAzoteeTotale_pct: 16,
    repartition: "2 repas/jour + accès foin permanent",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true },
  },
  {
    filiere: "elevage-cabris",
    phase: "croissance",
    age: { min: 4, max: 12, unite: "mois" },
    quantiteParTete_g_j: 500,
    aliment: "Concentré croissance 14% MAT + fourrage vert (Panicum, Brachiaria)",
    matiereAzoteeTotale_pct: 14,
    repartition: "Matin et fin d'après-midi",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true },
  },
  {
    filiere: "elevage-cabris",
    phase: "engraissement-entretien",
    age: { min: 12, max: 999, unite: "mois" },
    quantiteParTete_g_j: 150,
    aliment: "Concentré 12% MAT + fourrage à volonté",
    matiereAzoteeTotale_pct: 12,
    repartition: "1 repas + pâture",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true, note: "Adulte 25-30 kg" },
  },
  {
    filiere: "elevage-cabris",
    phase: "gestation-fin",
    age: { min: 12, max: 999, unite: "mois" },
    quantiteParTete_g_j: 350,
    aliment: "Concentré gestation 15% MAT + fourrage",
    matiereAzoteeTotale_pct: 15,
    repartition: "2 repas, derniers 45 j de gestation",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true },
  },
  {
    filiere: "elevage-cabris",
    phase: "lactation",
    age: { min: 12, max: 999, unite: "mois" },
    quantiteParTete_g_j: 600,
    aliment: "Concentré lactation 16% MAT + fourrage à volonté + eau abondante",
    matiereAzoteeTotale_pct: 16,
    repartition: "2-3 repas/jour, eau propre permanente",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true },
  },
];

// ============================================================
// POULETS DE CHAIR (souche Cobb 500 ou équivalent, 0 à 42 jours)
// ============================================================
export const rationsPouletChair: LigneRation[] = [
  {
    filiere: "volaille-chair",
    phase: "demarrage",
    age: { min: 0, max: 10, unite: "jour" },
    quantiteParTete_g_j: 25,
    aliment: "Pré-démarrage 22% MAT, miettes",
    matiereAzoteeTotale_pct: 22,
    repartition: "Ad libitum, mangeoires propres",
    calibre: { source: "Cobb 500 Performance Guide 2022", fiable: true },
  },
  {
    filiere: "volaille-chair",
    phase: "croissance",
    age: { min: 11, max: 24, unite: "jour" },
    quantiteParTete_g_j: 75,
    aliment: "Démarrage 20% MAT, granulés",
    matiereAzoteeTotale_pct: 20,
    repartition: "Ad libitum",
    calibre: { source: "Cobb 500 Performance Guide 2022", fiable: true },
  },
  {
    filiere: "volaille-chair",
    phase: "finition",
    age: { min: 25, max: 42, unite: "jour" },
    quantiteParTete_g_j: 145,
    aliment: "Finition 18% MAT, granulés",
    matiereAzoteeTotale_pct: 18,
    repartition: "Ad libitum",
    calibre: { source: "Cobb 500 Performance Guide 2022", fiable: true, note: "Vide alimentaire 8h avant abattage" },
  },
];

// ============================================================
// POULES PONDEUSES (souche Isa Brown ou équivalent)
// ============================================================
export const rationsPondeuse: LigneRation[] = [
  {
    filiere: "volaille-pondeuse",
    phase: "poussinniere",
    age: { min: 0, max: 6, unite: "semaine" },
    quantiteParTete_g_j: 35,
    aliment: "Démarrage poulette 20% MAT",
    matiereAzoteeTotale_pct: 20,
    repartition: "Ad libitum",
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true },
  },
  {
    filiere: "volaille-pondeuse",
    phase: "poulette",
    age: { min: 7, max: 17, unite: "semaine" },
    quantiteParTete_g_j: 70,
    aliment: "Croissance poulette 16% MAT",
    matiereAzoteeTotale_pct: 16,
    repartition: "2 repas + pâture si parcours",
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true },
  },
  {
    filiere: "volaille-pondeuse",
    phase: "ponte",
    age: { min: 18, max: 80, unite: "semaine" },
    quantiteParTete_g_j: 115,
    aliment: "Pondeuse 17% MAT + calcium 3.8%",
    matiereAzoteeTotale_pct: 17,
    repartition: "2 repas, eau abondante, lumière 16h/j",
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true, note: "Objectif 280-300 œufs/an" },
  },
];

// ============================================================
// SILURES (Clarias gariepinus, élevage en étang ou bassin)
// ============================================================
export const rationsSilure: LigneRation[] = [
  {
    filiere: "pisciculture-silure",
    phase: "alevinage",
    age: { min: 0, max: 30, unite: "jour" },
    quantiteParTete_g_j: 0.1,
    aliment: "Aliment poudre 45% MAT, granulométrie 0.3-0.5 mm",
    matiereAzoteeTotale_pct: 45,
    repartition: "4-6 distributions/jour à la volée",
    calibre: { source: "FAO Aquaculture Development Series — Clarias", fiable: true },
  },
  {
    filiere: "pisciculture-silure",
    phase: "pre-grossissement",
    age: { min: 1, max: 3, unite: "mois" },
    quantiteParTete_g_j: 4,
    aliment: "Granulé flottant 40% MAT, 2-3 mm",
    matiereAzoteeTotale_pct: 40,
    repartition: "3 distributions/jour",
    calibre: { source: "FAO Aquaculture Development Series — Clarias", fiable: true },
  },
  {
    filiere: "pisciculture-silure",
    phase: "grossissement",
    age: { min: 3, max: 6, unite: "mois" },
    quantiteParTete_g_j: 18,
    aliment: "Granulé flottant 32% MAT, 4-6 mm",
    matiereAzoteeTotale_pct: 32,
    repartition: "2-3 distributions/jour selon T° de l'eau",
    calibre: { source: "FAO Aquaculture Development Series — Clarias", fiable: true, note: "Réduire de 30% si T°<24°C" },
  },
];

// ============================================================
// BSF — Larves de mouches soldates (Hermetia illucens)
// ============================================================
export const rationsBsf: LigneRation[] = [
  {
    filiere: "bsf",
    phase: "larvaire-petites",
    age: { min: 0, max: 5, unite: "jour" },
    quantiteParTete_g_j: 0.05,
    aliment: "Substrat humide 70-80% humidité (drèche, déchets fruits)",
    repartition: "Distribution unique chargée, suivi humidité",
    calibre: { source: "CIRAD Hermetia illucens — Production tropicale 2019", fiable: true },
  },
  {
    filiere: "bsf",
    phase: "larvaire-fin",
    age: { min: 6, max: 14, unite: "jour" },
    quantiteParTete_g_j: 0.35,
    aliment: "Substrat protéiné (drèche + co-produits laitiers ou pisciculture)",
    repartition: "Apport tous les 2-3 jours selon consommation",
    calibre: { source: "CIRAD Hermetia illucens — Production tropicale 2019", fiable: true, note: "Conversion ~10:1 (substrat:larves)" },
  },
];

/** Tous les barèmes en un seul tableau, pour itération. */
export const toutesLesRations: LigneRation[] = [
  ...rationsCabris,
  ...rationsPouletChair,
  ...rationsPondeuse,
  ...rationsSilure,
  ...rationsBsf,
];

/**
 * Calcule la quantité totale d'aliment à préparer pour un effectif et une phase donnés.
 * @returns quantité en kg, arrondi à 100 g près.
 */
export function quantiteAlimentTotale_kg(
  ligneRation: LigneRation,
  nombreTetes: number,
): number {
  const grammes = ligneRation.quantiteParTete_g_j * nombreTetes;
  return Math.round(grammes / 100) / 10;
}
