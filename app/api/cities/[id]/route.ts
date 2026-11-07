import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteCity, updateCity } from "@/lib/catalog";
import { formatValidationIssues, updateCitySchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const parsed = updateCitySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: `Некорректные данные: ${formatValidationIssues(parsed.error)}` },
      { status: 400 }
    );
  }

  const { id } = await params;
  try {
    await updateCity(id, parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка обновления города:", error);
    return NextResponse.json({ error: "Не удалось обновить город" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await deleteCity(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("violates foreign key")) {
      return NextResponse.json(
        { error: "Сначала удалите или перенесите объекты этого города" },
        { status: 409 }
      );
    }
    console.error("Ошибка удаления города:", error);
    return NextResponse.json({ error: "Не удалось удалить город" }, { status: 500 });
  }
}
