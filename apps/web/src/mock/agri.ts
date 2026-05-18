export type InterventionStatus = "A planifier" | "Planifiee" | "En cours" | "A valider" | "Terminee" | "En retard";
export type IncidentStatus = "Ouvert" | "En investigation" | "Assigne" | "Traite" | "Cloture";
export type RiskLevel = "Moyen" | "Eleve" | "Critique";
export type Criticite = "faible" | "moyenne" | "haute";

export type ProtocoleTache = {
  pourquoi: string;
  etapes: string[];
  signes: string[];
  preuveRequise: boolean;
  criticite: Criticite;
};

export const dashboardKpis = [
  { label: "Fermes actives", value: "2", subtext: "Nanga + Makola" },
  { label: "Parcelles suivies", value: "18", subtext: "8 necessitent une attention" },
  { label: "Interventions aujourd'hui", value: "22", subtext: "6 en cours" },
  { label: "Alertes critiques", value: "3", subtext: "1 nouvelle ce matin" },
  { label: "Taux de cloture", value: "87%", subtext: "sur les 7 derniers jours" },
  { label: "Preuves photo recues", value: "156", subtext: "12 en attente de validation" },
];

export const interventionsToday = [
  {
    intervention: "Nourrir cabris matin Nanga", farm: "Ferme Nanga-Makola", parcel: "Batiment cabris Nanga", team: "Equipe Elevage Nanga", hour: "06:30", status: "Terminee" as InterventionStatus, site: "Nanga", categorie: "elevage", icone: "🐐",
    protocoleRefId: "fic-013",
    protocole: {
      pourquoi: "Bien nourrir les cabris le matin leur donne de la force pour toute la journée.",
      etapes: [
        "Vérifier que la mangeoire est propre",
        "Mettre la quantité d'aliment prévue",
        "Vérifier l'eau propre dans l'abreuvoir",
        "Regarder si tous les cabris mangent",
        "Prendre une photo de la mangeoire pleine",
      ],
      signes: [
        "Cabri qui reste seul dans un coin",
        "Cabri qui boite ou tremble",
        "Cabri qui refuse de manger",
        "Yeux ou nez qui coulent",
      ],
      preuveRequise: true,
      criticite: "moyenne",
    } satisfies ProtocoleTache,
  },
  {
    intervention: "Verifier pH etang silures", farm: "Ferme Nanga-Makola", parcel: "Etang silures Nanga", team: "Equipe Aquaculture Nanga", hour: "07:00", status: "En cours" as InterventionStatus, site: "Nanga", categorie: "aquaculture", icone: "🐟",
    protocoleRefId: "fic-031",
    protocole: {
      pourquoi: "Le pH aide à savoir si l'eau est bonne pour les poissons.",
      etapes: [
        "Prendre le test pH",
        "Mettre la bandelette dans l'eau",
        "Attendre que la couleur change",
        "Comparer avec le tableau de couleurs",
        "Prendre une photo de la bandelette",
      ],
      signes: [
        "Eau très trouble",
        "Poissons en surface qui respirent fort",
        "Mauvaise odeur d'eau",
        "Poissons qui ne mangent pas",
      ],
      preuveRequise: true,
      criticite: "haute",
    } satisfies ProtocoleTache,
  },
  { intervention: "Recolter litchis Makola sud", farm: "Ferme Nanga-Makola", parcel: "Verger litchis Makola", team: "Equipe Recolte Makola", hour: "07:30", status: "En retard" as InterventionStatus, site: "Makola", categorie: "verger", icone: "🍈" },
  { intervention: "Distiller lot citronnelle 12", farm: "Ferme Nanga-Makola", parcel: "Atelier distillation Makola", team: "Equipe Distillation Makola", hour: "08:00", status: "A valider" as InterventionStatus, site: "Makola", categorie: "distillation", icone: "🧪" },
  {
    intervention: "Vacciner poulets Nanga", farm: "Ferme Nanga-Makola", parcel: "Poulailler chair Nanga", team: "Equipe Volailles Nanga", hour: "08:30", status: "Planifiee" as InterventionStatus, site: "Nanga", categorie: "volaille", icone: "🐔",
    protocoleRefId: "fic-042",
    protocole: {
      pourquoi: "La vaccination protège tout le poulailler des maladies.",
      etapes: [
        "Préparer le vaccin selon la notice",
        "Attraper chaque poulet doucement",
        "Vacciner derrière l'aile",
        "Marquer le poulet avec la marque du jour",
        "Prendre une photo du registre rempli",
      ],
      signes: [
        "Poulet abattu ou faible",
        "Poulet qui ne marche plus",
        "Crête bleue ou pâle",
        "Plumes ébouriffées",
      ],
      preuveRequise: true,
      criticite: "haute",
    } satisfies ProtocoleTache,
  },
  {
    intervention: "Curage bac BSF 2", farm: "Ferme Nanga-Makola", parcel: "Bac BSF fermentation 2", team: "Equipe BSF Nanga", hour: "09:00", status: "A planifier" as InterventionStatus, site: "Nanga", categorie: "bsf", icone: "🪱",
    protocoleRefId: "fic-043",
    protocole: {
      pourquoi: "Un bac propre fait grossir vite les larves de mouches soldates.",
      etapes: [
        "Récolter les larves matures avec le tamis",
        "Vider les restes du bac",
        "Nettoyer le bac à l'eau",
        "Remettre une couche d'aliment frais",
        "Prendre une photo du bac propre",
      ],
      signes: [
        "Odeur très forte d'ammoniaque",
        "Larves mortes en surface",
        "Pas de mouvement dans le bac",
        "Présence de fourmis ou rats",
      ],
      preuveRequise: true,
      criticite: "moyenne",
    } satisfies ProtocoleTache,
  },
  {
    intervention: "Tailler avocatiers Nanga", farm: "Ferme Nanga-Makola", parcel: "Verger avocatiers Nanga", team: "Equipe Vergers Nanga", hour: "09:30", status: "En cours" as InterventionStatus, site: "Nanga", categorie: "verger", icone: "🥑",
    protocoleRefId: "fic-044",
    protocole: {
      pourquoi: "Tailler les avocatiers fait mieux pousser les fruits et évite les maladies.",
      etapes: [
        "Choisir les branches mortes ou malades",
        "Couper net avec le sécateur propre",
        "Garder les branches qui donnent vers le haut",
        "Ramasser les branches coupées",
        "Prendre une photo de l'arbre taillé",
      ],
      signes: [
        "Taches noires sur les feuilles",
        "Branches qui suintent",
        "Fruits qui tombent avant maturité",
        "Présence d'insectes en grand nombre",
      ],
      preuveRequise: true,
      criticite: "moyenne",
    } satisfies ProtocoleTache,
  },
  { intervention: "Recolter maniguette parcelle 1", farm: "Ferme Nanga-Makola", parcel: "Parcelle lippia Makola", team: "Equipe Aromatiques Makola", hour: "10:00", status: "Terminee" as InterventionStatus, site: "Makola", categorie: "aromatiques", icone: "🌿" },
  { intervention: "Nourrir carpes etang Nanga", farm: "Ferme Nanga-Makola", parcel: "Etang carpes Nanga", team: "Equipe Aquaculture Nanga", hour: "10:30", status: "Planifiee" as InterventionStatus, site: "Nanga", categorie: "aquaculture", icone: "🐠" },
  { intervention: "Nettoyer poulailler canards", farm: "Ferme Nanga-Makola", parcel: "Poulailler chair Nanga", team: "Equipe Volailles Nanga", hour: "11:00", status: "A valider" as InterventionStatus, site: "Nanga", categorie: "volaille", icone: "🦆" },
  { intervention: "Fertiliser citronnelle Makola", farm: "Ferme Nanga-Makola", parcel: "Parcelle citronnelle Makola sud", team: "Equipe Aromatiques Makola", hour: "11:30", status: "En retard" as InterventionStatus, site: "Makola", categorie: "aromatiques", icone: "🌱" },
  { intervention: "Inspecter cabris sante", farm: "Ferme Nanga-Makola", parcel: "Batiment cabris Nanga", team: "Equipe Elevage Nanga", hour: "12:00", status: "Terminee" as InterventionStatus, site: "Nanga", categorie: "elevage", icone: "🏥" },
  { intervention: "Recolter ananas Makola", farm: "Ferme Nanga-Makola", parcel: "Verger litchis Makola", team: "Equipe Recolte Makola", hour: "13:00", status: "En cours" as InterventionStatus, site: "Makola", categorie: "verger", icone: "🍍" },
  { intervention: "Verifier niveau eau etangs", farm: "Ferme Nanga-Makola", parcel: "Etang silures Nanga", team: "Equipe Aquaculture Nanga", hour: "14:00", status: "A planifier" as InterventionStatus, site: "Nanga", categorie: "aquaculture", icone: "💧" },
  { intervention: "Traiter mouches fruits manguiers", farm: "Ferme Nanga-Makola", parcel: "Verger avocatiers Nanga", team: "Equipe Vergers Nanga", hour: "14:30", status: "Planifiee" as InterventionStatus, site: "Nanga", categorie: "verger", icone: "🐛" },
  { intervention: "Collecter larves BSF bac 1", farm: "Ferme Nanga-Makola", parcel: "Bac BSF fermentation 2", team: "Equipe BSF Nanga", hour: "15:00", status: "Terminee" as InterventionStatus, site: "Nanga", categorie: "bsf", icone: "🦋" },
  { intervention: "Nettoyer atelier distillation", farm: "Ferme Nanga-Makola", parcel: "Atelier distillation Makola", team: "Equipe Distillation Makola", hour: "15:30", status: "A valider" as InterventionStatus, site: "Makola", categorie: "distillation", icone: "🧽" },
  { intervention: "Comptage poulets Nanga", farm: "Ferme Nanga-Makola", parcel: "Poulailler chair Nanga", team: "Equipe Volailles Nanga", hour: "16:00", status: "En cours" as InterventionStatus, site: "Nanga", categorie: "volaille", icone: "🔢" },
];

