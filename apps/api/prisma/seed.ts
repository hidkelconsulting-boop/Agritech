import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const FICHES_INITIALES = [
  {
    filiere: "elevage-cabris",
    type: "protocole-sanitaire",
    titre: "Vaccination entérotoxémie cabri jeune",
    description: "Primovaccination Clostridium perfringens à 1 mois, rappel à 2 mois.",
    formulationIA:
      "L'entérotoxémie est une cause majeure de mortalité des cabris jeunes. Vaccination très efficace si protocole respecté.",
    quantitesDetaillees:
      "2 mL par cabri, voie sous-cutanée. Rappel obligatoire 4 semaines plus tard. Rappel annuel.",
    conditionsUtilisation: [
      "Cabri en bonne santé (pas de fièvre, pas de diarrhée)",
      "Conservation vaccin chaîne du froid 2-8°C",
      "Aiguille stérile (changer à chaque animal idéalement)",
    ],
    risquesEtPrecautions: [
      "Choc anaphylactique rare mais possible — adrénaline d'urgence à portée",
      "Vaccin congelé = inactif (ne jamais congeler)",
      "Tenir registre par animal",
    ],
    hypothesesIA: [
      "Cabris identifiables individuellement",
      "Vaccin disponible chez vétérinaire local",
    ],
    informationsManquantes: ["Fournisseur vaccin sur la zone", "État chaîne du froid à la ferme"],
    source: "FAO Goat Health Manual 2018 + OIE",
    statut: "valide",
    validePar: "Aimé",
    dateValidation: new Date("2026-04-10T09:00:00Z"),
    justificationValidation:
      "Protocole standard mondial. Notre cabinet vétérinaire de Pointe-Noire fournit le vaccin et assure la chaîne du froid. Appliqué depuis 2023.",
    visibleOuvrier: true,
    visibleResponsable: true,
    visibleProprietaire: true,
  },
  {
    filiere: "elevage-cabris",
    type: "tache-guidee",
    titre: "Tâche guidée : nourrissage matin cabris en croissance",
    description: "Procédure pas-à-pas adaptée à un ouvrier de terrain.",
    formulationIA:
      "Cette tâche guidée traduit la ration validée en consigne opérationnelle simple.",
    quantitesDetaillees:
      "Pour 30 cabris en croissance : 2 paniers de fourrage vert (≈60 kg) + 1 mesure de concentré (≈11 kg) + remplir l'auge à sel.",
    conditionsUtilisation: [
      "Matin avant 8h",
      "Bouger les mangeoires si humides",
      "Vérifier propreté abreuvoir avant remplissage",
    ],
    risquesEtPrecautions: [
      "Si un cabri ne mange pas → PROBLÈME",
      "Selles liquides observées → PROBLÈME",
      "Fourrage moisi → ne pas donner, PROBLÈME",
    ],
    hypothesesIA: ["Ouvrier dispose de la mesure concentré (seau gradué)"],
    informationsManquantes: [],
    source: "Dérivée de la ration matin cabris",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  },
  {
    filiere: "pisciculture-silure",
    type: "tache-guidee",
    titre: "Tâche guidée : prise de pH étang matin",
    description: "Procédure pour mesurer le pH des étangs et déclencher l'alerte si hors plage.",
    formulationIA:
      "Mesure courte, fiable, photo de la bandelette obligatoire pour traçabilité.",
    quantitesDetaillees:
      "1 bandelette par étang, entre 6h30 et 7h30. Photo à côté du tableau de couleurs. Si pH < 6.5 ou > 8.5 → PROBLÈME.",
    conditionsUtilisation: [
      "Avant tout apport d'aliment",
      "Pas sous orage en cours",
      "Bandelettes stockées au sec",
    ],
    risquesEtPrecautions: [
      "Bandelette périmée = lecture fausse",
      "Si pH < 6.0 : prévenir responsable IMMÉDIATEMENT",
    ],
    hypothesesIA: ["Bandelettes pH 5-10 disponibles", "Ouvrier équipé d'un smartphone"],
    informationsManquantes: [],
    source: "Dérivée du seuil pH étang validé",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  },
  {
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Fientes de poules → compost pour vergers",
    description: "Valorisation des fientes pour fertilisation des avocatiers et manguiers.",
    formulationIA:
      "Les fientes sont un excellent fertilisant azoté mais doivent être compostées avant épandage.",
    quantitesDetaillees:
      "5 kg de compost mûr par arbre adulte, 2 fois par an. Pour 30 poules : ~4.5 kg/jour à composter 90 jours.",
    conditionsUtilisation: [
      "Compostage 90 jours minimum sur dalle imperméable",
      "Retournement mensuel",
      "Distance min 50 m de toute eau",
    ],
    risquesEtPrecautions: [
      "Excès d'azote = brûlure racinaire",
      "Salmonelles si appliqué frais",
      "Jamais sur fruits à hauteur de main",
    ],
    hypothesesIA: ["Cheptel poules ~30 oiseaux", "Disponibilité paille/résidus secs"],
    informationsManquantes: [
      "Composition exacte des fientes",
      "Distance réelle poulailler ↔ vergers",
    ],
    source: "FAO Soil & Water Bureau",
    statut: "a_valider",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  },
  {
    filiere: "transversal",
    type: "synergie-filieres",
    titre: "Larves BSF séchées → complément protéique volailles",
    description:
      "Utilisation des larves de mouches soldates comme source protéique (40-45% MAT).",
    formulationIA:
      "Les larves BSF sont une source protéique de haute qualité, déjà autorisée dans plusieurs pays.",
    quantitesDetaillees:
      "Maximum 10% de la ration totale. Pour 500 poulets finition : ~7.5 kg/jour de larves séchées.",
    conditionsUtilisation: [
      "Blanchiment 5 min eau bouillante OBLIGATOIRE",
      "Séchage solaire 48 h ou four 60°C",
      "Larves élevées sur substrat végétal uniquement",
    ],
    risquesEtPrecautions: [
      "Larves crues = risque salmonelles",
      "Larves élevées sur déjections mammifères INTERDITES",
      "Conservation max 30j au sec",
    ],
    hypothesesIA: ["Production BSF stable", "Capacité de séchage solaire"],
    informationsManquantes: ["Substrat actuel des bacs BSF", "Coût équivalent farine poisson"],
    source: "CIRAD Hermetia illucens 2019 + EFSA 2015",
    statut: "suggestion_ia",
    visibleOuvrier: false,
    visibleResponsable: false,
    visibleProprietaire: true,
  },
];

