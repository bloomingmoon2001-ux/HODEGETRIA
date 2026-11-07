import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createObject, listObjects } from "@/lib/catalog";
import { createObjectSchema, formatValidationIssues } from "@/lib/validation";

export async function GET(request: NextRequest) {
  const citySlug = new URL(request.url).searchParams.get("citySlug") ?? undefined;
  try {
    return NextResponse.json(await listObjects(citySlug));
  } catch (error) {
    console.error("Ошибка получения объектов:", error);
    return NextResponse.json({ error: "Не удалось загрузить объекты" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const parsed = createObjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Некорректные данные: ${formatValidationIssues(parsed.error)}` },
      { status: 400 }
    );
  }

  try {
    await createObject({
      id: parsed.data.id,
      citySlug: parsed.data.citySlug,
      slug: parsed.data.translations.ru.slug,
      translations: parsed.data.translations,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания объекта:", error);
    return NextResponse.json({ error: "Не удалось создать объект" }, { status: 500 });
  }
}