export const priorityAlerts = [
  { title: "Pompe etang carpes en panne Nanga", farm: "Ferme Nanga-Makola", zone: "Etang carpes Nanga", level: "Critique" as RiskLevel },
  { title: "Cabri 047 boite patte arriere", farm: "Ferme Nanga-Makola", zone: "Batiment cabris Nanga", level: "Eleve" as RiskLevel },
  { title: "Mouches fruits sur manguiers Makola", farm: "Ferme Nanga-Makola", zone: "Verger litchis Makola", level: "Critique" as RiskLevel },
  { title: "Fuite irrigation parcelle citronnelle", farm: "Ferme Nanga-Makola", zone: "Parcelle citronnelle Makola sud", level: "Eleve" as RiskLevel },
  { title: "Coupure electrique distillation Makola", farm: "Ferme Nanga-Makola", zone: "Atelier distillation Makola", level: "Critique" as RiskLevel },
  { title: "Niveau eau bas etang silures", farm: "Ferme Nanga-Makola", zone: "Etang silures Nanga", level: "Moyen" as RiskLevel },
  { title: "3 taches sans preuve photo", farm: "Ferme Nanga-Makola", zone: "Multi-parcelles", level: "Moyen" as RiskLevel },
  { title: "Retard recolte litchis Makola", farm: "Ferme Nanga-Makola", zone: "Verger litchis Makola", level: "Eleve" as RiskLevel },
];

