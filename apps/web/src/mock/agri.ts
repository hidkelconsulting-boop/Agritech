export type InterventionStatus = "A planifier" | "Planifiee" | "En cours" | "A valider" | "Terminee" | "En retard";
export type IncidentStatus = "Ouvert" | "En investigation" | "Assigne" | "Traite" | "Cloture";
export type RiskLevel = "Moyen" | "Eleve" | "Critique";

export const dashboardKpis = [
  { label: "Fermes actives", value: "12", subtext: "3 sous surveillance" },
  { label: "Parcelles suivies", value: "148", subtext: "24 necessitent une attention" },
  { label: "Interventions aujourd'hui", value: "37", subtext: "11 en cours" },
  { label: "Alertes critiques", value: "6", subtext: "2 nouvelles ce matin" },
  { label: "Taux de cloture", value: "91%", subtext: "sur les 7 derniers jours" },
  { label: "Preuves photo recues", value: "284", subtext: "18 en attente de validation" },
];

export const interventionsToday = [
  { intervention: "Irrigation de routine", farm: "Ferme Nord", parcel: "B12", team: "Equipe Irrigation 1", hour: "08:30", status: "En cours" as InterventionStatus },
  { intervention: "Inspection phytosanitaire", farm: "Kintele", parcel: "A03", team: "Superviseur Est", hour: "10:00", status: "A planifier" as InterventionStatus },
  { intervention: "Recolte mais", farm: "Zone Ouest", parcel: "D04", team: "Equipe Recolte 2", hour: "07:15", status: "Terminee" as InterventionStatus },
  { intervention: "Maintenance pompe", farm: "Station Sud", parcel: "Z01", team: "Equipe Technique", hour: "07:00", status: "En retard" as InterventionStatus },
  { intervention: "Fertilisation ciblee", farm: "Mbankana", parcel: "C08", team: "Equipe Sol 1", hour: "11:30", status: "Planifiee" as InterventionStatus },
];

export const priorityAlerts = [
  { title: "Suspicion maladie foliaire", farm: "Kintele", zone: "Parcelle A03", level: "Critique" as RiskLevel },
  { title: "Niveau d'eau insuffisant", farm: "Ferme Nord", zone: "B12", level: "Eleve" as RiskLevel },
  { title: "Pompe hors service", farm: "Station Sud", zone: "Z01", level: "Critique" as RiskLevel },
  { title: "Retard de fertilisation", farm: "Mbankana", zone: "C08", level: "Moyen" as RiskLevel },
  { title: "2 taches sans preuve photo", farm: "Zone Ouest", zone: "Multi-parcelles", level: "Moyen" as RiskLevel },
];

export const farms = [
  { id: "nord", name: "Ferme Nord", surface: "86 ha", parcels: 24, teams: 5, dayInterventions: 9, incidents: 2, status: "Sous surveillance", crops: "Mais, legumineuses", manager: "Alain N.", lastReport: "il y a 18 min" },
  { id: "kintele", name: "Kintele", surface: "120 ha", parcels: 31, teams: 6, dayInterventions: 12, incidents: 3, status: "Alerte elevee", crops: "Manioc, mais, maraichage", manager: "Helene M.", lastReport: "il y a 11 min" },
  { id: "mbankana", name: "Mbankana", surface: "64 ha", parcels: 18, teams: 4, dayInterventions: 7, incidents: 1, status: "Activite normale", crops: "Canne a sucre, mais", manager: "Jean P.", lastReport: "il y a 9 min" },
  { id: "ouest", name: "Zone Ouest", surface: "95 ha", parcels: 27, teams: 5, dayInterventions: 9, incidents: 0, status: "Stable", crops: "Mais, tomate", manager: "Nadia K.", lastReport: "il y a 6 min" },
];

export const actionParcels = [
  { parcel: "B12", farm: "Ferme Nord", crop: "Mais", lastVisit: "Aujourd'hui 07:55", risk: "Moyen" as RiskLevel, action: "Verifier irrigation" },
  { parcel: "A03", farm: "Kintele", crop: "Manioc", lastVisit: "Hier 16:10", risk: "Eleve" as RiskLevel, action: "Inspection sanitaire" },
  { parcel: "D07", farm: "Zone Sud", crop: "Tomate", lastVisit: "Aujourd'hui 08:05", risk: "Critique" as RiskLevel, action: "Intervention urgente" },
  { parcel: "C08", farm: "Mbankana", crop: "Canne a sucre", lastVisit: "Hier 15:40", risk: "Moyen" as RiskLevel, action: "Rattraper fertilisation" },
];

