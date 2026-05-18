// Seuils techniques : qualité d'eau, ambiance, mortalité acceptable.
// Au-delà de ces plages : alerte. Sources : FAO, manuels OIE, guides souches commerciales.

import type { Calibre, Filiere, Plage } from "./types";

// ============================================================
// QUALITÉ D'EAU — PISCICULTURE
// ============================================================
export type ParametresEau = {
  ph: Plage;
  temperature_c: Plage;
  oxygeneDissous_mgL: Plage;
  ammoniac_NH3_mgL: Plage;
  nitrites_NO2_mgL: Plage;
  densiteMax_kg_m3: number;
  calibre: Calibre;
};

export const seuilsEau: Partial<Record<Filiere, ParametresEau>> = {
  "pisciculture-silure": {
    ph: { min: 6.5, max: 8.5, optimal: 7.2 },
    temperature_c: { min: 22, max: 32, optimal: 27 },
    oxygeneDissous_mgL: { min: 3.0, optimal: 5.0, max: 12 },
    ammoniac_NH3_mgL: { min: 0, max: 0.05 },
    nitrites_NO2_mgL: { min: 0, max: 0.2 },
    densiteMax_kg_m3: 80,
    calibre: { source: "FAO Aquaculture Series — Clarias gariepinus", fiable: true, note: "Tolérance Clarias supérieure à autres téléostéens" },
  },
  "pisciculture-carpe": {
    ph: { min: 6.5, max: 8.5, optimal: 7.5 },
    temperature_c: { min: 18, max: 30, optimal: 25 },
    oxygeneDissous_mgL: { min: 4.0, optimal: 6.0, max: 12 },
    ammoniac_NH3_mgL: { min: 0, max: 0.025 },
    nitrites_NO2_mgL: { min: 0, max: 0.1 },
    densiteMax_kg_m3: 50,
    calibre: { source: "FAO Aquaculture Series — Cyprinus carpio", fiable: true },
  },
};

// ============================================================
// AMBIANCE — VOLAILLE
// ============================================================
export type ParametresAmbiance = {
  temperature_c: Plage;
  humiditeRelative_pct: Plage;
  /** Densité maximale recommandée (oiseaux/m²). */
  densiteMax_oiseaux_m2: number;
  /** Renouvellement d'air minimum (m³/h/kg de poids vif). */
  ventilation_m3_h_kgPV: number;
  calibre: Calibre;
};

export const seuilsAmbianceVolaille: Record<string, ParametresAmbiance> = {
  "poulet-chair-demarrage": {
    temperature_c: { min: 30, max: 34, optimal: 32 },
    humiditeRelative_pct: { min: 55, max: 70, optimal: 60 },
    densiteMax_oiseaux_m2: 20,
    ventilation_m3_h_kgPV: 1.0,
    calibre: { source: "Cobb 500 Management Guide 2022", fiable: true, note: "Première semaine, descendre 2-3°C/sem ensuite" },
  },
  "poulet-chair-croissance": {
    temperature_c: { min: 20, max: 26, optimal: 24 },
    humiditeRelative_pct: { min: 50, max: 65, optimal: 60 },
    densiteMax_oiseaux_m2: 12,
    ventilation_m3_h_kgPV: 4.0,
    calibre: { source: "Cobb 500 Management Guide 2022", fiable: true },
  },
  "pondeuse": {
    temperature_c: { min: 18, max: 26, optimal: 22 },
    humiditeRelative_pct: { min: 50, max: 70, optimal: 60 },
    densiteMax_oiseaux_m2: 7,
    ventilation_m3_h_kgPV: 4.5,
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true, note: "Pic de ponte : -10% si T°>28°C" },
  },
};

// ============================================================
// BSF — Bacs de fermentation
// ============================================================
export type ParametresBsf = {
  temperature_c: Plage;
  humiditeSubstrat_pct: Plage;
  ph: Plage;
  /** Profondeur de substrat conseillée (cm). */
  profondeur_cm: Plage;
  calibre: Calibre;
};

export const seuilsBsf: ParametresBsf = {
  temperature_c: { min: 25, max: 32, optimal: 28 },
  humiditeSubstrat_pct: { min: 60, max: 80, optimal: 70 },
  ph: { min: 6.0, max: 9.0, optimal: 7.5 },
  profondeur_cm: { min: 5, max: 15, optimal: 10 },
  calibre: { source: "CIRAD Hermetia illucens — Production tropicale 2019", fiable: true, note: "Au-delà 35°C : mortalité larvaire" },
};

// ============================================================
// MORTALITÉ ACCEPTABLE (% sur le cycle entier)
// ============================================================
export const mortaliteAcceptable: Partial<Record<Filiere, { max_pct: number; calibre: Calibre }>> = {
  "elevage-cabris": {
    max_pct: 8,
    calibre: { source: "FAO Goat Production Handbook 2017", fiable: true, note: "Toutes causes confondues, troupeau adulte/an" },
  },
  "volaille-chair": {
    max_pct: 4,
    calibre: { source: "Cobb 500 Performance Guide 2022", fiable: true, note: "Cycle 42 jours" },
  },
  "volaille-pondeuse": {
    max_pct: 6,
    calibre: { source: "Isa Brown Management Guide 2021", fiable: true, note: "Cycle de ponte de 80 sem." },
  },
  "pisciculture-silure": {
    max_pct: 15,
    calibre: { source: "FAO Aquaculture Series — Clarias", fiable: true, note: "Élevage extensif tropical" },
  },
  "pisciculture-carpe": {
    max_pct: 10,
    calibre: { source: "FAO Aquaculture Series — Cyprinus", fiable: true },
  },
  "bsf": {
    max_pct: 5,
    calibre: { source: "CIRAD BSF tropical 2019", fiable: true, note: "Phase larvaire" },
  },
};

/**
 * Vérifie si une valeur mesurée respecte une plage. Retourne le niveau d'alerte.
 */
export function evaluerMesure(valeur: number, plage: Plage): "ok" | "limite" | "hors-plage" {
  if (valeur < plage.min || valeur > plage.max) return "hors-plage";
  if (plage.optimal !== undefined) {
    const tolerance = (plage.max - plage.min) * 0.1;
    if (Math.abs(valeur - plage.optimal) > tolerance) return "limite";
  }
  return "ok";
}