export const farms = [
  { id: "nanga", name: "Site Nanga", surface: "28 ha", parcels: 10, teams: 4, dayInterventions: 12, incidents: 4, status: "Sous surveillance", crops: "Vergers, elevage, aquaculture, BSF", manager: "Jean-Pierre Mavoungou", lastReport: "il y a 12 min" },
  { id: "makola", name: "Site Makola", surface: "22 ha", parcels: 8, teams: 3, dayInterventions: 10, incidents: 2, status: "Activite normale", crops: "Aromatiques, distillation, vergers", manager: "Aimé Bakouma", lastReport: "il y a 8 min" },
];

export const actionParcels = [
  { parcel: "Verger avocatiers Nanga", farm: "Site Nanga", crop: "Avocatiers", lastVisit: "Aujourd'hui 07:45", risk: "Moyen" as RiskLevel, action: "Tailler arbres", site: "Nanga" },
  { parcel: "Etang silures Nanga", farm: "Site Nanga", crop: "Silures", lastVisit: "Aujourd'hui 08:15", risk: "Eleve" as RiskLevel, action: "Verifier pH", site: "Nanga" },
  { parcel: "Batiment cabris Nanga", farm: "Site Nanga", crop: "Cabris", lastVisit: "Hier 17:30", risk: "Critique" as RiskLevel, action: "Soigner cabri blesse", site: "Nanga" },
  { parcel: "Bac BSF fermentation 2", farm: "Site Nanga", crop: "BSF", lastVisit: "Aujourd'hui 09:20", risk: "Moyen" as RiskLevel, action: "Curage bac", site: "Nanga" },
  { parcel: "Poulailler chair Nanga", farm: "Site Nanga", crop: "Poules", lastVisit: "Aujourd'hui 10:05", risk: "Moyen" as RiskLevel, action: "Vacciner troupeau", site: "Nanga" },
  { parcel: "Etang carpes Nanga", farm: "Site Nanga", crop: "Carpes", lastVisit: "Hier 15:40", risk: "Eleve" as RiskLevel, action: "Nourrir poissons", site: "Nanga" },
  { parcel: "Parcelle citronnelle Makola sud", farm: "Site Makola", crop: "Citronnelle", lastVisit: "Aujourd'hui 08:30", risk: "Eleve" as RiskLevel, action: "Reparer fuite irrigation", site: "Makola" },
  { parcel: "Parcelle lippia Makola", farm: "Site Makola", crop: "Lippia", lastVisit: "Hier 16:20", risk: "Moyen" as RiskLevel, action: "Recolter feuilles", site: "Makola" },
  { parcel: "Atelier distillation Makola", farm: "Site Makola", crop: "Huiles essentielles", lastVisit: "Aujourd'hui 09:45", risk: "Critique" as RiskLevel, action: "Reparer electricite", site: "Makola" },
  { parcel: "Verger litchis Makola", farm: "Site Makola", crop: "Litchis", lastVisit: "Aujourd'hui 11:10", risk: "Eleve" as RiskLevel, action: "Traiter mouches fruits", site: "Makola" },
];

