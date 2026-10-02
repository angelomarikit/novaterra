import { cookies } from "next/headers";

export const LOCAL_ADMIN_COOKIE = "novaterra_admin_session";

export function getLocalAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@novaterra.local",
    password: process.env.ADMIN_PASSWORD || "Novaterra@2026",
  };
}

export function createLocalAdminToken(email: string) {
  // Lightweight signed token for local/dev CMS access
  const secret = process.env.ADMIN_SESSION_SECRET || "novaterra-local-cms";
  const payload = Buffer.from(
    JSON.stringify({ email, ts: Date.now() }),
  ).toString("base64url");
  const sig = Buffer.from(`${payload}.${secret}`).toString("base64url").slice(0, 24);
  return `${payload}.${sig}`;
}

export function verifyLocalAdminToken(token?: string | null) {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const secret = process.env.ADMIN_SESSION_SECRET || "novaterra-local-cms";
  const expected = Buffer.from(`${payload}.${secret}`)
    .toString("base64url")
    .slice(0, 24);
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email: string;
      ts: number;
    };
    // 7-day session
    if (Date.now() - data.ts > 7 * 24 * 60 * 60 * 1000) return null;
    return data.email;
  } catch {
    return null;
  }
}

export async function getLocalAdminEmail() {
  const jar = await cookies();
  return verifyLocalAdminToken(jar.get(LOCAL_ADMIN_COOKIE)?.value);
}