async function seedReferentiel(farmId: string) {
  // Idempotent : ne pas dupliquer si déjà seedé
  const existingCount = await prisma.referentielFiche.count({ where: { farmId } });
  if (existingCount >= FICHES_INITIALES.length) {
    console.log(`Référentiel déjà seedé (${existingCount} fiches)`);
    return;
  }

  for (const fiche of FICHES_INITIALES) {
    await prisma.referentielFiche.create({
      data: {
        farmId,
        filiere: fiche.filiere,
        type: fiche.type,
        titre: fiche.titre,
        description: fiche.description,
        formulationIA: fiche.formulationIA,
        quantitesDetaillees: fiche.quantitesDetaillees,
        conditionsUtilisation: fiche.conditionsUtilisation,
        risquesEtPrecautions: fiche.risquesEtPrecautions,
        hypothesesIA: fiche.hypothesesIA,
        informationsManquantes: fiche.informationsManquantes,
        source: fiche.source,
        statut: fiche.statut,
        validePar: fiche.validePar,
        dateValidation: fiche.dateValidation,
        justificationValidation: fiche.justificationValidation,
        visibleOuvrier: fiche.visibleOuvrier,
        visibleResponsable: fiche.visibleResponsable,
        visibleProprietaire: fiche.visibleProprietaire,
      },
    });
  }
  console.log(`Référentiel : ${FICHES_INITIALES.length} fiches initiales chargées sur farm ${farmId}`);
}

async function ensureUserWithMembership(opts: {
  email: string;
  fullName: string;
  role: "ADMIN" | "MANAGER" | "WORKER";
  farmId: string;
  organizationId: string;
  passwordHash: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: opts.email } });
  if (existing) {
    // Vérifier qu'il a la membership
    const m = await prisma.membership.findUnique({
      where: { userId_farmId: { userId: existing.id, farmId: opts.farmId } },
    });
    if (!m) {
      await prisma.membership.create({
        data: { userId: existing.id, farmId: opts.farmId, role: opts.role },
      });
    }
    return existing;
  }
  const user = await prisma.user.create({
    data: {
      email: opts.email,
      passwordHash: opts.passwordHash,
      fullName: opts.fullName,
      role: opts.role,
      orgMemberships: { create: { organizationId: opts.organizationId, role: opts.role } },
    },
  });
  await prisma.membership.create({
    data: { userId: user.id, farmId: opts.farmId, role: opts.role },
  });
  return user;
}