export const teams = [
  { id: "elevage-nanga", name: "Equipe Elevage Nanga", lead: "Christelle Loubaki", assigned: 6, done: 4, rate: "67%", lastCheckin: "12:15", members: 3, farmsCovered: 1, late: 1 },
  { id: "aquaculture-nanga", name: "Equipe Aquaculture Nanga", lead: "Pierre Nkounkou", assigned: 5, done: 3, rate: "60%", lastCheckin: "14:22", members: 2, farmsCovered: 1, late: 0 },
  { id: "vergers-nanga", name: "Equipe Vergers Nanga", lead: "Marie-Jose Mboumba", assigned: 4, done: 4, rate: "100%", lastCheckin: "15:30", members: 2, farmsCovered: 1, late: 0 },
  { id: "volailles-nanga", name: "Equipe Volailles Nanga", lead: "Antoine Boukaka", assigned: 7, done: 5, rate: "71%", lastCheckin: "16:45", members: 3, farmsCovered: 1, late: 1 },
  { id: "bsf-nanga", name: "Equipe BSF Nanga", lead: "Sophie Mbeki", assigned: 3, done: 2, rate: "67%", lastCheckin: "10:12", members: 2, farmsCovered: 1, late: 0 },
  { id: "aromatiques-makola", name: "Equipe Aromatiques Makola", lead: "Joseph Nguema", assigned: 8, done: 6, rate: "75%", lastCheckin: "13:28", members: 4, farmsCovered: 1, late: 1 },
  { id: "distillation-makola", name: "Equipe Distillation Makola", lead: "Fatima Alouna", assigned: 4, done: 3, rate: "75%", lastCheckin: "11:55", members: 2, farmsCovered: 1, late: 0 },
];

