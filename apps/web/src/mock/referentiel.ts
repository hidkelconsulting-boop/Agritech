// Mock initial de fiches référentielles.
// Représente l'état "ce que l'IA a proposé + ce que le propriétaire a déjà validé/rejeté"
// au moment où on entre dans l'application.
//
// Une partie est en suggestion_ia / a_valider, une partie est déjà valide/rejete pour montrer le workflow.
// Source des contenus : référentiel brut apps/web/src/lib/expertise/* (FAO, OIE, CIRAD, guides souches).

import type { FicheReferentielle } from "@/lib/referentiel/types";

export const fichesReferentiellesInitiales: FicheReferentielle[] = [
  // ============================================================
  // RATIONS
  // ============================================================
  {
    id: "fic-001",
    filiere: "elevage-cabris",
    type: "ration",
    titre: "Ration matin cabris en croissance (4-12 mois)",
    description:
      "Ration équilibrée pour cabris jeunes en phase de croissance, race locale ~20-25 kg.",
    formulationIA:
      "Pour un cabri de croissance, l'apport matinal combine fourrage vert pour le rumen et concentré pour la croissance musculaire. Eau propre indispensable.",
    ingredients: [
      { libelle: "Fourrage vert (Panicum ou Brachiaria)", quantite: "2", unite: "kg / tête / jour", commentaire: "Fauché du matin, pas fané au soleil > 4h" },
      { libelle: "Concentré croissance 14% MAT", quantite: "350", unite: "g / tête / jour", commentaire: "Réparti matin + après-midi" },
      { libelle: "Sel / bloc minéral", quantite: "5", unite: "g / tête / jour", commentaire: "Libre service de préférence" },
      { libelle: "Eau propre", quantite: "à volonté", unite: "—", commentaire: "Changée 2× par jour" },
    ],
    quantitesDetaillees:
      "Pour un troupeau de 30 cabris : 60 kg de fourvert, 10,5 kg de concentré, 150 g de sel, 90 L d'eau approximativement.",
    conditionsUtilisation: [
      "Cabris sevrés, 4 à 12 mois",
      "En bonne santé (pas de diarrhée, pas de fièvre)",
      "Litière sèche, hors stress (transport récent, sevrage < 7 jours)",
    ],
    risquesEtPrecautions: [
      "Ne jamais donner d'aliment moisi (mycotoxines)",
      "Surveiller refus d'aliment et selles (alerte si liquides)",
      "Vérifier que l'eau n'a pas été souillée par les déjections",
      "Pas plus de 350 g de concentré (sinon acidose ruminale)",
    ],
    hypothesesIA: [
      "Race locale africaine ~25 kg adulte",
      "Fourrage vert disponible localement toute l'année",
      "Concentré commercial accessible (provendier Pointe-Noire)",
    ],
    informationsManquantes: [
      "Analyse nutritionnelle réelle du fourrage local",
      "Prix actuel du concentré sur le marché de Pointe-Noire",
      "Nombre exact de cabris de cette tranche d'âge dans le troupeau",
    ],
    source: "FAO Goat Production Handbook 2017 — adapté contexte tropical Congo",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T08:00:00Z",
  },
  {
    id: "fic-002",
    filiere: "elevage-cabris",
    type: "ration",
    titre: "Ration lactation chèvre suitée",
    description: "Apport renforcé pour chèvre en lactation, jusqu'à 1.5 L/jour.",
    formulationIA:
      "Une chèvre en lactation a des besoins nettement supérieurs à l'entretien. La couverture énergétique vient du fourrage de qualité ; les protéines viennent du concentré ; l'eau est cruciale (1 L pour 1 L de lait).",
    ingredients: [
      { libelle: "Fourrage vert de qualité (légumineuses si possible)", quantite: "à volonté", unite: "—", commentaire: "Mélange Brachiaria + Stylosanthes idéal" },
      { libelle: "Concentré lactation 16% MAT", quantite: "600", unite: "g / tête / jour" },
      { libelle: "Eau propre", quantite: "5 à 8", unite: "L / jour", commentaire: "Selon production laitière" },
    ],
    conditionsUtilisation: [
      "Chèvre allaitante avec chevreau de moins de 4 mois",
      "Bonne condition corporelle (note 2.5-3.5 sur 5)",
    ],
    risquesEtPrecautions: [
      "Chute brutale de l'apport = chute du lait, à éviter",
      "Aliment moisi interdit",
      "Vérifier qualité de l'eau (lait fortement contaminé sinon)",
    ],
    hypothesesIA: [
      "Production laitière moyenne 1 à 1.5 L/jour (race locale)",
      "Fourrage de qualité disponible",
    ],
    informationsManquantes: [
      "Productions laitières réelles observées",
      "Présence éventuelle de légumineuses dans le pâturage",
    ],
    source: "FAO Goat Production Handbook 2017",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T08:00:00Z",
  },

  // ============================================================
  // RECETTES ALIMENTAIRES
  // ============================================================
  {
    id: "fic-003",
    filiere: "volaille-chair",
    type: "recette-alimentaire",
    titre: "Recette aliment poulet chair finition (maison)",
    description:
      "Formule maison pour poulets de chair en phase finition (25-42 jours), exploitant des matières premières locales.",
    formulationIA:
      "Pour réduire le coût d'achat d'aliment commercial, fabrication maison à partir de matières premières disponibles. Garde 18% MAT minimum.",
    ingredients: [
      { libelle: "Maïs concassé", quantite: "55", unite: "%", commentaire: "Maïs sec, taux humidité < 14%" },
      { libelle: "Tourteau de soja 44%", quantite: "25", unite: "%" },
      { libelle: "Son de blé", quantite: "12", unite: "%" },
      { libelle: "Farine de poisson", quantite: "5", unite: "%", commentaire: "Ne pas dépasser 8% (goût)" },
      { libelle: "Coquillage broyé", quantite: "1.5", unite: "%", commentaire: "Apport calcium" },
      { libelle: "Sel", quantite: "0.5", unite: "%" },
      { libelle: "Prémix vitamines / minéraux", quantite: "1", unite: "%", commentaire: "Indispensable, à acheter chez vétérinaire" },
    ],
    quantitesDetaillees:
      "Pour 100 kg d'aliment fini : 55 kg maïs + 25 kg soja + 12 kg son + 5 kg farine poisson + 1.5 kg coquillage + 0.5 kg sel + 1 kg prémix.",
    conditionsUtilisation: [
      "Mélange homogène (mélangeur ou pelle propre)",
      "Stockage en sac propre, au sec, max 4 semaines",
      "Distribution ad libitum, mangeoires propres",
    ],
    risquesEtPrecautions: [
      "Maïs humide ou stocké à l'air = mycotoxines (mortalité)",
      "Mélange mal homogène = carences vitamines",
      "Ne jamais utiliser farine de poisson rance",
      "Vide alimentaire 8h avant abattage",
    ],
    hypothesesIA: [
      "Matières premières disponibles régulièrement",
      "Prémix vitamines accessible (vétérinaire local)",
      "Stockage au sec possible",
    ],
    informationsManquantes: [
      "Qualité (humidité, propreté) du maïs livré",
      "Disponibilité réelle de la farine de poisson locale",
      "Coût total comparé à l'aliment commercial",
    ],
    source: "Adapté de Cobb 500 Performance Guide 2022 + recettes terrain",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-09T10:00:00Z",
  },
  {
    id: "fic-004",
    filiere: "bsf",
    type: "recette-alimentaire",
    titre: "Substrat BSF à base de drèche de brasserie",
    description:
      "Recette de substrat protéiné économique exploitant les résidus locaux (drèche, déchets fruits, son).",
    formulationIA:
      "Les larves de BSF se développent rapidement sur substrat protéiné humide. La drèche de brasserie est un excellent intrant, à compléter avec déchets végétaux pour l'équilibre.",
    ingredients: [
      { libelle: "Drèche de brasserie humide", quantite: "60", unite: "%", commentaire: "Récupération hebdomadaire" },
      { libelle: "Déchets fruits / légumes", quantite: "30", unite: "%", commentaire: "Pas d'agrumes en grande quantité" },
      { libelle: "Son de blé", quantite: "10", unite: "%", commentaire: "Apporte la structure" },
    ],
    quantitesDetaillees:
      "350 g de substrat par larve mature visée. Distribution tous les 2-3 jours selon consommation observée.",
    conditionsUtilisation: [
      "Humidité du substrat 70-80%",
      "Température bac 25-32°C",
      "Profondeur de substrat 10 cm idéale",
    ],
    risquesEtPrecautions: [
      "Drèche fraîche fermente vite : odeur ammoniaquée = trop de drèche",
      "Vérifier absence de pesticides dans déchets fruits",
      "Ne jamais utiliser déjections fraîches de mammifères dans substrat alimentation BSF destinée aux animaux",
    ],
    hypothesesIA: [
      "Brasserie locale livrant régulièrement",
      "Volume de production BSF stable",
    ],
    informationsManquantes: [
      "Régularité d'approvisionnement de la drèche",
      "Capacité de stockage (drèche périssable)",
    ],
    source: "CIRAD Hermetia illucens 2019 + adaptation terrain",
    statut: "valide",
    validePar: "Aimé",
    dateValidation: "2026-04-22T14:30:00Z",
    justificationValidation:
      "Testé 6 mois en 2025, taux croissance larves 0.25g atteint à J14. Brasserie Pointe-Noire fournit 200 kg/semaine régulièrement.",
    visibleOuvrier: true,
    visibleResponsable: true,
    visibleProprietaire: true,
    dateProposition: "2026-04-15T08:00:00Z",
  },

  // ============================================================
  // PROTOCOLES SANITAIRES
  // ============================================================
  {
    id: "fic-005",
    filiere: "elevage-cabris",
    type: "protocole-sanitaire",
    titre: "Vaccination entérotoxémie cabri jeune",
    description: "Primovaccination Clostridium perfringens à 1 mois, rappel à 2 mois.",
    formulationIA:
      "L'entérotoxémie est une cause majeure de mortalité des cabris jeunes. Vaccination très efficace si protocole respecté.",
    quantitesDetaillees:
      "2 mL par cabri, voie sous-cutanée (peau du cou ou de l'épaule). Rappel obligatoire 4 semaines plus tard. Puis rappel annuel.",
    conditionsUtilisation: [
      "Cabri en bonne santé (pas de fièvre, pas de diarrhée)",
      "Conservation vaccin chaîne du froid 2-8°C",
      "Aiguille stérile (changer à chaque animal idéalement)",
    ],
    risquesEtPrecautions: [
      "Choc anaphylactique rare mais possible — adrénaline d'urgence à portée",
      "Vaccin congelé = inactif (ne jamais congeler)",
      "Tenir registre par animal (numéro tatouage ou boucle)",
    ],
    hypothesesIA: [
      "Cabris identifiables individuellement",
      "Vaccin disponible chez vétérinaire local",
      "Chaîne du froid possible jusqu'à la ferme",
    ],
    informationsManquantes: [
      "Fournisseur vaccin sur la zone",
      "État chaîne du froid à la ferme",
    ],
    source: "FAO Goat Health Manual 2018 + OIE",
    statut: "valide",
    validePar: "Aimé",
    dateValidation: "2026-04-10T09:00:00Z",
    justificationValidation:
      "Protocole standard mondial. Notre cabinet vétérinaire de Pointe-Noire fournit le vaccin et assure la chaîne du froid jusqu'à la ferme. Appliqué depuis 2023, aucun cas d'entérotoxémie depuis.",
    visibleOuvrier: true,
    visibleResponsable: true,
    visibleProprietaire: true,
    dateProposition: "2026-04-05T08:00:00Z",
  },
  {
    id: "fic-006",
    filiere: "volaille-chair",
    type: "protocole-sanitaire",
    titre: "Calendrier vaccinal complet poulet chair (J1-J21)",
    description:
      "Programme standard 4 vaccins du couvoir à 21 jours : Marek, Newcastle+Bronchite, Gumboro, Newcastle rappel.",
    formulationIA:
      "La fenêtre J1-J21 est critique pour la couverture vaccinale. Tout vaccin manqué expose à mortalité massive ultérieure.",
    quantitesDetaillees:
      "J1 : Marek 0.2 mL SC (idéalement couvoir). J7 : Newcastle+Bronchite 1 goutte oculo-nasale. J14 : Gumboro eau de boisson. J21 : Newcastle rappel eau de boisson.",
    conditionsUtilisation: [
      "Eau de boisson sans chlore pour vaccins oraux",
      "Préparation extemporanée (max 2h)",
      "Animaux à jeun 2h avant vaccin oral",
    ],
    risquesEtPrecautions: [
      "Chlore inactive les vaccins vivants",
      "Mauvaise température conservation = inefficacité",
      "Tous les oiseaux doivent recevoir le vaccin (vérifier consommation eau)",
    ],
    hypothesesIA: [
      "Lot homogène en âge",
      "Système d'abreuvement permettant distribution uniforme",
    ],
    informationsManquantes: [
      "Type d'abreuvoirs présents",
      "Qualité eau (chlore ?)",
    ],
    source: "OIE Avian Vaccination Guidelines 2021",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-08T08:00:00Z",
  },

  // ============================================================
  // SYNERGIES ENTRE FILIÈRES
  // ============================================================
  {
    id: "fic-007",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Fientes de poules → compost pour vergers",
    description:
      "Valorisation des fientes pour fertilisation organique des avocatiers, manguiers et litchis.",
    formulationIA:
      "Les fientes sont un excellent fertilisant azoté mais doivent être compostées avant épandage. Apport ciblé 2× par an aux arbres adultes.",
    quantitesDetaillees:
      "5 kg de compost mûr par arbre adulte, 2 fois par an (début et fin de saison sèche). Pour 30 poules pondeuses : ~4.5 kg de fientes brutes/jour à composter sur 90 jours = ~400 kg de compost/an, suffisant pour environ 40 arbres adultes.",
    ingredients: [
      { libelle: "Fientes fraîches", quantite: "70", unite: "% poids" },
      { libelle: "Paille ou résidus secs", quantite: "30", unite: "% poids", commentaire: "OBLIGATOIRE — sinon fermentation anaérobie" },
      { libelle: "Eau pour humidifier", quantite: "selon besoin", unite: "—", commentaire: "Humidité visée : éponge essorée" },
    ],
    conditionsUtilisation: [
      "Compostage 90 jours minimum sur dalle imperméable",
      "Retournement mensuel obligatoire",
      "Distance minimum 50 m de toute eau (étang, puits, ruisseau)",
      "Saison sèche pour fermentation optimale",
    ],
    risquesEtPrecautions: [
      "Excès d'azote = brûlure racinaire, jaunissement",
      "Fermentation anaérobie (méthane, mauvaise odeur, mouches)",
      "Salmonelles et E. coli si appliqué frais (compostage insuffisant)",
      "Jamais sur fruits accessibles à hauteur de main",
      "Porter gants + masque si manipulation pulvérulente",
    ],
    hypothesesIA: [
      "Cheptel poules pondeuses ~30 oiseaux produisant 0.15 kg fientes/j/oiseau",
      "Disponibilité de paille / résidus secs (riz, maïs)",
      "Dalle de compostage existante ou constructible",
    ],
    informationsManquantes: [
      "Composition exacte des fientes (alimentation des poules)",
      "Charge bactérienne après compostage (analyse labo)",
      "Distance réelle entre poulailler et vergers (logistique)",
    ],
    source: "FAO Soil & Water Bureau + bonnes pratiques compostage tropical",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-07T08:00:00Z",
  },
  {
    id: "fic-008",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Larves BSF séchées → complément protéique volailles",
    description:
      "Utilisation des larves de mouches soldates noires comme source protéique (40-45% MAT) dans la ration des poulets de chair.",
    formulationIA:
      "Les larves BSF sont une source protéique de haute qualité, déjà autorisée dans plusieurs pays. Permet de réduire la dépendance à la farine de poisson ou au tourteau soja importé.",
    quantitesDetaillees:
      "Maximum 10% de la ration totale. Pour un poulet en finition consommant 145 g/j : 15 g de larves séchées maximum. Pour 500 poulets : ~7.5 kg/jour de larves séchées en finition.",
    ingredients: [
      { libelle: "Larves BSF matures", quantite: "selon besoin", unite: "g", commentaire: "Récoltées avant la phase pupe" },
      { libelle: "Eau bouillante pour blanchiment", quantite: "5", unite: "min", commentaire: "Tue agents pathogènes" },
    ],
    conditionsUtilisation: [
      "Blanchiment 5 min eau bouillante OBLIGATOIRE avant séchage",
      "Séchage solaire 48 h sur bâche propre OU four à 60°C 24 h",
      "Stockage sac propre, au sec, max 30 jours",
      "Transition progressive sur 7 jours dans la ration",
      "Larves élevées sur substrat végétal/laitier UNIQUEMENT (jamais déjections mammifères)",
    ],
    risquesEtPrecautions: [
      "Dépasser 10% : trop gras, gain réduit",
      "Larves crues : risque salmonelles, E. coli",
      "Larves mal séchées : moisissures (aflatoxines)",
      "RÈGLEMENTATION : alimentation animale interdite si BSF élevées sur déjections mammifères",
      "Tenir registre origine substrat BSF (traçabilité)",
    ],
    hypothesesIA: [
      "Production BSF stable et substrat conforme",
      "Capacité de séchage (solaire ou four)",
      "Acceptation par les poulets (transition réussie)",
    ],
    informationsManquantes: [
      "Substrat actuel des bacs BSF (à confirmer non-déjections)",
      "Capacité réelle de séchage selon saison",
      "Coût équivalent farine poisson actuellement",
    ],
    source: "CIRAD Hermetia illucens 2019 + EFSA Scientific Opinion 2015",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T08:00:00Z",
  },
  {
    id: "fic-009",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Boues d'étang → fertilisation parcelles aromatiques",
    description:
      "Valorisation des sédiments lors de la vidange annuelle des étangs pour fertilisation des parcelles citronnelle/lippia.",
    formulationIA:
      "Les boues de fond d'étang sont riches en azote, phosphore, matière organique. Très bon fertilisant pour cultures pérennes NON consommées crues.",
    quantitesDetaillees:
      "Épandage 2 tonnes / hectare maximum. Pour 1 ha de citronnelle : 2 t de boues séchées. Application unique en début de saison sèche.",
    conditionsUtilisation: [
      "Pompage en fin de cycle, étang à demi-plein",
      "Décantation 7 jours minimum en bac",
      "Séchage 14 jours minimum (réduit charge bactérienne)",
      "Épandage uniquement sur cultures NON consommées crues",
      "PAS sur arbres fruitiers, PAS sur maraîchage feuilles",
    ],
    risquesEtPrecautions: [
      "Charge bactérienne élevée si non séché",
      "Métaux lourds possibles si étang ancien (analyse recommandée)",
      "Modification pH du sol (alcalinisation)",
      "Saison des pluies : ruissellement vers nappes",
      "Jamais d'application sur cultures destinées à consommation crue dans les 60 jours",
    ],
    hypothesesIA: [
      "Étangs sans pollution amont (pas d'industrie, pas de zone urbaine en amont)",
      "Vidange annuelle programmée",
      "Capacité de décantation/séchage existante",
    ],
    informationsManquantes: [
      "Analyse labo des boues (métaux lourds, microbiologie)",
      "Antériorité de l'étang (cumul de sédiments potentiellement pollués)",
      "Surface réelle de parcelles aromatiques disponibles",
    ],
    source: "FAO Integrated Aquaculture-Agriculture 2018",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T08:00:00Z",
  },
  {
    id: "fic-010",
    filiere: "transversal",
    type: "recyclage",
    titre: "Résidus de distillation citronnelle → paillage vergers",
    description:
      "Réutilisation de la pulpe végétale issue de la distillation comme paillage organique sous les arbres fruitiers.",
    formulationIA:
      "La pulpe post-distillation contient encore des fibres et un peu d'azote. Excellent paillage qui limite l'évaporation et inhibe les adventices.",
    quantitesDetaillees:
      "Couche de 5-7 cm autour de chaque arbre, sur un cercle d'1 m de rayon. Renouvellement 2× par an. Pour 100 kg de citronnelle distillée : ~70 kg de pulpe résiduelle.",
    conditionsUtilisation: [
      "Pulpe encore tiède acceptable",
      "Application immédiate ou stockage max 7 jours",
      "Maintenir 10 cm de distance entre paillage et tronc",
    ],
    risquesEtPrecautions: [
      "Si pulpe stockée trop longtemps : fermentation, attractive pour rongeurs",
      "Trop épais : peut bloquer pluies fines",
      "Au contact direct du tronc : risque pourriture du collet",
    ],
    hypothesesIA: [
      "Distillation hebdomadaire avec production constante de pulpe",
      "Logistique transport atelier → vergers gérable",
    ],
    informationsManquantes: [
      "Volume hebdomadaire de pulpe disponible",
      "Distance atelier distillation ↔ vergers",
    ],
    source: "Pratique paysanne valorisation déchets distillation",
    statut: "valide",
    validePar: "Aimé",
    dateValidation: "2026-03-28T11:00:00Z",
    justificationValidation:
      "Pratique appliquée depuis 2 saisons sur 8 avocatiers test. Réduction visible des arrosages d'été (-30%) et moins d'adventices. Validé pour extension à tout le verger.",
    visibleOuvrier: true,
    visibleResponsable: true,
    visibleProprietaire: true,
    dateProposition: "2026-03-15T08:00:00Z",
  },
  {
    id: "fic-011",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Fientes fraîches → directement dans étangs poissons",
    description: "Apport direct de fientes non compostées dans les étangs pour stimuler le plancton.",
    formulationIA:
      "Technique d'élevage piscicole intégré pratiquée historiquement en Asie. La matière organique stimule le développement de plancton qui sert d'aliment aux poissons.",
    conditionsUtilisation: ["Étangs de carpes ou tilapia (silures préfèrent aliment direct)"],
    risquesEtPrecautions: [
      "Charge organique excessive → désoxygénation → mortalité massive",
      "Pathogènes humains (E. coli, salmonelles) sur poissons destinés consommation",
      "Réglementation sanitaire stricte selon pays",
    ],
    hypothesesIA: [],
    informationsManquantes: [
      "Type de poisson élevé localement",
      "Surface et profondeur des étangs",
    ],
    source: "Pratique historique aquaculture intégrée",
    statut: "rejete",
    raisonRejet:
      "Risque sanitaire trop élevé pour notre contexte (silures principalement, étangs de petite profondeur). Mortalités constatées chez voisins ayant essayé. À ne jamais appliquer.",
    commentaireExpert:
      "Vétérinaire local consulté, déconseille formellement. Préférer compostage + épandage terrestre (voir fiche fientes → compost vergers).",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-04-02T08:00:00Z",
    dateValidation: "2026-04-04T14:00:00Z",
    validePar: "Aimé",
  },

  // ============================================================
  // SEUILS TECHNIQUES
  // ============================================================
  {
    id: "fic-012",
    filiere: "pisciculture-silure",
    type: "seuil-technique",
    titre: "Plage pH eau étang silures",
    description: "pH acceptable 6.5-8.5, optimum 7.2. Alerte si hors plage.",
    formulationIA:
      "Le pH conditionne directement la santé des silures. En dehors de la plage, stress puis mortalité progressive.",
    quantitesDetaillees:
      "Mesure quotidienne à 7h du matin. Bandelette pH ou pH-mètre étalonné. Si pH < 6.0 : chaulage 100 g/m² CaCO3. Si pH > 8.8 : renouvellement eau 20%.",
    conditionsUtilisation: [
      "Mesure du matin avant tout apport d'aliment",
      "Pas de mesure sous orage ou pluie en cours",
      "Étalonnage hebdomadaire si pH-mètre électronique",
    ],
    risquesEtPrecautions: [
      "pH < 5 : mortalité massive en 24 h",
      "Chaulage excessif : alcalinose, brûlures branchiales",
      "Mesure le matin uniquement (pH plus stable, photosynthèse pas démarrée)",
    ],
    hypothesesIA: [
      "Élevage Clarias gariepinus (silure africain)",
      "Étangs en eau dure naturelle (CaCO3 modéré)",
    ],
    informationsManquantes: [
      "Type exact de silure élevé",
      "Source d'eau (forage, rivière, pluie) et son pH naturel",
    ],
    source: "FAO Aquaculture Series Clarias",
    statut: "valide",
    validePar: "Aimé",
    dateValidation: "2026-04-01T08:30:00Z",
    justificationValidation:
      "Plage standard validée par notre fournisseur d'alevins. pH-mètre acheté, étalonnage fait. Protocole appliqué depuis 6 mois sans mortalité.",
    visibleOuvrier: true,
    visibleResponsable: true,
    visibleProprietaire: true,
    dateProposition: "2026-03-25T08:00:00Z",
  },

  // ============================================================
  // TÂCHES GUIDÉES
  // ============================================================
  {
    id: "fic-013",
    filiere: "elevage-cabris",
    type: "tache-guidee",
    titre: "Tâche guidée : nourrissage matin cabris en croissance",
    description:
      "Procédure pas-à-pas adaptée à un ouvrier de terrain, dérivée de la ration validée.",
    formulationIA:
      "Cette tâche guidée traduit la ration validée en consigne opérationnelle simple. Étapes courtes, vocabulaire concret, photo obligatoire.",
    quantitesDetaillees:
      "Pour les 30 cabris en croissance : 2 paniers de fourrage vert (≈60 kg total) + 1 mesure de concentré (≈11 kg total) + remplir l'auge à sel.",
    conditionsUtilisation: [
      "Matin avant 8h, après la 1ère traite",
      "Bouger les mangeoires si humides",
      "Vérifier propreté abreuvoir avant remplissage",
    ],
    risquesEtPrecautions: [
      "Si un cabri ne mange pas → appuyer sur PROBLÈME",
      "Si selles liquides observées → appuyer sur PROBLÈME",
      "Si fourrage moisi ou odeur mauvaise → ne pas donner, appuyer sur PROBLÈME",
    ],
    hypothesesIA: [
      "Ouvrier dispose de la mesure concentré (seau gradué)",
      "Paniers de fourrage standard 30 kg vides",
    ],
    informationsManquantes: [],
    source: "Dérivée de fic-001 (ration matin cabris) — à valider après validation de fic-001",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T09:00:00Z",
  },

  // ============================================================
  // CALENDRIERS
  // ============================================================
  {
    id: "fic-014",
    filiere: "verger-litchi",
    type: "calendrier",
    titre: "Calendrier récolte litchis Makola",
    description:
      "Période de pleine récolte des litchis sur le site Makola : novembre à janvier.",
    formulationIA:
      "Le litchi est saisonnier strict. Récolte étalée sur 3-4 semaines, à anticiper en main d'œuvre et en débouchés commerciaux.",
    quantitesDetaillees:
      "Pic de récolte estimé entre semaine 49 (début décembre) et semaine 1 (début janvier). Rendement moyen 50 kg / arbre adulte. Avec 40 arbres adultes : ~2 t total sur la période.",
    conditionsUtilisation: [
      "Floraison juillet-septembre observée et validée",
      "Récolte le matin, avant 11h (fraîcheur)",
      "Cueillette en grappes complètes, jamais à l'unité",
    ],
    risquesEtPrecautions: [
      "Mouches des fruits : traitement préventif J-30",
      "Coup de chaleur > 35°C : pertes en chute de fruits",
      "Logistique commercialisation à anticiper (fragile, 7 jours max)",
    ],
    hypothesesIA: [
      "40 arbres adultes en production",
      "Climat tropical humide Congo (Makola)",
    ],
    informationsManquantes: [
      "Nombre exact d'arbres adultes",
      "Débouchés commerciaux confirmés",
      "Capacité de stockage frais à la ferme",
    ],
    source: "FAO Tropical Fruit Compendium 2020 + observation pluriannuelle Makola",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T08:00:00Z",
  },

  // ============================================================
  // SYNERGIES SUPPLÉMENTAIRES / RECYCLAGE
  // ============================================================
  {
    id: "fic-015",
    filiere: "transversal",
    type: "recyclage",
    titre: "Plumes de poulets → compost azoté",
    description:
      "Valorisation des plumes issues de l'abattage comme apport azoté lent dans le compost vergers.",
    formulationIA:
      "Les plumes sont composées à 90% de kératine, libérant azote lentement sur 6-12 mois. Incorporation au compost mature permet enrichissement progressif.",
    quantitesDetaillees:
      "Maximum 10% du volume de compost en construction. Pour un cycle de 100 poulets abattus (~3 kg de plumes), compostage avec 30 kg de matière carbonée (paille, sciure non traitée).",
    ingredients: [
      { libelle: "Plumes fraîches", quantite: "10", unite: "% volume", commentaire: "Trempées 24h avant compostage" },
      { libelle: "Paille ou sciure non traitée", quantite: "90", unite: "% volume" },
      { libelle: "Eau d'humidification", quantite: "selon besoin", unite: "—" },
    ],
    conditionsUtilisation: [
      "Plumes issues d'oiseaux sains uniquement",
      "Compostage 6 mois minimum (kératine lente)",
      "Retournement bimensuel",
      "T° du tas suivie : pic 60-65°C souhaitable pour hygiénisation",
    ],
    risquesEtPrecautions: [
      "Plumes d'oiseaux malades : INTERDIT (risque grippe aviaire, salmonelles)",
      "Trop de plumes = compost déséquilibré, lent",
      "Odeur si humidité insuffisante",
    ],
    hypothesesIA: [
      "Abattage à la ferme avec collecte propre des plumes",
      "Dalle de compostage existante",
    ],
    informationsManquantes: [
      "Volume hebdomadaire d'abattage prévu",
      "Existence ou non d'un local d'abattage hygiénique",
    ],
    source: "FAO Compost Handbook + bonnes pratiques élevage tropical",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T10:00:00Z",
  },
  {
    id: "fic-016",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Coquilles d'œufs broyées → complément calcium volailles",
    description:
      "Retour direct des coquilles broyées dans la ration des pondeuses pour renforcer l'apport calcium.",
    formulationIA:
      "Les coquilles d'œufs sont composées à 95% de carbonate de calcium. Le retour dans la ration des pondeuses crée un cycle calcium fermé, réduisant l'achat de coquillage broyé.",
    quantitesDetaillees:
      "Récupération de 8-10 g de coquille par œuf consommé. Pour 250 œufs/jour consommés par la famille/marché local : ~2 kg de coquilles brutes, soit ~1.5 kg après séchage/broyage.",
    ingredients: [
      { libelle: "Coquilles d'œufs", quantite: "selon disponibilité", unite: "g", commentaire: "Lavées et séchées 24h" },
    ],
    conditionsUtilisation: [
      "Lavage à l'eau claire pour retirer l'albumen",
      "Séchage soleil 24h ou four 100°C 30 min",
      "Broyage fin (1-3 mm) au pilon ou broyeur",
      "Stockage sec, max 1 mois",
    ],
    risquesEtPrecautions: [
      "Coquilles non séchées : moisissures, odeur",
      "Mélange tel quel avec aliment = picage cannibalisme possible (poules voyant les coquilles)",
      "Risque salmonelles si pas chauffées",
    ],
    hypothesesIA: [
      "Consommation régulière d'œufs sur la ferme ou retour des œufs invendus",
      "Logistique de récupération opérationnelle",
    ],
    informationsManquantes: [
      "Volume réel de coquilles disponibles par semaine",
      "Présence d'un broyeur sur la ferme",
    ],
    source: "Pratique paysanne avicole + Cobb Management Guide",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T11:00:00Z",
  },
  {
    id: "fic-017",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Drèche de distillation aromatiques → complément fourrage cabris",
    description:
      "Utilisation de la pulpe végétale post-distillation citronnelle/lippia comme appoint alimentaire pour cabris.",
    formulationIA:
      "Après distillation, la pulpe conserve une partie des fibres et un peu de protéines. Acceptable comme appoint dans la ration cabris (max 20% du volume), à condition d'être donnée fraîche ou correctement conservée.",
    quantitesDetaillees:
      "Maximum 1 kg de pulpe par cabri adulte / jour, en complément du fourvert (PAS en remplacement). Pour 30 cabris : 30 kg de pulpe maximum par jour.",
    ingredients: [
      { libelle: "Pulpe distillation tiède", quantite: "1", unite: "kg / cabri / j max" },
    ],
    conditionsUtilisation: [
      "Distribution dans les 24h après distillation",
      "Conservation max 48h en sac fermé à l'ombre",
      "Pulpe encore tiède acceptée par les cabris (palatable)",
      "Transition progressive sur 7 jours",
    ],
    risquesEtPrecautions: [
      "Pulpe fermentée = troubles digestifs (ballonnements, diarrhée)",
      "Goût citronné fort : refus possible au début",
      "PAS de chaleur résiduelle huile essentielle (irritation digestive)",
      "Surveiller selles 1ère semaine de transition",
    ],
    hypothesesIA: [
      "Distillation hebdomadaire de citronnelle/lippia",
      "Cabris à proximité de l'atelier distillation (logistique)",
    ],
    informationsManquantes: [
      "Tonnage de pulpe disponible par semaine",
      "Distance atelier distillation Makola ↔ enclos cabris Nanga",
    ],
    source: "Adapté de pratiques aromatiques tropicales (Madagascar, Comores)",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T11:30:00Z",
  },
  {
    id: "fic-018",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Effluents bacs BSF → fertilisation parcelles aromatiques",
    description:
      "Récupération du jus de fermentation au fond des bacs BSF pour irrigation fertilisante des aromatiques.",
    formulationIA:
      "Les bacs BSF produisent un effluent riche en azote et oligo-éléments. Récupéré par drainage de fond, dilué 1:10, c'est un excellent engrais liquide pour citronnelle et lippia.",
    quantitesDetaillees:
      "1 litre d'effluent dilué dans 10 litres d'eau, arrosage 1 fois par semaine par plant adulte. Pour 100 plants de citronnelle : 100 L d'effluent dilué / semaine.",
    conditionsUtilisation: [
      "Effluent récupéré par drain de fond, pas par décantation surface",
      "Dilution 1:10 obligatoire (sinon brûlure racinaire)",
      "Application le soir (évaporation moindre)",
      "Stockage effluent pur max 7 jours en bidon fermé",
    ],
    risquesEtPrecautions: [
      "Brûlure si non dilué",
      "Odeur forte si stockage prolongé (méthane)",
      "Charge bactérienne : éviter contact direct cultures consommables crues",
      "Vérifier substrat BSF source : pas de contamination par hydrocarbures, pesticides",
    ],
    hypothesesIA: [
      "Bacs BSF équipés de drain de fond",
      "Bidons de récupération disponibles",
      "Système d'arrosage par bidon ou arrosoir",
    ],
    informationsManquantes: [
      "Équipement actuel des bacs BSF (drain ou non)",
      "Analyse de l'effluent (N-P-K, charge bactérienne)",
    ],
    source: "CIRAD Hermetia + pratiques agroécologiques tropicales",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T12:00:00Z",
  },
  {
    id: "fic-019",
    filiere: "transversal",
    type: "recyclage",
    titre: "Branches taillées vergers → broyat de paillage in-situ",
    description:
      "Valorisation immédiate des branches d'élagage en paillis broyé déposé sous les arbres mêmes.",
    formulationIA:
      "Plutôt que brûler les branches (perte de carbone, pollution), broyage sur place et restitution sous l'arbre comme paillis. Conserve humidité, freine adventices, retourne matière organique.",
    quantitesDetaillees:
      "Couche 5-10 cm sur cercle d'1 m autour du tronc. Pour 100 avocatiers adultes taillés (~50 kg branches / arbre / an) : ~5 t de broyat par an, soit ~50 kg par arbre.",
    conditionsUtilisation: [
      "Broyage rapide après taille (max 7 jours)",
      "Branches saines uniquement (pas de pourridié, pas de fongiques)",
      "Granulométrie 1-5 cm idéale",
      "Tenir 15 cm d'écart entre paillis et tronc (éviter pourriture collet)",
    ],
    risquesEtPrecautions: [
      "Branches contaminées = propagation maladies racinaires",
      "Paillis trop épais empêche pluies fines de pénétrer",
      "Risque incendie en saison sèche si paillis très sec accumulé",
      "Acidification possible si essences à tanins (eucalyptus à éviter)",
    ],
    hypothesesIA: [
      "Broyeur à branches disponible (location ou achat collectif)",
      "Taille annuelle des vergers programmée",
    ],
    informationsManquantes: [
      "Disponibilité d'un broyeur (achat, location, prêt)",
      "Volume réel de branches taillées par campagne",
    ],
    source: "FAO Sustainable Orchard Management + INRAE agroforesterie",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T08:00:00Z",
  },
  {
    id: "fic-020",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Fumier cabris → fertilisation parcelles aromatiques",
    description:
      "Compostage du fumier d'enclos cabris pour fertilisation azotée des aromatiques (citronnelle, lippia).",
    formulationIA:
      "Le fumier de cabri (mélange déjections + litière) est moins riche que celui de volaille mais plus équilibré (N-P-K ~1.5-1-1.5). Excellent pour aromatiques exigeantes en azote.",
    quantitesDetaillees:
      "30 cabris produisent ~300 kg de fumier brut/mois. Après compostage 90 jours : ~150 kg de compost mûr/mois. Application : 2 kg de compost mûr / m² au démarrage, 0.5 kg / m² / mois en entretien.",
    ingredients: [
      { libelle: "Fumier cabri (mélange litière + déjections)", quantite: "70", unite: "%" },
      { libelle: "Matière sèche complémentaire (sciure, son)", quantite: "30", unite: "%" },
    ],
    conditionsUtilisation: [
      "Compostage 90 jours minimum, retournement mensuel",
      "T° pic 55-60°C visée (hygiénisation)",
      "Application avant ou pendant la phase de croissance",
    ],
    risquesEtPrecautions: [
      "Fumier frais brûle les jeunes plants",
      "Parasites cabris (strongles) peuvent survivre si compostage insuffisant",
      "Ne pas appliquer en saison des pluies (lessivage)",
    ],
    hypothesesIA: [
      "Enclos cabris avec litière paillée",
      "30 têtes adultes",
      "Saisonnalité 2 saisons (sèche / pluies)",
    ],
    informationsManquantes: [
      "Volume hebdomadaire de curage réel",
      "Présence d'une zone de compostage proche de l'enclos",
    ],
    source: "FAO Goat Manure Management + INERA Congo",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T08:30:00Z",
  },

  // ============================================================
  // RECETTES ALIMENTAIRES SUPPLÉMENTAIRES
  // ============================================================
  {
    id: "fic-021",
    filiere: "pisciculture-silure",
    type: "recette-alimentaire",
    titre: "Aliment silure grossissement maison (32% MAT)",
    description:
      "Formule pour silures de 100-800 g exploitant farine de poisson locale + matières végétales.",
    formulationIA:
      "Pour réduire le coût des granulés importés (850 FCFA/kg), formulation maison à partir de matières premières locales. Garde 32% MAT visé, granulé pressé séché.",
    ingredients: [
      { libelle: "Farine de poisson 60% MAT", quantite: "30", unite: "%" },
      { libelle: "Tourteau de soja 44% MAT", quantite: "25", unite: "%" },
      { libelle: "Farine de maïs", quantite: "25", unite: "%" },
      { libelle: "Son de blé fin", quantite: "15", unite: "%" },
      { libelle: "Huile de palme", quantite: "3", unite: "%", commentaire: "Énergie + flottabilité" },
      { libelle: "Prémix vitamines aquaculture", quantite: "2", unite: "%" },
    ],
    quantitesDetaillees:
      "100 kg de mélange = 30 kg farine poisson + 25 kg soja + 25 kg maïs + 15 kg son + 3 kg huile + 2 kg prémix. Pressage à 60°C, séchage 24h.",
    conditionsUtilisation: [
      "Mélange homogène à sec puis ajout liquides",
      "Pressage en granulés 4-6 mm (presse manuelle ou hachoir adapté)",
      "Séchage solaire sur claie 24-48h",
      "Stockage sac fermé, max 2 mois",
    ],
    risquesEtPrecautions: [
      "Farine de poisson rance : refus + intoxication",
      "Mycotoxines maïs : analyser ou rejeter si suspect",
      "Granulé qui coule (pas flottant) = perte (gaspillage + pollution étang)",
      "Sans prémix vitamines : carences à long terme",
    ],
    hypothesesIA: [
      "Disponibilité régulière farine de poisson locale (Pointe-Noire)",
      "Accès à un pressoir / hachoir / petit broyeur",
      "Capacité de séchage solaire ~ 50 kg/j",
    ],
    informationsManquantes: [
      "Type exact de farine de poisson local (côtière ou import ?)",
      "Coût total du mélange vs granulé importé",
      "Capacité réelle de production hebdomadaire",
    ],
    source: "FAO Aquaculture Feed Formulation 2018 + adaptations terrain Cameroun",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T09:00:00Z",
  },
  {
    id: "fic-022",
    filiere: "elevage-cabris",
    type: "recette-alimentaire",
    titre: "Bloc à lécher minéral maison cabris",
    description:
      "Bloc minéral et vitaminé en libre service pour combler carences en oligo-éléments.",
    formulationIA:
      "Les cabris en pâture présentent souvent carences en sodium, magnésium, oligo-éléments (cuivre, zinc, sélénium). Un bloc à lécher pose en libre service est la solution simple et économique.",
    ingredients: [
      { libelle: "Sel marin gros", quantite: "50", unite: "%" },
      { libelle: "Argile (kaolin ou montmorillonite)", quantite: "20", unite: "%" },
      { libelle: "Farine d'os calcinée", quantite: "15", unite: "%" },
      { libelle: "Prémix oligo-éléments cabris", quantite: "10", unite: "%", commentaire: "Indispensable" },
      { libelle: "Mélasse de canne", quantite: "5", unite: "%", commentaire: "Liant + appétence" },
    ],
    quantitesDetaillees:
      "Bloc de 2 kg pour 10 cabris pendant ~30 jours. Pour 30 cabris : 3 blocs / mois. Composition : 1 kg sel + 400 g argile + 300 g farine d'os + 200 g prémix + 100 g mélasse + eau (300 mL).",
    conditionsUtilisation: [
      "Mélange à sec puis ajout mélasse + eau jusqu'à pâte ferme",
      "Moulage en bloc dans seau ou moule plastique",
      "Séchage 7 jours à l'ombre, puis 24h au soleil",
      "Suspension à 1 m du sol pour éviter souillure",
    ],
    risquesEtPrecautions: [
      "Sans prémix oligo-éléments : effet réduit",
      "Argile non alimentaire = contamination",
      "Mouillé en saison des pluies : se délite",
      "Surconsommation rare mais possible : surveiller bloc usé en < 1 mois",
    ],
    hypothesesIA: [
      "Accès aux composants en quincaillerie agricole / pharmacie vétérinaire",
      "Espace de séchage protégé",
    ],
    informationsManquantes: [
      "Prix du prémix oligo-éléments local",
      "Type d'argile disponible",
    ],
    source: "FAO Mineral Lick Manufacturing + manuels élevage tropical",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T09:30:00Z",
  },
  {
    id: "fic-023",
    filiere: "volaille-pondeuse",
    type: "recette-alimentaire",
    titre: "Aliment pondeuse maison (17% MAT, calcium 3.8%)",
    description:
      "Formule maison pour poules pondeuses en phase de ponte, axée disponibilité locale.",
    formulationIA:
      "Aliment ponte avec calcium renforcé (3.8% minimum) pour coquille solide. Base maïs + soja + son, calcium par coquillage broyé.",
    ingredients: [
      { libelle: "Maïs concassé", quantite: "55", unite: "%" },
      { libelle: "Tourteau de soja 44% MAT", quantite: "20", unite: "%" },
      { libelle: "Son de blé", quantite: "10", unite: "%" },
      { libelle: "Coquillage broyé (ou coquilles d'œufs)", quantite: "9", unite: "%", commentaire: "Calcium" },
      { libelle: "Farine de poisson", quantite: "4", unite: "%" },
      { libelle: "Sel", quantite: "0.5", unite: "%" },
      { libelle: "Prémix vitamines / minéraux pondeuse", quantite: "1.5", unite: "%" },
    ],
    quantitesDetaillees:
      "Distribution 115 g par poule par jour. Pour 100 pondeuses : 11.5 kg/jour soit ~3.5 tonnes/an. Eau abondante (250 mL/poule/jour).",
    conditionsUtilisation: [
      "Lumière 16h/jour visée (lampe complémentaire si jours courts)",
      "Distribution en 2 repas : matin (60%) + après-midi (40%)",
      "Eau changée 2× par jour",
      "Mangeoires à hauteur du dos des poules",
    ],
    risquesEtPrecautions: [
      "Calcium insuffisant : coquille fine, casse, baisse production",
      "Excès calcium poulettes : retard ponte",
      "Maïs humide : mycotoxines = chute ponte",
      "Eau sale : salmonelle, baisse ponte",
    ],
    hypothesesIA: [
      "Disponibilité coquillage broyé ou retour coquilles d'œufs (cf. fic-016)",
      "Souche Isa Brown ou équivalente",
    ],
    informationsManquantes: [
      "Source coquillage (lagune, importation ?)",
      "Souche réelle élevée",
    ],
    source: "Isa Brown Management Guide 2021 + adaptation matières premières locales",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T10:00:00Z",
  },

  // ============================================================
  // PROTOCOLES SANITAIRES SUPPLÉMENTAIRES
  // ============================================================
  {
    id: "fic-024",
    filiere: "transversal",
    type: "protocole-sanitaire",
    titre: "Quarantaine systématique nouveaux animaux",
    description:
      "Protocole d'isolement et d'observation pour tout animal entrant sur la ferme, toutes filières.",
    formulationIA:
      "L'introduction d'animaux extérieurs est la 1ère cause d'introduction de maladies sur une ferme. Quarantaine en zone isolée 21 jours minimum avant intégration au troupeau / lot.",
    quantitesDetaillees:
      "Durée minimum : 21 jours (cabris, poulets). 14 jours pour alevins en bassin séparé. Distance minimum quarantaine ↔ animaux établis : 30 mètres.",
    conditionsUtilisation: [
      "Local ou enclos dédié, jamais utilisé en zone production",
      "Matériel (mangeoires, abreuvoirs, bottes) STRICTEMENT séparé",
      "Visite quarantaine en DERNIER chaque jour",
      "Lavage mains + désinfection bottes en sortant",
      "Observation quotidienne consignée par écrit",
    ],
    risquesEtPrecautions: [
      "Non respect = contamination de tout le troupeau",
      "Visiteurs : interdire ou changer tenues",
      "Animaux malades en quarantaine : isolement supplémentaire, vétérinaire",
      "Pendant quarantaine : déparasiter + vaccins obligatoires si manquants",
    ],
    hypothesesIA: [
      "Possibilité de réserver un local/enclos dédié",
      "Personnel formé à l'hygiène",
    ],
    informationsManquantes: [
      "Espace disponible pour quarantaine sur le site",
      "Fréquence d'introduction de nouveaux animaux",
    ],
    source: "OIE Code Sanitaire pour les Animaux Terrestres + FAO Biosécurité",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T14:00:00Z",
  },
  {
    id: "fic-025",
    filiere: "volaille-chair",
    type: "protocole-sanitaire",
    titre: "Désinfection complète poulailler entre deux lots",
    description:
      "Vide sanitaire et nettoyage approfondi entre deux bandes de poulets de chair.",
    formulationIA:
      "Le vide sanitaire entre deux lots casse les cycles parasitaires et infectieux. Indispensable pour éviter accumulation de pathogènes.",
    quantitesDetaillees:
      "Vide sanitaire minimum 14 jours. Désinfection : eau de javel 5% dilution 1:10 ou ammonium quaternaire selon notice. Surface totale poulailler : sol + murs + matériel.",
    conditionsUtilisation: [
      "Sortie totale du lot précédent (pas de retenir)",
      "Nettoyage à sec : balayage poussières / fientes",
      "Lavage haute pression eau + détergent",
      "Désinfection au pulvérisateur (sol + murs + plafond + matériel)",
      "Séchage complet 48-72h",
      "Repos 14 jours avant nouvelle bande",
    ],
    risquesEtPrecautions: [
      "Désinfectants non rincés = brûlure poussins",
      "Sans vide sanitaire : mortalité 1ère semaine x2-3",
      "Eau de javel sur surfaces métalliques : corrosion",
      "EPI obligatoire : gants, masque, lunettes",
    ],
    hypothesesIA: [
      "Bandes successives (pas d'élevage continu)",
      "Accès à pulvérisateur et nettoyeur haute pression",
    ],
    informationsManquantes: [
      "Cadence actuelle des bandes",
      "Équipement disponible (nettoyeur HP, pulvérisateur)",
    ],
    source: "Cobb Management Guide + FAO Biosécurité Volaille",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T15:00:00Z",
  },
  {
    id: "fic-026",
    filiere: "elevage-cabris",
    type: "protocole-sanitaire",
    titre: "Déparasitage semestriel cabris (strongles + douve)",
    description:
      "Traitement antiparasitaire systématique tous les 6 mois, ciblant strongles digestifs et douve hépatique.",
    formulationIA:
      "Le parasitisme digestif est la 1ère cause d'amaigrissement et de mortalité chronique chez les cabris en zone tropicale. Traitement systématique sur l'ensemble du troupeau, alternance des molécules pour éviter résistances.",
    quantitesDetaillees:
      "Saison sèche (mars) : Albendazole 10%, 1 mL pour 10 kg PV par voie orale. Saison pluies (septembre) : Ivermectine 1%, 0.2 mL pour 10 kg PV en sous-cutané. Pour 30 cabris adultes (~25 kg moyen) : 75 mL d'Albendazole ou 15 mL d'Ivermectine.",
    conditionsUtilisation: [
      "Pesée des animaux ou estimation visuelle si pas de balance",
      "Traitement à jeun de 12h (voie orale)",
      "Tenir le bouche fermée 30s après administration (voie orale)",
      "Renouveler 14 jours après pour les jeunes (<6 mois)",
      "Alterner Albendazole / Ivermectine pour éviter résistances",
    ],
    risquesEtPrecautions: [
      "Surdosage : intoxication (Ivermectine en particulier)",
      "Femelles gestantes : Albendazole DÉCONSEILLÉ au 1er tiers (risque tératogène)",
      "Délai d'attente lait : 14 jours Albendazole, 28 jours Ivermectine",
      "Stock vaccin = chaîne du froid",
      "Coprologie de contrôle 14 jours après si possible",
    ],
    hypothesesIA: [
      "Troupeau au pâturage (exposition forte)",
      "Accès produits chez vétérinaire / agro-pharmacie",
    ],
    informationsManquantes: [
      "Disponibilité Ivermectine en saison des pluies",
      "Possibilité de coprologie locale",
      "Historique résistance dans la zone",
    ],
    source: "FAO Goat Health Manual 2018 + OIE Parasitology",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-10T15:30:00Z",
  },

  // ============================================================
  // FERTILISATION
  // ============================================================
  {
    id: "fic-027",
    filiere: "verger-avocatier",
    type: "fertilisation",
    titre: "Fertilisation N-P-K saisonnière avocatiers adultes",
    description:
      "Plan de fertilisation annuel pour avocatiers adultes en production, équilibré azote-phosphore-potassium.",
    formulationIA:
      "L'avocatier adulte a des besoins forts en azote (croissance végétative) et potassium (qualité fruits). Apport fractionné en 3 fois pour limiter pertes par lessivage.",
    quantitesDetaillees:
      "Par arbre adulte / an : 800 g d'azote (N), 400 g de phosphore (P2O5), 1200 g de potassium (K2O). Soit ~5 kg de NPK 17-8-25 OU 25 kg de compost organique mûr + apport potassium séparé. Fractionnement : 40% début saison pluies, 30% mi-saison, 30% fin saison.",
    ingredients: [
      { libelle: "NPK 17-8-25 minéral", quantite: "5", unite: "kg / arbre / an" },
      { libelle: "OU Compost mûr (alternative organique)", quantite: "25", unite: "kg / arbre / an" },
      { libelle: "+ Cendres de bois (potassium)", quantite: "2", unite: "kg / arbre / an", commentaire: "Si voie organique" },
    ],
    conditionsUtilisation: [
      "Fractionnement obligatoire (3 apports)",
      "Application en couronne à 1 m du tronc",
      "Léger griffage en surface puis arrosage",
      "Compost mûr uniquement (frais = brûlure)",
    ],
    risquesEtPrecautions: [
      "Excès azote : poussée végétative au détriment des fruits",
      "Cendres fraîches : trop alcalines, à composter d'abord",
      "Apport unique : lessivage, pollution nappes",
      "Saison sèche sans arrosage : engrais non assimilable",
    ],
    hypothesesIA: [
      "Vergers en production (10+ ans)",
      "Saison pluies bien marquée (octobre-mai)",
      "Accès aux NPK ou compost organique",
    ],
    informationsManquantes: [
      "Analyse de sol (pH, taux MO, N-P-K disponible)",
      "Préférence biologique vs minérale",
      "Coût NPK actuel sur Pointe-Noire",
    ],
    source: "FAO Avocado Production Manual + INERA Congo",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T10:30:00Z",
  },
  {
    id: "fic-028",
    filiere: "aromatique-citronnelle",
    type: "fertilisation",
    titre: "Fertilisation azotée citronnelle après chaque coupe",
    description:
      "Apport azoté ciblé après chaque récolte de feuilles pour relancer la repousse.",
    formulationIA:
      "La citronnelle est très exigeante en azote pour produire des feuilles riches en huiles essentielles. Apport rapide après chaque coupe pour favoriser repousse vigoureuse.",
    quantitesDetaillees:
      "100 g d'urée (46% N) OU 500 g de compost cabris (cf. fic-020) par souche, dans les 3-5 jours après coupe. Pour 200 souches : 20 kg d'urée OU 100 kg de compost / coupe.",
    ingredients: [
      { libelle: "Urée 46% (option minérale)", quantite: "100", unite: "g / souche / coupe" },
      { libelle: "OU Compost cabris mûr (option organique)", quantite: "500", unite: "g / souche / coupe" },
    ],
    conditionsUtilisation: [
      "Apport dans les 3-5 jours après coupe",
      "Épandage en couronne à 20 cm de la souche",
      "Léger arrosage si saison sèche",
      "Alternance urée / compost recommandée (sols vivants)",
    ],
    risquesEtPrecautions: [
      "Urée au contact direct souche : brûlure",
      "Surdose : croissance végétative excessive, huile moins concentrée",
      "Compost frais : brûlure racines",
      "Effet < 14 jours en saison sèche sans arrosage",
    ],
    hypothesesIA: [
      "Récolte tous les 3-4 mois (4 coupes/an)",
      "200 souches en production",
      "Accès urée ou compost",
    ],
    informationsManquantes: [
      "Nombre exact de souches en production",
      "Pratique actuelle de fertilisation (si existante)",
      "Préférence organique vs minérale",
    ],
    source: "CIRAD Plantes aromatiques tropicales + observations terrain Madagascar",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T11:00:00Z",
  },

  // ============================================================
  // SEUILS TECHNIQUES SUPPLÉMENTAIRES
  // ============================================================
  {
    id: "fic-029",
    filiere: "bsf",
    type: "seuil-technique",
    titre: "Plage température bac BSF (25-32°C, alerte > 35°C)",
    description:
      "Température critique pour le développement des larves BSF, mortalité au-delà de 35°C.",
    formulationIA:
      "Les larves BSF se développent optimalement entre 25 et 32°C. Au-delà de 35°C, mortalité massive en quelques heures. Surveillance quotidienne nécessaire en saison chaude.",
    quantitesDetaillees:
      "Mesure quotidienne 12h-14h (heure la plus chaude). Plage acceptable : 25-32°C. Optimum : 28°C. Alerte si T° > 33°C, urgence si T° > 35°C. Solutions de refroidissement : ombrage 70%, brumisation, ventilation forcée.",
    conditionsUtilisation: [
      "Thermomètre planté à 5 cm de profondeur dans substrat",
      "Mesure aux heures les plus chaudes",
      "Capteurs continus possibles (à privilégier en saison chaude)",
      "Tenir registre quotidien",
    ],
    risquesEtPrecautions: [
      "T° > 35°C : mortalité 50% en 4h",
      "T° < 20°C : développement très lent, perte rentabilité",
      "Humidité substrat → impact T° (substrat sec chauffe plus)",
      "Bacs en plein soleil : à proscrire absolument",
    ],
    hypothesesIA: [
      "Bacs en local ombragé ou semi-ombragé",
      "Thermomètres disponibles",
    ],
    informationsManquantes: [
      "Configuration actuelle des bacs (ombrage, ventilation)",
      "T° relevées historiquement (canicule ?)",
    ],
    source: "CIRAD Hermetia 2019 + observations terrain élevages tropicaux",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-11T13:00:00Z",
  },
  {
    id: "fic-030",
    filiere: "volaille-chair",
    type: "seuil-technique",
    titre: "Densité maximale poulets de chair par phase",
    description:
      "Densités à respecter au sol selon l'âge pour éviter stress, picage, mortalité.",
    formulationIA:
      "La densité est l'un des paramètres les plus impactants sur la croissance, la mortalité et le bien-être. Trop élevée : stress, picage, perte performance. Respecter les paliers par âge.",
    quantitesDetaillees:
      "Démarrage J1-J10 : 20 oiseaux/m² (sur surface réduite chauffée). Croissance J11-J24 : 12 oiseaux/m². Finition J25-J42 : 8 oiseaux/m². Surface poulailler 100 m² : 800 poussins J1 ramenés à 800 oiseaux finition.",
    conditionsUtilisation: [
      "Phase démarrage sur 30% de la surface totale (radier chauffant)",
      "Extension progressive en croissance",
      "Surface totale dispo à la finition",
      "Ventilation adaptée densité",
    ],
    risquesEtPrecautions: [
      "Sur-densité = ammoniac (NH3 > 25 ppm), picage, mortalité",
      "Sous-densité = froid, perte chauffage, perte rentabilité",
      "Densité poids vif : ne jamais dépasser 30 kg/m² en finition",
      "Vérifier abreuvoirs (1 pour 80 oiseaux) et mangeoires (1 pour 50)",
    ],
    hypothesesIA: [
      "Surface poulailler connue et fixe",
      "Bandes successives (pas de continu)",
    ],
    informationsManquantes: [
      "Surface réelle des poulaillers Nanga",
      "Nombre actuel de têtes",
    ],
    source: "Cobb 500 Performance Guide 2022 + Code bien-être animal",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T11:30:00Z",
  },

  // ============================================================
  // TÂCHES GUIDÉES SUPPLÉMENTAIRES
  // ============================================================
  {
    id: "fic-031",
    filiere: "pisciculture-silure",
    type: "tache-guidee",
    titre: "Tâche guidée : prise de pH étang matin",
    description:
      "Procédure pas-à-pas pour mesurer le pH des étangs et déclencher l'alerte si hors plage.",
    formulationIA:
      "Cette tâche guidée traduit le seuil pH validé en geste opérationnel quotidien. Mesure courte, fiable, photo de la bandelette obligatoire pour traçabilité.",
    quantitesDetaillees:
      "1 bandelette par étang, mesure entre 6h30 et 7h30. Photo de la bandelette à côté du tableau de couleurs. Si pH < 6.5 ou > 8.5 → bouton PROBLÈME immédiat.",
    conditionsUtilisation: [
      "Avant tout apport d'aliment du matin",
      "Pas sous orage en cours",
      "Bandelettes stockées au sec, à l'abri lumière",
      "Toujours noter sur registre papier en plus de l'app (sauvegarde)",
    ],
    risquesEtPrecautions: [
      "Bandelette périmée = lecture fausse (vérifier date)",
      "Eau souillée par boue = lecture surestimée",
      "Si pH < 6.0 : prévenir responsable IMMÉDIATEMENT",
      "Mortalité en cours = ne pas attendre l'app, appel direct",
    ],
    hypothesesIA: [
      "Bandelettes pH 5-10 disponibles à la ferme",
      "Ouvrier équipé d'un smartphone pour photo",
      "Tableau de couleurs visible et propre",
    ],
    informationsManquantes: [],
    source: "Dérivée de fic-012 (seuil pH étang validé)",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T12:00:00Z",
  },
  {
    id: "fic-032",
    filiere: "elevage-cabris",
    type: "tache-guidee",
    titre: "Tâche guidée : observation matin du troupeau cabris",
    description:
      "Tour d'observation systématique au lever, repérage des cabris en alerte sanitaire.",
    formulationIA:
      "Une observation matinale courte mais systématique permet de détecter les cabris à problème AVANT qu'ils ne s'aggravent. 4 critères simples à vérifier sur chaque animal.",
    quantitesDetaillees:
      "Durée totale : 15-20 min pour 30 cabris. Pour chaque animal vérifier : (1) tient debout normalement, (2) mange / rumine, (3) selles formées (pas liquides), (4) œil clair, pas de jetage. Si un seul critère défaillant → bouton PROBLÈME avec photo.",
    conditionsUtilisation: [
      "Avant le 1er repas du matin",
      "Cabris encore au repos = comportement naturel observable",
      "Lumière suffisante (pas avant 6h)",
      "Carnet d'observation papier en complément",
    ],
    risquesEtPrecautions: [
      "Cabris qui se cache = signe alerte forte",
      "Selles liquides = quarantaine immédiate",
      "Toux + jetage purulent = vétérinaire (suspicion pasteurellose)",
      "Boiterie + sabot chaud = isoler + nettoyer sabot",
    ],
    hypothesesIA: [
      "Tous les cabris identifiés (boucle, tatouage ou peinture)",
      "Ouvrier formé à reconnaître les 4 critères",
    ],
    informationsManquantes: [
      "Système d'identification individuelle existant",
      "Niveau de formation actuel des ouvriers",
    ],
    source: "Dérivée de fic-005 (protocoles santé cabris) + bonnes pratiques",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T12:30:00Z",
  },

  // ============================================================
  // ALERTES (déclencheurs basés sur des règles)
  // ============================================================
  {
    id: "fic-033",
    filiere: "transversal",
    type: "alerte",
    titre: "Alerte canicule (> 35°C 3 jours consécutifs)",
    description:
      "Procédure d'urgence à activer si la température extérieure dépasse 35°C pendant 3 jours consécutifs.",
    formulationIA:
      "La canicule (>35°C plusieurs jours) impacte TOUTES les filières : surchauffe bacs BSF, stress thermique volailles (chute ponte), risque hyperthermie cabris, évaporation étangs accélérée. Plan d'action coordonné nécessaire.",
    quantitesDetaillees:
      "Déclenchement : T° max > 35°C constatée 3 jours d'affilée. Actions immédiates : (1) BSF — vérifier ombrage, brumiser substrat, (2) volailles — eau fraîche renouvelée 3×/jour, ventilation max, densité réduite si possible, (3) cabris — accès permanent ombre + eau, ralentir activité, (4) étangs — surveiller oxygène dissous matin et soir, aérer si possible.",
    conditionsUtilisation: [
      "Vérifier prévisions météo (Météo Congo, WhatsApp météo locale)",
      "Préparer 24h à l'avance si annoncée",
      "Briefing responsable + ouvriers la veille",
      "Suspendre vaccinations pendant la canicule",
    ],
    risquesEtPrecautions: [
      "BSF : T° substrat > 40°C = mortalité massive 6h",
      "Volaille : chute ponte 30-50%",
      "Cabris : déshydratation rapide jeunes animaux",
      "Étangs : mortalité poissons par anoxie",
      "Personnel ouvrier : risque coup de chaleur, eau + ombre obligatoires",
    ],
    hypothesesIA: [
      "Accès aux prévisions météo locales",
      "Source d'eau abondante disponible",
      "Ventilateurs / brumisateurs installés",
    ],
    informationsManquantes: [
      "Fréquence historique de canicules sur la zone Nanga / Makola",
      "Équipement actuel de ventilation / brumisation",
    ],
    source: "FAO Heat Stress Management + retours d'expérience canicules tropicales",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T13:00:00Z",
  },
  {
    id: "fic-034",
    filiere: "transversal",
    type: "alerte",
    titre: "Alerte stock vaccin < 7 jours de couverture",
    description:
      "Déclenchement automatique d'une alerte de réapprovisionnement quand un stock de vaccin couvre moins de 7 jours d'opération.",
    formulationIA:
      "Une rupture de stock vaccinal sur la chaîne de production = vaccins manqués = mortalité ultérieure. Anticipation 7 jours minimum, idéalement 14, pour gérer délais logistiques pharmacie vétérinaire.",
    quantitesDetaillees:
      "Calcul : (stock actuel en doses) / (doses prévues à utiliser par jour). Si résultat < 7 jours → alerte. Exemple : 50 doses Newcastle, 20 doses/jour prévues → 2.5 jours restants → ALERTE. Idéalement : commande effectuée à 14 jours restants.",
    conditionsUtilisation: [
      "Inventaire mensuel des stocks vaccins",
      "Calendrier prévisionnel des vaccinations à 30 jours",
      "Carnet de commandes pharmacie vétérinaire à jour",
    ],
    risquesEtPrecautions: [
      "Rupture en saison des pluies : délai livraison rallongé",
      "Vaccins périmés = inefficaces (vérifier dates lots)",
      "Chaîne du froid à anticiper (glacière propre prête)",
      "Commande sans anticipation = surcoût urgence",
    ],
    hypothesesIA: [
      "Inventaire de stocks tenu (papier ou app)",
      "Calendrier vaccinal calé (cf. fic-005, fic-006)",
      "Relation établie avec pharmacie vétérinaire",
    ],
    informationsManquantes: [
      "Tenue actuelle des stocks (papier, app, rien ?)",
      "Délai moyen de livraison pharmacie Pointe-Noire",
    ],
    source: "OIE Vaccine Stock Management + bonnes pratiques santé animale",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-12T13:30:00Z",
  },

  // ============================================================
  // CARPE — filière encore peu couverte
  // ============================================================
  {
    id: "fic-035",
    filiere: "pisciculture-carpe",
    type: "ration",
    titre: "Ration grossissement carpe (Cyprinus carpio)",
    description:
      "Apport quotidien pour carpes en phase de grossissement (30 g → 1.2 kg).",
    formulationIA:
      "La carpe est omnivore mais valorise mieux un aliment équilibré 25-30% MAT. Distribution fractionnée en 2 repas pour limiter le gaspillage.",
    ingredients: [
      { libelle: "Granulé flottant 28% MAT (3-4 mm)", quantite: "2-3", unite: "% du poids vif / jour", commentaire: "Adapter selon T° eau" },
    ],
    quantitesDetaillees:
      "Étang 200 m² avec ~100 carpes (~120 kg biomasse) : 2.5-3.5 kg de granulé par jour répartis matin et après-midi. Réduire de 50% si T° eau < 22°C.",
    conditionsUtilisation: [
      "Distribution sur point de nourrissage fixe (faciliter l'observation)",
      "Stop distribution si refus visible > 15 min",
      "Réduire de 30% en début de matinée brumeuse",
    ],
    risquesEtPrecautions: [
      "Suralimentation = pollution étang + désoxygénation",
      "Aliment qui coule rapidement = gaspillage",
      "Vérifier flottabilité (granulé pour carpe différent du silure)",
    ],
    hypothesesIA: [
      "Élevage en étang (pas en bassin recirculé)",
      "Densité 50 kg/m³ maximum",
    ],
    informationsManquantes: [
      "Effectif réel de carpes par étang",
      "Disponibilité granulé carpe local (souvent importé)",
    ],
    source: "FAO Aquaculture Series — Cyprinus carpio",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T08:00:00Z",
  },
  {
    id: "fic-036",
    filiere: "pisciculture-carpe",
    type: "seuil-technique",
    titre: "Oxygène dissous étang carpes",
    description:
      "L'oxygène dissous est plus critique pour la carpe que pour le silure. Plage cible 4-6 mg/L.",
    formulationIA:
      "La carpe nécessite plus d'oxygène que le silure (qui peut respirer en surface). Mesure matin et soir, aération obligatoire en saison chaude.",
    quantitesDetaillees:
      "Mesure 6h et 17h. Plage cible 4-6 mg/L. Alerte si < 3 mg/L (mortalité possible). Si < 2 mg/L : aération immédiate ou renouvellement 30% eau.",
    conditionsUtilisation: [
      "Oxymètre étalonné mensuellement",
      "Mesure à 30 cm sous la surface",
      "Toujours en parallèle d'une mesure de température",
    ],
    risquesEtPrecautions: [
      "O2 < 2 mg/L à 6h : mortalité possible en 1h",
      "Bloom algal nocturne peut faire chuter O2",
      "Pluies fortes apportent O2 mais aussi sédiments",
    ],
    hypothesesIA: ["Oxymètre disponible (achat ~80 000 FCFA)"],
    informationsManquantes: ["Présence ou non d'un oxymètre actuel", "Système d'aération existant"],
    source: "FAO Aquaculture Series — Cyprinus",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T08:30:00Z",
  },

  // ============================================================
  // LIPPIA — filière encore peu couverte
  // ============================================================
  {
    id: "fic-037",
    filiere: "aromatique-lippia",
    type: "calendrier",
    titre: "Calendrier récolte lippia (verveine citronnée)",
    description:
      "3 coupes par an, à éviter pendant la floraison (mars-avril) pour préserver les huiles essentielles.",
    formulationIA:
      "La lippia est récoltée 3 fois par an au stade végétatif. Coupe avant floraison sinon dégradation aromatique. Rendement moyen 8 kg/souche/an.",
    quantitesDetaillees:
      "Coupes : avril (avant floraison), juillet (mi-saison), octobre (avant saison sèche dure). Hauteur de coupe : 15-20 cm au-dessus du sol. Pour 100 souches : ~800 kg/an de feuilles fraîches → ~80 L huile essentielle.",
    conditionsUtilisation: [
      "Coupe le matin, avant 10h (huiles encore concentrées)",
      "Cisaille ou faucille propre",
      "Distillation dans les 6 heures suivant la coupe",
    ],
    risquesEtPrecautions: [
      "Coupe pendant floraison : qualité huile réduite",
      "Coupe trop basse : la plante repart mal",
      "Récolte sous pluie : eau dans la distillerie",
    ],
    hypothesesIA: ["Souches lippia établies depuis 2 ans minimum"],
    informationsManquantes: ["Nombre de souches en production", "Capacité distillation hebdomadaire"],
    source: "CIRAD Plantes aromatiques tropicales + INRAE huiles essentielles",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T09:00:00Z",
  },

  // ============================================================
  // CALENDRIERS DE CYCLE COMPLET
  // ============================================================
  {
    id: "fic-038",
    filiere: "volaille-chair",
    type: "calendrier",
    titre: "Cycle complet bande poulet chair (42 jours)",
    description:
      "Calendrier de A à Z d'une bande : mise en place → abattage. Repères clés à anticiper.",
    formulationIA:
      "Une bande de poulets de chair tient en 42 jours. Anticipation des achats (poussins, aliments, vaccins) + planification abattage et commercialisation indispensable.",
    quantitesDetaillees:
      "J-14 : vide sanitaire poulailler. J0 : mise en place poussins. J1 : Marek (couvoir). J7 : Newcastle+Bronchite. J14 : Gumboro. J21 : Newcastle rappel + densité 12/m². J24 : transition aliment finition. J35 : densité 8/m². J42 : vide alimentaire 8h puis abattage. J42+1 : redémarrage vide sanitaire.",
    conditionsUtilisation: [
      "Commande poussins J-21 (couvoir Brazzaville)",
      "Commande aliment démarrage + croissance + finition à l'avance",
      "Préparation chaîne d'abattage J-7",
      "Acheteurs / marchés prévenus J-14",
    ],
    risquesEtPrecautions: [
      "Sans vide sanitaire : mortalité bande suivante x2",
      "Aliment manquant 1 jour = perte de croissance irrattrapable",
      "Vaccin oublié = mortalité ultérieure",
      "Pas de débouché commercial = perte poids à >42j",
    ],
    hypothesesIA: ["Bandes successives (pas continu)", "Capacité poulailler ~500-1000 oiseaux"],
    informationsManquantes: [
      "Capacité réelle des poulaillers Nanga",
      "Cadence souhaitée par le propriétaire (combien de bandes / an)",
    ],
    source: "Cobb 500 Performance Guide 2022",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T09:30:00Z",
  },
  {
    id: "fic-039",
    filiere: "pisciculture-silure",
    type: "calendrier",
    titre: "Cycle complet production silures (6 mois)",
    description:
      "De l'alevin 5 g à la taille marchande 800 g : 180 jours, jalons clés et taux de croissance attendus.",
    formulationIA:
      "Cycle silure 6 mois découpé en alevinage (M1), pré-grossissement (M2-M3), grossissement (M4-M6). Chaque phase a sa ration, sa densité et son risque dominant.",
    quantitesDetaillees:
      "M1 (alevinage) : 5g → 30g, distribution 4-6×/jour, mortalité acceptable 10%. M2-M3 : 30g → 200g, 3 distributions/j. M4-M6 : 200g → 800g, 2 distributions/j. Croissance attendue : 4.4 g/jour en moyenne. Indice de consommation cible 1.5.",
    conditionsUtilisation: [
      "Tri par taille tous les 30 jours pour éviter cannibalisme",
      "Renouvellement 10% eau / semaine min",
      "Bassin propre à chaque transition de phase",
    ],
    risquesEtPrecautions: [
      "Cannibalisme silure forte si tri négligé",
      "Densité > 80 kg/m³ = stress, croissance ralentie",
      "Une phase loupée se rattrape difficilement",
    ],
    hypothesesIA: ["Élevage Clarias gariepinus", "Approvisionnement alevins fiable"],
    informationsManquantes: ["Source alevins (fournisseur, prix)", "Volume des bassins disponibles"],
    source: "FAO Aquaculture Series — Clarias",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T10:00:00Z",
  },
  {
    id: "fic-040",
    filiere: "elevage-cabris",
    type: "calendrier",
    titre: "Cycle production cabri vif marchand (9 mois)",
    description:
      "De la naissance à la vente : 270 jours, jalons sevrage / vaccination / engraissement / commercialisation.",
    formulationIA:
      "Cycle long mais peu intensif. Anticipation des saillies pour étaler les ventes (fêtes religieuses = pics de prix +30%).",
    quantitesDetaillees:
      "M0 : naissance 2 kg. M0-M1 : lait exclusif. M1-M4 : sevrage progressif, ration sevrage. M1 + M2 : vaccination entérotoxémie + rappel. M3 : vaccin PPR. M4 : vaccin pasteurellose. M4-M9 : engraissement, ration croissance. M9 : 18 kg vif → vente. Reproductrices gardées au-delà.",
    conditionsUtilisation: [
      "Suivi individuel (boucle d'identification)",
      "Pesées trimestrielles",
      "Saillies planifiées pour caler ventes sur fêtes (Noël, Pâques, Tabaski)",
    ],
    risquesEtPrecautions: [
      "Mortalité sevrage : phase critique (transition alimentation)",
      "Vente trop précoce : poids faible, prix bas",
      "Vente tardive : surcoût alimentation > marge",
    ],
    hypothesesIA: ["Race locale ~25 kg adulte", "Boucles d'identification disponibles"],
    informationsManquantes: ["Taille troupeau reproducteur", "Calendrier prévisionnel des ventes"],
    source: "FAO Goat Production Handbook 2017",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T10:30:00Z",
  },

  // ============================================================
  // SYNERGIE ÉTANG ↔ BSF
  // ============================================================
  {
    id: "fic-041",
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Sédiments étang silures → enrichissement bacs BSF",
    description:
      "Valorisation des sédiments riches en matière organique pour augmenter la productivité BSF.",
    formulationIA:
      "Les sédiments d'étang silures contiennent beaucoup d'azote et matière organique partiellement digérée — idéal comme amendement au substrat BSF. Boucle vertueuse aqua → insectes → volailles.",
    quantitesDetaillees:
      "Incorporation à 15% du substrat BSF total. Pour un bac de 100 kg : 15 kg de sédiments séchés. Récupération lors de la vidange étangs (1-2× par an).",
    conditionsUtilisation: [
      "Sédiments séchés au soleil 7 jours minimum (réduction charge bactérienne)",
      "Mélange homogène au substrat principal avant chargement larves",
      "Pas de larves directement sur les sédiments concentrés",
    ],
    risquesEtPrecautions: [
      "Charge bactérienne élevée si sédiments non séchés",
      "Présence éventuelle de résidus d'aliments dégradés (vérifier ammoniaque)",
      "Ne pas utiliser si étang traité aux antibiotiques récemment",
    ],
    hypothesesIA: [
      "Vidanges étang programmées",
      "Capacité de séchage solaire disponible",
    ],
    informationsManquantes: [
      "Fréquence des vidanges (saisonnière ?)",
      "Existence d'une aire de séchage à l'abri de la pluie",
    ],
    source: "Pratiques aquaculture intégrée + CIRAD",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T11:00:00Z",
  },

  // ============================================================
  // TÂCHES GUIDÉES — pour brancher ensuite côté ouvrier
  // ============================================================
  {
    id: "fic-042",
    filiere: "volaille-chair",
    type: "tache-guidee",
    titre: "Tâche guidée : vaccination Newcastle J7 poulets",
    description:
      "Procédure simple pour l'ouvrier — vaccination oculo-nasale au 7e jour.",
    formulationIA:
      "Vaccin appliqué directement dans l'œil ou la narine du poussin. Geste rapide une fois maîtrisé, mais demande douceur.",
    quantitesDetaillees:
      "1 goutte par poussin, œil ou narine. Pour 500 poussins : 1 flacon de 500 doses + diluant fourni. Préparation extemporanée (max 2h après reconstitution).",
    conditionsUtilisation: [
      "Tôt le matin, fraîcheur (avant 8h)",
      "2 personnes : l'une attrape, l'autre vaccine",
      "Lumière du jour suffisante",
    ],
    risquesEtPrecautions: [
      "Goutte renversée à côté de l'œil = vaccin perdu",
      "Si poussin abattu, le mettre de côté pour le responsable (PROBLÈME)",
      "Sans gants : se laver les mains au savon avant et après",
    ],
    hypothesesIA: [
      "Flacon de vaccin conservé au frais",
      "Compte exact des poussins du lot connu",
    ],
    informationsManquantes: [],
    source: "Dérivée de fic-006 (calendrier vaccinal poulet)",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T11:30:00Z",
  },
  {
    id: "fic-043",
    filiere: "bsf",
    type: "tache-guidee",
    titre: "Tâche guidée : récolte des larves BSF matures",
    description:
      "Procédure pour récolter les larves prêtes au stade pupe (jour 14 environ).",
    formulationIA:
      "Au stade pré-pupe, les larves changent de couleur (du blanc au brun) et essayent de quitter le substrat. C'est le moment idéal de récolte.",
    quantitesDetaillees:
      "Bac de 100 kg substrat = ~10 kg de larves récoltables. Tamiser le substrat avec un tamis 5 mm. Récupérer les larves sur la bâche. Peser. Photo du tamis plein.",
    conditionsUtilisation: [
      "Récolte vers le 14e jour après dépôt des œufs/œufs",
      "Le matin, plus frais",
      "Hangar fermé pour éviter envol éventuel adultes",
    ],
    risquesEtPrecautions: [
      "Larves abîmées (écrasement) : pertes",
      "Récolte trop tardive : larves transformées en pupes immobiles",
      "Substrat restant : composter, ne pas remettre tel quel",
    ],
    hypothesesIA: [
      "Bac BSF géré en lot (date de chargement notée)",
      "Tamis et bâche disponibles",
    ],
    informationsManquantes: [],
    source: "Dérivée de fic-004 (substrat BSF validé)",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T12:00:00Z",
  },
  {
    id: "fic-044",
    filiere: "verger-avocatier",
    type: "tache-guidee",
    titre: "Tâche guidée : taille hivernale avocatier adulte",
    description:
      "Procédure de taille annuelle après récolte, pour aération du houppier et qualité fruits suivants.",
    formulationIA:
      "La taille permet à la lumière de passer dans l'arbre et aux maladies de moins s'installer. Couper les branches mortes, les branches qui se croisent, et les gourmands.",
    quantitesDetaillees:
      "1 arbre adulte = 30 à 90 minutes de taille. Réduction maximum 25% du volume du houppier. Pour 100 arbres : 5 à 15 jours de travail à 2 personnes.",
    conditionsUtilisation: [
      "Après la dernière récolte de la saison",
      "Pas en pleine chaleur (risque dessèchement coupes)",
      "Sécateur propre + désinfecté entre 2 arbres (eau de javel diluée)",
    ],
    risquesEtPrecautions: [
      "Sécateur sale = propage maladies (anthracnose, phytophtora)",
      "Coupes près du tronc : badigeon cicatrisant",
      "Branches au sol = broyat de paillage (fic-019 validée)",
      "Ne pas tailler plus de 25% (épuisement de l'arbre)",
    ],
    hypothesesIA: [
      "Sécateurs et scies propres disponibles",
      "Eau de javel pour désinfection",
    ],
    informationsManquantes: [],
    source: "Dérivée de FAO Avocado Production Manual + INRAE arboriculture",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
    dateProposition: "2026-05-13T12:30:00Z",
  },
];
