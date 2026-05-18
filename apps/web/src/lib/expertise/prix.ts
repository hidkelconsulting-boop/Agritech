// Prix de marché — INDICATIFS, contexte République du Congo (Brazzaville / Pointe-Noire).
// Année de référence : 2026. À CALIBRER avec les prix réels du producteur chaque trimestre.
// Devise : FCFA (XAF). 1 EUR ≈ 656 FCFA (parité fixe).
// Sources : enquêtes informelles marchés locaux, à confirmer.

import type { Calibre } from "./types";

export type LignePrix = {
  produit: string;
  unite: string;
  prixUnitaire_FCFA: number;
  segment: "intrant" | "sortie" | "service";
  calibre: Calibre;
};

// ============================================================
// SORTIES — Prix de vente (ferme ou bord de route)
// ============================================================
export const prixSortie: LignePrix[] = [
  {
    produit: "Silure frais entier",
    unite: "kg",
    prixUnitaire_FCFA: 2500,
    segment: "sortie",
    calibre: { source: "Marchés Pointe-Noire 2025", fiable: false, note: "Variable selon taille (~800g optimum)" },
  },
  {
    produit: "Carpe fraîche entière",
    unite: "kg",
    prixUnitaire_FCFA: 1800,
    segment: "sortie",
    calibre: { source: "Marchés Pointe-Noire 2025", fiable: false },
  },
  {
    produit: "Poulet vif chair (2 kg)",
    unite: "unité",
    prixUnitaire_FCFA: 5500,
    segment: "sortie",
    calibre: { source: "Marchés Brazzaville 2025", fiable: false, note: "Poulet fermier local, abattage à 42-50 j" },
  },
  {
    produit: "Œufs frais",
    unite: "unité",
    prixUnitaire_FCFA: 250,
    segment: "sortie",
    calibre: { source: "Marchés Brazzaville 2025", fiable: false, note: "Calibre M, vendus à la pièce" },
  },
  {
    produit: "Cabri vif sevré (15 kg)",
    unite: "unité",
    prixUnitaire_FCFA: 65000,
    segment: "sortie",
    calibre: { source: "Marchés Pointe-Noire 2025", fiable: false, note: "Cours fête religieuse +30%" },
  },
  {
    produit: "Cabri adulte (25-30 kg)",
    unite: "unité",
    prixUnitaire_FCFA: 110000,
    segment: "sortie",
    calibre: { source: "Marchés Pointe-Noire 2025", fiable: false },
  },
  {
    produit: "Avocat frais",
    unite: "kg",
    prixUnitaire_FCFA: 800,
    segment: "sortie",
    calibre: { source: "Marchés Brazzaville 2025", fiable: false, note: "Hors saison +50%" },
  },
  {
    produit: "Litchi frais",
    unite: "kg",
    prixUnitaire_FCFA: 2500,
    segment: "sortie",
    calibre: { source: "Marchés Brazzaville 2025", fiable: false, note: "Saison décembre-janvier" },
  },
  {
    produit: "Larves BSF séchées",
    unite: "kg",
    prixUnitaire_FCFA: 3500,
    segment: "sortie",
    calibre: { source: "Filière émergente", fiable: false, note: "Marché B2B (élevages), prix volatil" },
  },
  {
    produit: "Huile essentielle citronnelle",
    unite: "litre",
    prixUnitaire_FCFA: 35000,
    segment: "sortie",
    calibre: { source: "Filière artisanale", fiable: false, note: "Prix export brut, marges transformation séparées" },
  },
];

// ============================================================
// INTRANTS — Prix d'achat
// ============================================================
export const prixIntrant: LignePrix[] = [
  {
    produit: "Aliment poulet chair démarrage",
    unite: "kg",
    prixUnitaire_FCFA: 600,
    segment: "intrant",
    calibre: { source: "Provendiers Brazzaville 2025", fiable: false },
  },
  {
    produit: "Aliment poulet chair finition",
    unite: "kg",
    prixUnitaire_FCFA: 500,
    segment: "intrant",
    calibre: { source: "Provendiers Brazzaville 2025", fiable: false },
  },
  {
    produit: "Aliment pondeuse",
    unite: "kg",
    prixUnitaire_FCFA: 480,
    segment: "intrant",
    calibre: { source: "Provendiers Brazzaville 2025", fiable: false },
  },
  {
    produit: "Aliment cabri croissance",
    unite: "kg",
    prixUnitaire_FCFA: 450,
    segment: "intrant",
    calibre: { source: "Provendiers Pointe-Noire 2025", fiable: false },
  },
  {
    produit: "Aliment poisson granulé flottant 32%",
    unite: "kg",
    prixUnitaire_FCFA: 850,
    segment: "intrant",
    calibre: { source: "Importateurs aliments aqua 2025", fiable: false, note: "Souvent importé Cameroun ou Europe" },
  },
  {
    produit: "Poussin chair J1",
    unite: "unité",
    prixUnitaire_FCFA: 1200,
    segment: "intrant",
    calibre: { source: "Couvoirs Brazzaville 2025", fiable: false },
  },
  {
    produit: "Poulette pondeuse 18 sem",
    unite: "unité",
    prixUnitaire_FCFA: 4500,
    segment: "intrant",
    calibre: { source: "Élevages spécialisés 2025", fiable: false },
  },
  {
    produit: "Alevin de silure (5 g)",
    unite: "unité",
    prixUnitaire_FCFA: 250,
    segment: "intrant",
    calibre: { source: "Écloseries locales 2025", fiable: false },
  },
  {
    produit: "Vaccin Newcastle (100 doses)",
    unite: "flacon",
    prixUnitaire_FCFA: 3500,
    segment: "intrant",
    calibre: { source: "Pharmacies vétérinaires", fiable: false },
  },
  {
    produit: "Vaccin PPR (50 doses)",
    unite: "flacon",
    prixUnitaire_FCFA: 5000,
    segment: "intrant",
    calibre: { source: "Pharmacies vétérinaires", fiable: false },
  },
];

// ============================================================
// SERVICES
// ============================================================
export const prixService: LignePrix[] = [
  {
    produit: "Consultation vétérinaire",
    unite: "visite",
    prixUnitaire_FCFA: 15000,
    segment: "service",
    calibre: { source: "Vétérinaires privés Pointe-Noire", fiable: false, note: "Hors déplacement" },
  },
  {
    produit: "Main d'œuvre journalier agricole",
    unite: "jour",
    prixUnitaire_FCFA: 3500,
    segment: "service",
    calibre: { source: "SMIG Congo agricole 2025", fiable: false, note: "Hors charges" },
  },
];

/** Tous les prix en un seul tableau. */
export const tousLesPrix: LignePrix[] = [...prixSortie, ...prixIntrant, ...prixService];

/** Recherche un prix par libellé approximatif. Insensible à la casse. */
export function trouverPrix(libelle: string): LignePrix | undefined {
  const q = libelle.toLowerCase();
  return tousLesPrix.find((p) => p.produit.toLowerCase().includes(q));
}
