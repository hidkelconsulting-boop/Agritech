import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@agritech.local";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existing) {
    console.log("Seed already applied.");
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

  console.log("Seed completed.");
  console.log("Admin login: admin@agritech.local / ChangeMe123!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
