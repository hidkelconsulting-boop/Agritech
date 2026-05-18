// Protocoles de soin et de réaction face aux situations courantes.
// Sources : FAO, OIE, manuels vétérinaires tropicaux.
// Chaque protocole décrit : signes (à reconnaître), actions (à effectuer immédiatement),
// quand-appeler-vétérinaire, sévérité.

import type { Calibre, Severite } from "./types";

export type ProtocoleSante = {
  nom: string;
  espece: "cabris" | "volaille" | "silure" | "carpe" | "bsf";
  signes: string[];
  /** Actions à enchaîner sans attendre. */
  actionsImmediates: string[];
  /** Conditions qui imposent l'appel du vétérinaire. */
  appelerVeterinaireSi: string[];
  /** Combien de temps avant aggravation probable (en heures). */
  fenetreCritique_h: number;
  severite: Severite;
  calibre: Calibre;
};

export const protocolesCabris: ProtocoleSante[] = [
  {
    nom: "Diarrhée du jeune cabri",
    espece: "cabris",
    signes: [
      "Selles liquides ou pâteuses",
      "Anus souillé",
      "Cabri qui boit beaucoup",
      "Œil enfoncé (déshydratation)",
      "Refus de téter",
    ],
    actionsImmediates: [
      "Isoler le cabri dans un coin sec",
      "Préparer SRO maison : 1 L d'eau propre + 6 cuillères à café de sucre + 1 cuillère à café de sel",
      "Donner 100 mL toutes les 2 heures",
      "Couvrir l'animal s'il a froid (oreilles froides = signe d'hypothermie)",
      "Garder l'aliment solide normal s'il mange",
    ],
    appelerVeterinaireSi: [
      "Pas d'amélioration sous 24 h",
      "Sang dans les selles",
      "Plus de 2 cabris atteints dans le même lot",
      "Cabri < 2 semaines",
    ],
    fenetreCritique_h: 24,
    severite: "haute",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true },
  },
  {
    nom: "Boiterie",
    espece: "cabris",
    signes: [
      "Cabri qui boite ou marche sur 3 pattes",
      "Sabot chaud au toucher",
      "Gonflement entre les onglons",
      "Odeur forte du sabot",
    ],
    actionsImmediates: [
      "Examiner le sabot, retirer corps étrangers",
      "Nettoyer à l'eau et au savon",
      "Désinfecter (iode dilué ou chlorhexidine 2%)",
      "Parer le sabot si excès de corne",
      "Garder l'animal sur litière sèche",
    ],
    appelerVeterinaireSi: [
      "Pas d'amélioration sous 48 h",
      "Fièvre (T°>40°C)",
      "Plusieurs animaux concernés (suspicion piétin)",
    ],
    fenetreCritique_h: 48,
    severite: "moyenne",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true },
  },
  {
    nom: "Toux et écoulement nasal",
    espece: "cabris",
    signes: [
      "Toux sèche ou grasse",
      "Jetage nasal clair ou purulent",
      "Respiration rapide ou bruyante",
      "Refus de manger",
    ],
    actionsImmediates: [
      "Isoler l'animal du reste du troupeau",
      "Prendre la température (normale : 38.5 – 39.5°C)",
      "Mettre à l'abri du vent et de la pluie",
      "Eau propre tiède à disposition",
    ],
    appelerVeterinaireSi: [
      "T°>40°C",
      "Pus dans le jetage",
      "Difficulté à respirer (côtés du flanc qui battent)",
      "Plusieurs animaux du même lot",
    ],
    fenetreCritique_h: 24,
    severite: "haute",
    calibre: { source: "FAO Goat Health Manual 2018", fiable: true, note: "Suspicion pasteurellose ou pneumonie" },
  },
];

export const protocolesVolaille: ProtocoleSante[] = [
  {
    nom: "Baisse soudaine de ponte",
    espece: "volaille",
    signes: [
      "Chute > 20% de la production en 3 jours",
      "Œufs à coquille fine ou déformée",
      "Animaux apathiques",
      "Crête pâle ou bleuissante",
    ],
    actionsImmediates: [
      "Vérifier l'eau de boisson (propreté, débit)",
      "Vérifier la température du bâtiment",
      "Vérifier l'éclairage (durée et intensité)",
      "Compter la mortalité du jour précédent",
      "Inspecter visuellement chaque oiseau",
    ],
    appelerVeterinaireSi: [
      "Mortalité > 0.5%/jour",
      "Symptômes respiratoires associés",
      "Pas de cause identifiée sous 48 h",
    ],
    fenetreCritique_h: 48,
    severite: "haute",
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true },
  },
  {
    nom: "Picage et cannibalisme",
    espece: "volaille",
    signes: [
      "Plumes arrachées dans le dos ou autour du cloaque",
      "Sang sur les plumes",
      "Oiseaux qui se réunissent agressivement",
    ],
    actionsImmediates: [
      "Réduire la densité (transférer une partie du lot si possible)",
      "Réduire l'intensité lumineuse",
      "Apporter des distractions (verdure, ballots de paille)",
      "Vérifier la teneur en protéines de l'aliment (manque de méthionine ?)",
      "Isoler les oiseaux blessés",
    ],
    appelerVeterinaireSi: ["Cannibalisme massif > 5% du lot"],
    fenetreCritique_h: 72,
    severite: "moyenne",
    calibre: { source: "Cobb / Isa Management Guides", fiable: true },
  },
];

export const protocolesSilure: ProtocoleSante[] = [
  {
    nom: "Poissons en surface respirant fort",
    espece: "silure",
    signes: [
      "Poissons regroupés en surface",
      "Bouche en l'air, respiration accélérée",
      "Refus de l'aliment",
      "Eau trouble ou colorée anormalement",
    ],
    actionsImmediates: [
      "Arrêter immédiatement la distribution d'aliment",
      "Mesurer l'oxygène dissous (cible > 3 mg/L)",
      "Renouveler 30% de l'eau si possible",
      "Aérer (pompe, agitation, cascade)",
      "Mesurer pH et T° (référence : seuils.ts)",
    ],
    appelerVeterinaireSi: [
      "Mortalité > 5 poissons/h",
      "Symptômes persistants après renouvellement d'eau",
    ],
    fenetreCritique_h: 4,
    severite: "critique",
    calibre: { source: "FAO Aquaculture Series — Clarias", fiable: true },
  },
];

/** Recherche le ou les protocoles pertinents à partir d'un signe observé. */
export function chercherProtocoleParSigne(signe: string): ProtocoleSante[] {
  const q = signe.toLowerCase();
  const tous = [...protocolesCabris, ...protocolesVolaille, ...protocolesSilure];
  return tous.filter((p) => p.signes.some((s) => s.toLowerCase().includes(q)));
}
