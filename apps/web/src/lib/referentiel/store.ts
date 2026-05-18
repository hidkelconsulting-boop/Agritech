// Store côté client pour le référentiel.
// Stratégie V1 : overlay localStorage sur le mock initial.
// Le mock fournit les fiches de base ; les modifications (validation, rejet, justification...)
// sont stockées séparément et appliquées par-dessus à la lecture.
// Pas de DB côté API pour cette session, ce sera l'étape suivante.

import type { FicheReferentielle, StatutFiche, TypeFiche, FiliereOuTransversal } from "./types";
import { fichesReferentiellesInitiales } from "@/mock/referentiel";

const OVERLAY_KEY = "agritech_referentiel_overlay";

/**
 * Overrides partiels persistés en localStorage.
 * Chaque entrée modifie une fiche du mock initial par son id.
 */
type Overlay = Record<string, Partial<FicheReferentielle>>;

function readOverlay(): Overlay {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(OVERLAY_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Overlay;
  } catch {
    return {};
  }
}

function writeOverlay(overlay: Overlay): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OVERLAY_KEY, JSON.stringify(overlay));
}

function notifyChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("agritech:referentiel-change"));
}

/**
 * Retourne toutes les fiches avec l'overlay appliqué.
 */
export function getAllFiches(): FicheReferentielle[] {
  const overlay = readOverlay();
  return fichesReferentiellesInitiales.map((f) => {
    const o = overlay[f.id];
    return o ? ({ ...f, ...o } as FicheReferentielle) : f;
  });
}

export function getFicheById(id: string): FicheReferentielle | undefined {
  return getAllFiches().find((f) => f.id === id);
}

export function fichesParStatut(statut: StatutFiche): FicheReferentielle[] {
  return getAllFiches().filter((f) => f.statut === statut);
}

export function fichesPourPropose(): FicheReferentielle[] {
  return getAllFiches().filter(
    (f) => f.statut === "suggestion_ia" || f.statut === "a_valider",
  );
}

export function fichesValidees(): FicheReferentielle[] {
  return getAllFiches().filter((f) => f.statut === "valide");
}

export function fichesPourRole(
  role: "ouvrier" | "responsable" | "proprietaire",
): FicheReferentielle[] {
  const valides = fichesValidees();
  if (role === "ouvrier") return valides.filter((f) => f.visibleOuvrier);
  if (role === "responsable") return valides.filter((f) => f.visibleResponsable);
  return getAllFiches();
}

export function compterPourPropose(): number {
  return fichesPourPropose().length;
}

// --- Actions ---

export function validerFiche(
  id: string,
  validateur: string,
  justification: string,
  options?: { testSurPetiteZone?: boolean; commentaireExpert?: string; visibleOuvrier?: boolean; visibleResponsable?: boolean },
): void {
  const overlay = readOverlay();
  overlay[id] = {
    ...overlay[id],
    statut: "valide",
    validePar: validateur,
    dateValidation: new Date().toISOString(),
    justificationValidation: justification,
    testSurPetiteZone: options?.testSurPetiteZone ?? false,
    commentaireExpert: options?.commentaireExpert,
    visibleOuvrier: options?.visibleOuvrier ?? true,
    visibleResponsable: options?.visibleResponsable ?? true,
    visibleProprietaire: true,
    raisonRejet: undefined,
  };
  writeOverlay(overlay);
  notifyChange();
}

export function rejeterFiche(id: string, validateur: string, raison: string): void {
  const overlay = readOverlay();
  overlay[id] = {
    ...overlay[id],
    statut: "rejete",
    validePar: validateur,
    dateValidation: new Date().toISOString(),
    raisonRejet: raison,
    justificationValidation: undefined,
    testSurPetiteZone: false,
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  };
  writeOverlay(overlay);
  notifyChange();
}

export function reouvrirFiche(id: string): void {
  // Annule une décision précédente, retour à "a_valider"
  const overlay = readOverlay();
  overlay[id] = {
    ...overlay[id],
    statut: "a_valider",
    validePar: undefined,
    dateValidation: undefined,
    justificationValidation: undefined,
    raisonRejet: undefined,
    commentaireExpert: undefined,
    testSurPetiteZone: false,
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  };
  writeOverlay(overlay);
  notifyChange();
}

export function resetOverlay(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(OVERLAY_KEY);
  notifyChange();
}

// --- Hook React ---

import { useEffect, useState } from "react";

export function useFiches(): FicheReferentielle[] {
  const [fiches, setFiches] = useState<FicheReferentielle[]>(() => getAllFiches());

  useEffect(() => {
    const handler = () => setFiches(getAllFiches());
    window.addEventListener("agritech:referentiel-change", handler);
    window.addEventListener("storage", handler);
    // Force une re-lecture au montage (au cas où localStorage chargé tardivement)
    setFiches(getAllFiches());
    return () => {
      window.removeEventListener("agritech:referentiel-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return fiches;
}

export function useFiche(id: string): FicheReferentielle | undefined {
  const fiches = useFiches();
  return fiches.find((f) => f.id === id);
}

// Re-exports pour usage simplifié
export type { FicheReferentielle, StatutFiche, TypeFiche, FiliereOuTransversal };
