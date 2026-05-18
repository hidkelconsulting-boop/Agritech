export type RoleProfil = "ouvrier" | "responsable" | "proprietaire";

export type Profil = {
  prenom: string;
  role: RoleProfil;
  equipe?: string;
  exploitation?: string;
  createdAt: string;
};

const STORAGE_KEY = "agritech_profile";

export function readProfil(): Profil | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Profil;
    if (!parsed.prenom || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeProfil(profil: Profil): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profil));
}

export function clearProfil(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function homeForRole(role: RoleProfil): string {
  switch (role) {
    case "ouvrier":
      return "/mobile";
    case "responsable":
      return "/responsable";
    case "proprietaire":
      return "/exploitant";
  }
}

export function labelRole(role: RoleProfil): string {
  switch (role) {
    case "ouvrier":
      return "Ouvrier de terrain";
    case "responsable":
      return "Responsable d'exploitation";
    case "proprietaire":
      return "Propriétaire";
  }
}
