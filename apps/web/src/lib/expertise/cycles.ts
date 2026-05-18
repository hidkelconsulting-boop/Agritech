// Cycles de production : durées, jalons clés, performances de référence.
// Permet de projeter la production, calculer les besoins en intrants, anticiper les ventes.

import type { Calibre, Filiere } from "./types";

export type CycleProduction = {
  filiere: Filiere;
  /** Durée totale du cycle, en jours. */
  duree_j: number;
  /** Poids ou taille à la mise en place (par tête). */
  poidsInitial_g?: number;
  /** Poids ou taille commercialisable (par tête). */
  poidsFinal_g: number;
  /** Quantité d'aliment consommée sur le cycle entier (par tête, kg). */
  consommationAlimentTotale_kg: number;
  /** Indice de consommation alimentaire (kg aliment / kg poids vif). */
  indiceConsommation: number;
  /** Production attendue par animal sur le cycle. */
  productionParAnimal: string;
  calibre: Calibre;
};

export const cyclesProduction: CycleProduction[] = [
  {
    filiere: "volaille-chair",
    duree_j: 42,
    poidsInitial_g: 45,
    poidsFinal_g: 2200,
    consommationAlimentTotale_kg: 4.0,
    indiceConsommation: 1.85,
    productionParAnimal: "1 poulet vif 2.2 kg ou 1.6 kg net",
    calibre: { source: "Cobb 500 Performance Guide 2022", fiable: true },
  },
  {
    filiere: "volaille-pondeuse",
    duree_j: 560,
    poidsInitial_g: 45,
    poidsFinal_g: 2000,
    consommationAlimentTotale_kg: 45,
    indiceConsommation: 2.1,
    productionParAnimal: "280-300 œufs sur la carrière",
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true, note: "Cycle de ponte 18 sem → 80 sem" },
  },
  {
    filiere: "pisciculture-silure",
    duree_j: 180,
    poidsInitial_g: 5,
    poidsFinal_g: 800,
    consommationAlimentTotale_kg: 1.2,
    indiceConsommation: 1.5,
    productionParAnimal: "1 silure 800 g (taille marchande)",
    calibre: { source: "FAO Aquaculture Series — Clarias", fiable: true, note: "En système semi-intensif" },
  },
  {
    filiere: "pisciculture-carpe",
    duree_j: 270,
    poidsInitial_g: 30,
    poidsFinal_g: 1200,
    consommationAlimentTotale_kg: 2.4,
    indiceConsommation: 2.0,
    productionParAnimal: "1 carpe 1.2 kg",
    calibre: { source: "FAO Aquaculture Series — Cyprinus", fiable: true },
  },
  {
    filiere: "bsf",
    duree_j: 14,
    poidsInitial_g: 0.001,
    poidsFinal_g: 0.25,
    consommationAlimentTotale_kg: 2.5,
    indiceConsommation: 10,
    productionParAnimal: "0.25 g de larve mature",
    calibre: { source: "CIRAD Hermetia illucens 2019", fiable: true, note: "1 kg larve = 10 kg substrat consommé" },
  },
  {
    filiere: "elevage-cabris",
    duree_j: 270,
    poidsInitial_g: 2000,
    poidsFinal_g: 18000,
    consommationAlimentTotale_kg: 75,
    indiceConsommation: 4.7,
    productionParAnimal: "1 cabri vif 18 kg (commercialisable)",
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true, note: "Race locale, sans engraissement intensif" },
  },
];

/**
 * Estime le chiffre d'affaires brut d'un cycle pour un effectif donné.
 */
export function chiffreAffaireBrut_FCFA(
  cycle: CycleProduction,
  nombreAnimaux: number,
  prixUnitaire_FCFA: number,
): number {
  return cycle.poidsFinal_g * 0.001 * nombreAnimaux * prixUnitaire_FCFA;
}

/**
 * Estime le coût total des intrants alimentaires sur un cycle.
 */
export function coutAlimentationCycle_FCFA(
  cycle: CycleProduction,
  nombreAnimaux: number,
  prixAliment_FCFA_kg: number,
): number {
  return cycle.consommationAlimentTotale_kg * nombreAnimaux * prixAliment_FCFA_kg;
}

/**
 * Marge brute approximative (CA - coût alimentation seulement).
 * NB : exclut main d'œuvre, énergie, vétérinaire, amortissements.
 */
export function margeBruteCycle_FCFA(
  cycle: CycleProduction,
  nombreAnimaux: number,
  prixUnitaire_FCFA: number,
  prixAliment_FCFA_kg: number,
): number {
  return (
    chiffreAffaireBrut_FCFA(cycle, nombreAnimaux, prixUnitaire_FCFA) -
    coutAlimentationCycle_FCFA(cycle, nombreAnimaux, prixAliment_FCFA_kg)
  );
}
