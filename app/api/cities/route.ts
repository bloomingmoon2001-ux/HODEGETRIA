import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createCity, listCities } from "@/lib/catalog";
import { createCitySchema, formatValidationIssues } from "@/lib/validation";

export async function GET() {
  try {
    return NextResponse.json(await listCities());
  } catch (error) {
    console.error("Ошибка получения городов:", error);
    return NextResponse.json({ error: "Не удалось загрузить города" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const parsed = createCitySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Некорректные данные: ${formatValidationIssues(parsed.error)}` },
      { status: 400 }
    );
  }

  try {
    await createCity(parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания города:", error);
    return NextResponse.json({ error: "Не удалось создать город" }, { status: 500 });
  }
}
