# Agritech SaaS

Plateforme SaaS multi-tenant pour operations agricoles (pisciculture, volaille, insectes, arboriculture) avec une architecture scalable basee sur:

- Web app: Next.js (apps/web)
- API: Fastify + Prisma (apps/api)
- Base locale de dev: SQLite (evolutive vers PostgreSQL)

## Demarrage rapide

1. Installer les dependances

npm install

Option infrastructure scalable (PostgreSQL + Redis + pgAdmin)

npm run infra:up

Puis copier .env.infra.example vers apps/api/.env et racine .env si besoin.

2. Generer la base Prisma et appliquer la migration initiale

npm run db:migrate

3. Creer le dossier upload local (preuves photo)

mkdir -p apps/api/uploads

4. Ajouter des donnees de demo

npm run db:seed

5. Lancer web + api

npm run dev

Mode complet (api + worker + web)

npm run dev:full

- Web: http://localhost:3000
- API: http://localhost:4000/health
- Metrics Prometheus: http://localhost:4000/metrics

## Comptes demo

- Email: admin@agritech.local
- Password: ChangeMe123!

## API deja disponible

- POST /auth/register
- POST /auth/login
- GET /farms
- GET /farms/:farmId/dashboard
- GET /farms/:farmId/tasks
- POST /farms/:farmId/tasks
- PATCH /farms/:farmId/tasks/:taskId/status
- GET /farms/:farmId/incidents
- POST /farms/:farmId/incidents
- PATCH /farms/:farmId/incidents/:incidentId/status
- POST /farms/:farmId/media
- POST /farms/:farmId/members
- GET /permissions/self/:farmId
- GET /admin/organizations
- POST /admin/organizations/:organizationId/subscription

## Notes scalabilite

- Architecture stateless cote API.
- Isolation multi-tenant via memberships.
- RBAC extensible (ADMIN, MANAGER, WORKER).
- Rate limiting global (Fastify).
- Audit logs persistes en base.
- Queue Redis/BullMQ prete (active si REDIS_URL est renseigne).
- Passage a PostgreSQL recommande pour production.

## Interface web

- /login : connexion securisee (cookie HTTP-only)
- /register : bootstrap d'un tenant (organisation + ferme + abonnement)
- /app : cockpit operationnel (taches, incidents, workflow, preuve photo)
- /admin : panel Super Admin (organisations + abonnements)

## Variables optionnelles (API)

- APP_ENV=development
- REDIS_URL=
- UPLOADS_DIR=./uploads

## Reinitialiser une base de demo

- npm run db:reset
- npm run db:migrate
- npm run db:seed