async function main() {
  const adminEmail = "admin@agritech.local";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existing) {
    const pilote = await prisma.farm.findFirst({ where: { slug: "ferme-pilote-nanga" } });
    if (pilote) {
      const org = await prisma.organization.findFirst({ where: { slug: "nanga-org" } });
      if (org) {
        const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
        await ensureUserWithMembership({
          email: "patron@agritech.local",
          fullName: "Aimé Patron",
          role: "ADMIN",
          farmId: pilote.id,
          organizationId: org.id,
          passwordHash,
        });
        await ensureUserWithMembership({
          email: "responsable@agritech.local",
          fullName: "Marie Responsable",
          role: "MANAGER",
          farmId: pilote.id,
          organizationId: org.id,
          passwordHash,
        });
        await ensureUserWithMembership({
          email: "ouvrier@agritech.local",
          fullName: "Christelle Ouvrière",
          role: "WORKER",
          farmId: pilote.id,
          organizationId: org.id,
          passwordHash,
        });
        console.log("Comptes profils (patron, responsable, ouvrier) garantis.");
      }
      await seedReferentiel(pilote.id);
    }
    console.log("Seed déjà appliqué (comptes profils + référentiel mis à jour).");
    return;
  }

  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const organization = await prisma.organization.create({
    data: {
      slug: "nanga-org",
      name: "Nanga Operations",
      subscriptions: {
        create: {
          tier: "PRO",
          status: "ACTIVE",
        },
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      fullName: "Platform Admin",
      role: "ADMIN",
      orgMemberships: {
        create: {
          organizationId: organization.id,
          role: "ADMIN",
        },
      },
    },
  });

  const farm = await prisma.farm.create({
    data: {
      slug: "ferme-pilote-nanga",
      name: "Ferme Pilote Nanga",
      location: "Nanga, Congo",
      organizationId: organization.id,
    },
  });

  await prisma.membership.create({
    data: {
      userId: admin.id,
      farmId: farm.id,
      role: "ADMIN",
    },
  });

  const zone = await prisma.productionZone.create({
    data: {
      farmId: farm.id,
      name: "Etang 1",
      zoneType: "pisciculture",
    },
  });

  await prisma.task.createMany({
    data: [
      {
        farmId: farm.id,
        zoneId: zone.id,
        title: "Controle oxygene bassin matin",
        priority: "high",
        createdByUserId: admin.id,
        assignedToUserId: admin.id,
      },
      {
        farmId: farm.id,
        zoneId: zone.id,
        title: "Verification nourrissage silures",
        createdByUserId: admin.id,
      },
    ],
  });

  await prisma.incident.create({
    data: {
      farmId: farm.id,
      zoneId: zone.id,
      title: "Mortalite anormale sur bassin",
      severity: "high",
      status: "open",
      description: "Observation de mortalite au-dessus du seuil habituel.",
      reportedByUserId: admin.id,
    },
  });

  // Créer aussi les comptes profils utilisateur
  await ensureUserWithMembership({
    email: "patron@agritech.local",
    fullName: "Aimé Patron",
    role: "ADMIN",
    farmId: farm.id,
    organizationId: organization.id,
    passwordHash,
  });
  await ensureUserWithMembership({
    email: "responsable@agritech.local",
    fullName: "Marie Responsable",
    role: "MANAGER",
    farmId: farm.id,
    organizationId: organization.id,
    passwordHash,
  });
  await ensureUserWithMembership({
    email: "ouvrier@agritech.local",
    fullName: "Christelle Ouvrière",
    role: "WORKER",
    farmId: farm.id,
    organizationId: organization.id,
    passwordHash,
  });

  await seedReferentiel(farm.id);

  console.log("Seed completed.");
  console.log("Comptes de connexion (tous mot de passe : ChangeMe123!) :");
  console.log("  - admin@agritech.local (ADMIN plateforme)");
  console.log("  - patron@agritech.local (Propriétaire — /exploitant)");
  console.log("  - responsable@agritech.local (Responsable — /responsable)");
  console.log("  - ouvrier@agritech.local (Ouvrier — /mobile)");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
