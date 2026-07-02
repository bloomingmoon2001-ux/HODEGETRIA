import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function verifyPassword(password: string): {
  success: boolean;
  error?: string;
} {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return { success: false, error: "Admin password is not configured" };
  }
  if (password !== adminPassword) {
    return { success: false, error: "Invalid password" };
  }
  return { success: true };
}