export const teams = [
  { id: "irr1", name: "Equipe Irrigation 1", lead: "M. Nguema", assigned: 8, done: 6, rate: "75%", lastCheckin: "08:42", members: 6, farmsCovered: 2, late: 1 },
  { id: "rec2", name: "Equipe Recolte 2", lead: "Mme Banza", assigned: 5, done: 5, rate: "100%", lastCheckin: "09:03", members: 5, farmsCovered: 1, late: 0 },
  { id: "tech", name: "Equipe Technique", lead: "J. Mbemba", assigned: 4, done: 2, rate: "50%", lastCheckin: "08:17", members: 4, farmsCovered: 2, late: 1 },
];

export const proofs = [
  { id: "p1", title: "Irrigation terminee", farm: "Ferme Nord", parcel: "B12", author: "Equipe Irrigation 1", hour: "08:54", status: "A valider" },
  { id: "p2", title: "Recolte finalisee", farm: "Zone Ouest", parcel: "D04", author: "Equipe Recolte 2", hour: "07:48", status: "Validee" },
  { id: "p3", title: "Suspicion maladie foliaire", farm: "Kintele", parcel: "A03", author: "Superviseur Est", hour: "09:12", status: "Critique" },
  { id: "p4", title: "Pompe hors service", farm: "Station Sud", parcel: "Z01", author: "Equipe Technique", hour: "08:05", status: "A verifier" },
];

export const operationalMetrics = [
  { label: "Temps moyen de resolution", value: "3h20" },
  { label: "Ferme la plus exposee", value: "Kintele" },
  { label: "Equipe la plus reguliere", value: "Recolte 2" },
  { label: "Culture la plus surveillee", value: "Mais" },
];

export const incidents = [
  { id: "i1", incident: "Suspicion maladie foliaire", farm: "Kintele", zone: "A03", category: "Sanitaire", criticality: "Critique", reporter: "Superviseur Est", date: "05/04 09:12", status: "En investigation" as IncidentStatus, assignee: "Responsable phytosanitaire" },
  { id: "i2", incident: "Niveau d'eau insuffisant", farm: "Ferme Nord", zone: "B12", category: "Irrigation", criticality: "Eleve", reporter: "Equipe Eau", date: "05/04 08:10", status: "Ouvert" as IncidentStatus, assignee: "Superviseur Nord" },
  { id: "i3", incident: "Pompe hors service", farm: "Station Sud", zone: "Z01", category: "Materiel", criticality: "Critique", reporter: "Equipe Technique", date: "05/04 08:05", status: "Assigne" as IncidentStatus, assignee: "Maintenance centrale" },
];

export const equipment = [
  ["Pompe station Sud", "Pompe", "Station Sud", "Degrade", "12/03", "12/04", "2", "A surveiller"],
  ["Tracteur 02", "Tracteur", "Ferme Nord", "Operationnel", "28/03", "28/04", "0", "Disponible"],
  ["Capteur humidite A3", "Capteur", "Kintele", "Hors service", "18/03", "05/04", "1", "Critique"],
];

export const stocks = [
  ["Engrais NPK", "Engrais", "420", "200", "kg", "Ferme Nord", "05/04", "Normal"],
  ["Semences mais", "Semences", "85", "100", "sacs", "Mbankana", "04/04", "A surveiller"],
  ["Carburant diesel", "Carburant", "180", "150", "L", "Zone Ouest", "05/04", "Normal"],
  ["Produit phytosanitaire X12", "Phytosanitaire", "12", "20", "bidons", "Kintele", "03/04", "Rupture imminente"],
];

export const timeline = [
  "05/04 - 08:30 - Irrigation de routine",
  "04/04 - 16:10 - Inspection sanitaire",
  "02/04 - 11:45 - Fertilisation ciblee",
  "29/03 - 09:20 - Observation terrain",
];
