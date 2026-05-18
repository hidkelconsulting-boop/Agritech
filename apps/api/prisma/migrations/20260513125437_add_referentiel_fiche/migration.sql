-- CreateTable
CREATE TABLE "ReferentielFiche" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "filiere" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "formulationIA" TEXT NOT NULL,
    "ingredients" JSONB,
    "quantitesDetaillees" TEXT,
    "conditionsUtilisation" JSONB NOT NULL,
    "risquesEtPrecautions" JSONB NOT NULL,
    "hypothesesIA" JSONB NOT NULL,
    "informationsManquantes" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'suggestion_ia',
    "validePar" TEXT,
    "dateValidation" TIMESTAMP(3),
    "justificationValidation" TEXT,
    "commentaireExpert" TEXT,
    "raisonRejet" TEXT,
    "testSurPetiteZone" BOOLEAN NOT NULL DEFAULT false,
    "visibleOuvrier" BOOLEAN NOT NULL DEFAULT false,
    "visibleResponsable" BOOLEAN NOT NULL DEFAULT false,
    "visibleProprietaire" BOOLEAN NOT NULL DEFAULT true,
    "dateProposition" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferentielFiche_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReferentielFiche_farmId_statut_idx" ON "ReferentielFiche"("farmId", "statut");

-- CreateIndex
CREATE INDEX "ReferentielFiche_farmId_type_idx" ON "ReferentielFiche"("farmId", "type");

-- CreateIndex
CREATE INDEX "ReferentielFiche_farmId_filiere_idx" ON "ReferentielFiche"("farmId", "filiere");

-- AddForeignKey
ALTER TABLE "ReferentielFiche" ADD CONSTRAINT "ReferentielFiche_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
