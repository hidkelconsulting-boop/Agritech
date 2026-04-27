import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "node:fs/promises";
import path from "node:path";
import { env } from "./env.js";

function isS3Configured(): boolean {
  return !!(env.s3Bucket && env.s3AccessKeyId && env.s3SecretAccessKey);
}

function createS3Client(): S3Client {
  const config: ConstructorParameters<typeof S3Client>[0] = {
    region: env.s3Region,
    credentials: {
      accessKeyId: env.s3AccessKeyId,
      secretAccessKey: env.s3SecretAccessKey,
    },
  };
  if (env.s3Endpoint) {
    config.endpoint = env.s3Endpoint;
    // Required for path-style access (Cloudflare R2)
    config.forcePathStyle = false;
  }
  return new S3Client(config);
}

/**
 * Upload a file buffer to S3/R2 or local disk (dev fallback).
 * Returns the storage key (S3) or relative path (local).
 */
export async function uploadFile(
  buffer: Buffer,
  key: string,
  mimeType: string
): Promise<{ key: string; url: string; storageType: "s3" | "local" }> {
  if (isS3Configured()) {
    const client = createS3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: env.s3Bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      })
    );
    // If using R2 with public bucket, build URL; otherwise use presigned
    const url = env.s3Endpoint
      ? `${env.s3Endpoint}/${env.s3Bucket}/${key}`
      : `https://${env.s3Bucket}.s3.${env.s3Region}.amazonaws.com/${key}`;
    return { key, url, storageType: "s3" };
  }

  // Local disk fallback (dev / test)
  const uploadsDir = env.uploadsDir;
  await fs.mkdir(uploadsDir, { recursive: true });
  const localPath = path.join(uploadsDir, key.replace(/\//g, "_"));
  await fs.writeFile(localPath, buffer);
  return { key: localPath, url: `/uploads/${key.replace(/\//g, "_")}`, storageType: "local" };
}

/**
 * Generate a presigned URL for an S3 object (valid for `expiresIn` seconds).
 * Returns the key itself if using local storage.
 */
export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  if (!isS3Configured()) {
    // Local: key is already the served path
    return key;
  }
  const client = createS3Client();
  const command = new GetObjectCommand({ Bucket: env.s3Bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn });
}

export { isS3Configured };