export const proofs = [
  { id: "p1", title: "Cabris nourris matin Nanga", farm: "Site Nanga", parcel: "Batiment cabris Nanga", author: "Equipe Elevage Nanga", hour: "06:45", status: "Validee" },
  { id: "p2", title: "pH etang silures verifie", farm: "Site Nanga", parcel: "Etang silures Nanga", author: "Equipe Aquaculture Nanga", hour: "07:15", status: "A valider" },
  { id: "p3", title: "Litchis recoltes Makola sud", farm: "Site Makola", parcel: "Verger litchis Makola", author: "Equipe Aromatiques Makola", hour: "08:20", status: "Validee" },
  { id: "p4", title: "Lot citronnelle distille 12", farm: "Site Makola", parcel: "Atelier distillation Makola", author: "Equipe Distillation Makola", hour: "08:45", status: "A valider" },
  { id: "p5", title: "Poulets vaccines Nanga", farm: "Site Nanga", parcel: "Poulailler chair Nanga", author: "Equipe Volailles Nanga", hour: "09:10", status: "Refusee" },
  { id: "p6", title: "Bac BSF 2 cure", farm: "Site Nanga", parcel: "Bac BSF fermentation 2", author: "Equipe BSF Nanga", hour: "09:35", status: "Validee" },
  { id: "p7", title: "Avocatiers tailles Nanga", farm: "Site Nanga", parcel: "Verger avocatiers Nanga", author: "Equipe Vergers Nanga", hour: "10:05", status: "A valider" },
  { id: "p8", title: "Maniguette recoltee parcelle 1", farm: "Site Makola", parcel: "Parcelle lippia Makola", author: "Equipe Aromatiques Makola", hour: "10:40", status: "Validee" },
  { id: "p9", title: "Carpes nourries etang Nanga", farm: "Site Nanga", parcel: "Etang carpes Nanga", author: "Equipe Aquaculture Nanga", hour: "11:15", status: "A valider" },
  { id: "p10", title: "Poulailler canards nettoye", farm: "Site Nanga", parcel: "Poulailler chair Nanga", author: "Equipe Volailles Nanga", hour: "11:50", status: "Refusee" },
  { id: "p11", title: "Citronnelle fertilisee Makola", farm: "Site Makola", parcel: "Parcelle citronnelle Makola sud", author: "Equipe Aromatiques Makola", hour: "12:25", status: "Validee" },
  { id: "p12", title: "Cabris inspectes sante", farm: "Site Nanga", parcel: "Batiment cabris Nanga", author: "Equipe Elevage Nanga", hour: "12:55", status: "A valider" },
  { id: "p13", title: "Ananas recoltes Makola", farm: "Site Makola", parcel: "Verger litchis Makola", author: "Equipe Aromatiques Makola", hour: "13:30", status: "Validee" },
  { id: "p14", title: "Niveau eau etangs verifie", farm: "Site Nanga", parcel: "Etang silures Nanga", author: "Equipe Aquaculture Nanga", hour: "14:20", status: "A valider" },
  { id: "p15", title: "Manguiers traites mouches", farm: "Site Nanga", parcel: "Verger avocatiers Nanga", author: "Equipe Vergers Nanga", hour: "15:05", status: "Refusee" },
  { id: "p16", title: "Larves BSF collectees bac 1", farm: "Site Nanga", parcel: "Bac BSF fermentation 2", author: "Equipe BSF Nanga", hour: "15:40", status: "Validee" },
  { id: "p17", title: "Atelier distillation nettoye", farm: "Site Makola", parcel: "Atelier distillation Makola", author: "Equipe Distillation Makola", hour: "16:10", status: "A valider" },
  { id: "p18", title: "Poulets comptes Nanga", farm: "Site Nanga", parcel: "Poulailler chair Nanga", author: "Equipe Volailles Nanga", hour: "16:35", status: "Validee" },
  { id: "p19", title: "Cabri 047 soigne", farm: "Site Nanga", parcel: "Batiment cabris Nanga", author: "Equipe Elevage Nanga", hour: "17:00", status: "A valider" },
  { id: "p20", title: "Pompe etang carpes reparee", farm: "Site Nanga", parcel: "Etang carpes Nanga", author: "Equipe Aquaculture Nanga", hour: "17:25", status: "Validee" },
  { id: "p21", title: "Fuite irrigation citronnelle fixee", farm: "Site Makola", parcel: "Parcelle citronnelle Makola sud", author: "Equipe Aromatiques Makola", hour: "17:50", status: "A valider" },
  { id: "p22", title: "Electricite distillation restauree", farm: "Site Makola", parcel: "Atelier distillation Makola", author: "Equipe Distillation Makola", hour: "18:15", status: "Validee" },
  { id: "p23", title: "Mouches fruits traitees manguiers", farm: "Site Makola", parcel: "Verger litchis Makola", author: "Equipe Aromatiques Makola", hour: "18:40", status: "Refusee" },
  { id: "p24", title: "Eau ajoutee etang silures", farm: "Site Nanga", parcel: "Etang silures Nanga", author: "Equipe Aquaculture Nanga", hour: "19:05", status: "A valider" },
  { id: "p25", title: "Vaccination poulets photo claire", farm: "Site Nanga", parcel: "Poulailler chair Nanga", author: "Equipe Volailles Nanga", hour: "19:30", status: "Validee" },
];

