import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./db.js";

export const rolePermissions: Record<string, string[]> = {
  ADMIN: [
    "farm.read",
    "farm.manage",
    "task.read",
    "task.create",
    "task.update",
    "incident.read",
    "incident.create",
    "incident.update",
    "media.upload",
    "member.manage",
    "billing.manage",
    "referentiel.read",
    "referentiel.propose",
    "referentiel.valider",
  ],
  MANAGER: [
    "farm.read",
    "task.read",
    "task.create",
    "task.update",
    "incident.read",
    "incident.create",
    "incident.update",
    "media.upload",
    "referentiel.read",
    "referentiel.propose",
  ],
  WORKER: [
    "farm.read",
    "task.read",
    "task.update",
    "incident.read",
    "incident.create",
    "media.upload",
    "referentiel.read",
  ],
};

export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ error: "Unauthorized" });
  }
}

export async function requireFarmMembership(request: FastifyRequest, reply: FastifyReply) {
  await requireAuth(request, reply);
  if (reply.sent) {
    return;
  }

  const farmId = (request.params as { farmId?: string }).farmId;
  if (!farmId) {
    return reply.status(400).send({ error: "farmId is required" });
  }

  const userId = (request.user as { sub: string }).sub;
  const membership = await prisma.membership.findUnique({
    where: {
      userId_farmId: {
        userId,
        farmId,
      },
    },
  });

  if (!membership) {
    return reply.status(403).send({ error: "Forbidden" });
  }

  (request as FastifyRequest & { membershipRole?: string }).membershipRole = membership.role;
}

export function hasPermission(role: string, permission: string): boolean {
  const permissions = rolePermissions[role] ?? [];
  return permissions.includes(permission);
}

export async function requirePermission(request: FastifyRequest, reply: FastifyReply, permission: string) {
  await requireFarmMembership(request, reply);
  if (reply.sent) {
    return;
  }

  const role = (request as FastifyRequest & { membershipRole?: string }).membershipRole;
  if (!role || !hasPermission(role, permission)) {
    return reply.status(403).send({ error: `Missing permission: ${permission}` });
  }
}
