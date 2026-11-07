import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteObject, updateObject } from "@/lib/catalog";
import { formatValidationIssues, updateObjectSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const parsed = updateObjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Некорректные данные: ${formatValidationIssues(parsed.error)}` },
      { status: 400 }
    );
  }

  const { id } = await params;
  try {
    const translations = parsed.data.translations;
    await updateObject(id, {
      citySlug: parsed.data.citySlug,
      translations,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка обновления объекта:", error);
    return NextResponse.json({ error: "Не удалось обновить объект" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteObject(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка удаления объекта:", error);
    return NextResponse.json({ error: "Не удалось удалить объект" }, { status: 500 });
  }
}