export const operationalMetrics = [
  { label: "Temps moyen de resolution", value: "4h15" },
  { label: "Site le plus expose", value: "Nanga" },
  { label: "Equipe la plus reguliere", value: "Vergers Nanga" },
  { label: "Culture la plus surveillee", value: "Citronnelle" },
];

export const incidents = [
  { id: "i1", incident: "Pompe etang carpes en panne Nanga", farm: "Site Nanga", zone: "Etang carpes Nanga", category: "Materiel", criticality: "Critique", reporter: "Equipe Aquaculture Nanga", date: "28/04 07:30", status: "Assigne" as IncidentStatus, assignee: "Maintenance centrale", site: "Nanga" },
  { id: "i2", incident: "Cabri 047 boite patte arriere", farm: "Site Nanga", zone: "Batiment cabris Nanga", category: "Sanitaire", criticality: "Eleve", reporter: "Equipe Elevage Nanga", date: "28/04 08:45", status: "En investigation" as IncidentStatus, assignee: "Veterinaire local", site: "Nanga" },
  { id: "i3", incident: "Mouches fruits sur manguiers Makola", farm: "Site Makola", zone: "Verger litchis Makola", category: "Phytosanitaire", criticality: "Critique", reporter: "Equipe Aromatiques Makola", date: "28/04 09:15", status: "Ouvert" as IncidentStatus, assignee: "Responsable phytosanitaire", site: "Makola" },
  { id: "i4", incident: "Fuite irrigation parcelle citronnelle", farm: "Site Makola", zone: "Parcelle citronnelle Makola sud", category: "Materiel", criticality: "Eleve", reporter: "Equipe Aromatiques Makola", date: "28/04 10:20", status: "Traite" as IncidentStatus, assignee: "Equipe Maintenance", site: "Makola" },
  { id: "i5", incident: "Coupure electrique distillation Makola", farm: "Site Makola", zone: "Atelier distillation Makola", category: "Materiel", criticality: "Critique", reporter: "Equipe Distillation Makola", date: "28/04 11:00", status: "Cloture" as IncidentStatus, assignee: "Electricien local", site: "Makola" },
  { id: "i6", incident: "Niveau eau bas etang silures", farm: "Site Nanga", zone: "Etang silures Nanga", category: "Irrigation", criticality: "Moyen", reporter: "Equipe Aquaculture Nanga", date: "27/04 16:30", status: "Ouvert" as IncidentStatus, assignee: "Superviseur Nanga", site: "Nanga" },
  { id: "i7", incident: "Oiseaux verger ananas Makola", farm: "Site Makola", zone: "Verger litchis Makola", category: "Protection", criticality: "Moyen", reporter: "Equipe Aromatiques Makola", date: "27/04 14:45", status: "En investigation" as IncidentStatus, assignee: "Equipe Recolte Makola", site: "Makola" },
  { id: "i8", incident: "Retard recolte litchis Makola", farm: "Site Makola", zone: "Verger litchis Makola", category: "Production", criticality: "Eleve", reporter: "Aimé Bakouma", date: "26/04 12:15", status: "Assigne" as IncidentStatus, assignee: "Equipe Aromatiques Makola", site: "Makola" },
  { id: "i9", incident: "Bac BSF 3 surchauffe", farm: "Site Nanga", zone: "Bac BSF fermentation 2", category: "Materiel", criticality: "Moyen", reporter: "Equipe BSF Nanga", date: "25/04 09:30", status: "Cloture" as IncidentStatus, assignee: "Equipe Maintenance", site: "Nanga" },
  { id: "i10", incident: "Champignons poulailler canards", farm: "Site Nanga", zone: "Poulailler chair Nanga", category: "Sanitaire", criticality: "Eleve", reporter: "Equipe Volailles Nanga", date: "24/04 15:20", status: "Traite" as IncidentStatus, assignee: "Veterinaire local", site: "Nanga" },
];

