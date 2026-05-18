// Types partagés pour le référentiel métier Agritech.
// Contexte cible : Congo (Brazzaville / Pointe-Noire / Kouilou), élevage tropical.

export type Filiere =
  | "pisciculture-silure"
  | "pisciculture-carpe"
  | "elevage-cabris"
  | "volaille-chair"
  | "volaille-pondeuse"
  | "bsf"
  | "verger-avocatier"
  | "verger-litchi"
  | "aromatique-citronnelle"
  | "aromatique-lippia";

export type Saison = "saison-seche" | "saison-pluies";

export type Severite = "faible" | "moyenne" | "haute" | "critique";

export type VoieAdministration = "oculo-nasale" | "sous-cutanee" | "intra-musculaire" | "orale" | "spray";

export type UniteAge = "jour" | "semaine" | "mois" | "annee";

export type Plage = { min: number; max: number; optimal?: number };

export type AgeRange = { min: number; max: number; unite: UniteAge };

/**
 * Source documentaire (citation libre) pour traçabilité des valeurs.
 * Les sources non-FAO doivent être calibrées avec les prix/pratiques locales.
 */
export type Source = string;

export type Calibre = {
  source: Source;
  /** True = valeur reconnue scientifiquement, False = indicatif/marché variable. */
  fiable: boolean;
  /** Commentaire optionnel sur le contexte ou la limite de validité. */
  note?: string;
};
