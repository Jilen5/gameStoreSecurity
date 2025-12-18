import crypto from "crypto";

const ENC_ALGO = "aes-256-gcm";
const ENC_KEY = process.env.DATA_ENC_KEY || ""; // 32 bytes (base64 or raw)

function getKeyBuffer(key) {
  if (!key) throw new Error("DATA_ENC_KEY not set");

  const buf = /^[A-Za-z0-9+/=]+$/.test(key)
    ? Buffer.from(key, "base64")
    : Buffer.from(key, "utf8");

  if (buf.length !== 32) {
    throw new Error("DATA_ENC_KEY must be exactly 32 bytes");
  }
  return buf;
}

export function encrypt(text) {
  if (!text) return text;
  const key = getKeyBuffer(ENC_KEY);
  if (key.length !== 32) throw new Error("DATA_ENC_KEY must be 32 bytes (base64 or raw)");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENC_ALGO, key, iv);
  const encrypted = Buffer.concat([cipher.update(String(text), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(enc) {
  if (!enc) return enc;
  const key = getKeyBuffer(ENC_KEY);
  if (key.length !== 32) throw new Error("DATA_ENC_KEY must be 32 bytes (base64 or raw)");
  const data = Buffer.from(enc, "base64");
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const encrypted = data.slice(28);
  const decipher = crypto.createDecipheriv(ENC_ALGO, key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}

export function hashEmail(email) {
  return crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");
}

export default { encrypt, decrypt };
