import { Redis } from "ioredis";
import { env } from "./env.js";

export function createRedisConnection() {
  if (!env.redisUrl) {
    return null;
  }

  return new Redis(env.redisUrl, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  });
}