export const equipment = [
  ["Pompe etang carpes Nanga", "Pompe", "Site Nanga", "En panne", "25/04", "28/04", "3", "Critique"],
  ["Tracteur vergers Makola", "Tracteur", "Site Makola", "Operationnel", "20/04", "20/05", "0", "Disponible"],
  ["Capteur pH etang silures", "Capteur", "Site Nanga", "Fonctionnel", "15/04", "15/05", "0", "OK"],
  ["Alambic distillation Makola", "Alambic", "Site Makola", "Hors service", "26/04", "28/04", "2", "Critique"],
  ["Nourrisseur automatique cabris", "Nourrisseur", "Site Nanga", "Operationnel", "10/04", "10/05", "0", "Disponible"],
];

export const stocks = [
  ["Engrais organique BSF", "Engrais", "450", "120", "kg", "Site Nanga", "28/04", "Normal"],
  ["Semences citronnelle", "Semences", "25", "15", "kg", "Site Makola", "27/04", "A surveiller"],
  ["Aliment volailles", "Aliment", "320", "85", "kg", "Site Nanga", "28/04", "Normal"],
  ["Huile essentielle citronnelle", "Produit fini", "45", "12", "litres", "Site Makola", "26/04", "Stock eleve"],
  ["Vaccins poulets", "Sanitaire", "8", "3", "flacons", "Site Nanga", "25/04", "Rupture imminente"],
];

export const timeline = [
  "28/04 - 06:30 - Nourrir cabris matin Nanga",
  "28/04 - 07:00 - Verifier pH etang silures",
  "28/04 - 07:30 - Recolter litchis Makola sud",
  "28/04 - 08:00 - Distiller lot citronnelle 12",
  "27/04 - 16:10 - Inspection sanitaire cabris",
  "27/04 - 14:45 - Observation oiseaux verger",
  "26/04 - 12:15 - Point recolte litchis",
  "25/04 - 09:30 - Maintenance bac BSF",
];
