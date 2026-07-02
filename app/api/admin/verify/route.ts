import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword, createSession } from "@/lib/auth";

const verifySchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  const parsed = verifySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const result = verifyPassword(parsed.data.password);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
