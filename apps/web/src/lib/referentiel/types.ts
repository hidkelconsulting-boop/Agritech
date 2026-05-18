// Modèle de données du référentiel métier validé.
// Principe : l'IA / le référentiel propose, le propriétaire valide, la propagation par rôle s'effectue ensuite.

import type { Filiere } from "@/lib/expertise/types";

export type FiliereOuTransversal = Filiere | "transversal";

export type StatutFiche =
  | "suggestion_ia"
  | "a_valider"
  | "valide"
  | "rejete"
  | "archive";

export type TypeFiche =
  | "ration"
  | "recette-alimentaire"
  | "protocole-sanitaire"
  | "fertilisation"
  | "recyclage"
  | "synergie-filieres"
  | "calendrier"
  | "seuil-technique"
  | "tache-guidee"
  | "alerte";

export type Ingredient = {
  libelle: string;
  quantite: string;
  unite: string;
  commentaire?: string;
};

export type FicheReferentielle = {
  // --- Identification ---
  id: string;
  filiere: FiliereOuTransversal;
  type: TypeFiche;
  titre: string;
  description: string;

  // --- Formulation proposée ---
  formulationIA: string;
  ingredients?: Ingredient[];
  quantitesDetaillees?: string;
  conditionsUtilisation: string[];
  risquesEtPrecautions: string[];

  // --- Transparence IA ---
  hypothesesIA: string[];
  informationsManquantes: string[];

  // --- Source ---
  source: string;

  // --- Workflow de validation ---
  statut: StatutFiche;
  validePar?: string;
  dateValidation?: string;
  justificationValidation?: string;
  commentaireExpert?: string;
  raisonRejet?: string;
  testSurPetiteZone?: boolean;

  // --- Visibilité par rôle ---
  visibleOuvrier: boolean;
  visibleResponsable: boolean;
  visibleProprietaire: boolean;

  // --- Métadonnées ---
  dateProposition: string;
};

export const TYPE_LABELS: Record<TypeFiche, string> = {
  ration: "Ration alimentaire",
  "recette-alimentaire": "Recette d'aliment",
  "protocole-sanitaire": "Protocole sanitaire",
  fertilisation: "Fertilisation",
  recyclage: "Recyclage / valorisation",
  "synergie-filieres": "Synergie entre filières",
  calendrier: "Calendrier",
  "seuil-technique": "Seuil technique",
  "tache-guidee": "Tâche guidée",
  alerte: "Alerte",
};

export const STATUT_LABELS: Record<StatutFiche, string> = {
  suggestion_ia: "Suggestion IA",
  a_valider: "À valider",
  valide: "Validé",
  rejete: "Rejeté",
  archive: "Archivé",
};

export const STATUT_COULEURS: Record<
  StatutFiche,
  { bg: string; fg: string; border: string }
> = {
  suggestion_ia: { bg: "#ede9fe", fg: "#6d28d9", border: "#c4b5fd" },
  a_valider: { bg: "#fef3c7", fg: "#b45309", border: "#fde68a" },
  valide: { bg: "#dcfce7", fg: "#15803d", border: "#86efac" },
  rejete: { bg: "#fee2e2", fg: "#b91c1c", border: "#fca5a5" },
  archive: { bg: "#f1f5f9", fg: "#475569", border: "#cbd5e1" },
};

export const FILIERE_LABELS: Record<FiliereOuTransversal, string> = {
  "pisciculture-silure": "Pisciculture (silures)",
  "pisciculture-carpe": "Pisciculture (carpes)",
  "elevage-cabris": "Élevage cabris",
  "volaille-chair": "Volaille (chair)",
  "volaille-pondeuse": "Volaille (pondeuses)",
  bsf: "Insectes / BSF",
  "verger-avocatier": "Verger (avocatiers)",
  "verger-litchi": "Verger (litchis)",
  "aromatique-citronnelle": "Aromatiques (citronnelle)",
  "aromatique-lippia": "Aromatiques (lippia)",
  transversal: "Transversal / multi-filière",
};
