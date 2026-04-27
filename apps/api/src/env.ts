import "dotenv/config";

function must(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  apiPort: Number(process.env.API_PORT ?? 4000),
  jwtSecret: must("JWT_SECRET", "change-me-in-production"),
  databaseUrl: must("DATABASE_URL", "file:./dev.db"),
  appEnv: process.env.APP_ENV ?? "development",
  redisUrl: process.env.REDIS_URL ?? "",
  uploadsDir: process.env.UPLOADS_DIR ?? "./uploads",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  webAppUrl: process.env.WEB_APP_URL ?? "http://localhost:3000",
  s3Bucket: process.env.S3_BUCKET ?? "",
  s3Region: process.env.S3_REGION ?? "auto",
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  aiTestForceSeverity: process.env.AI_TEST_FORCE_SEVERITY ?? "",
};
