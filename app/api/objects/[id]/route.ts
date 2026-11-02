import { NextRequest, NextResponse } from "next/server";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getSpaceObjectById,
  updateSpaceObject,
  deleteSpaceObject,
} from "@/lib/models";
import { mockSpaceObjects } from "@/lib/mock-data";
import { updateObjectSchema, formatValidationIssues } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const obj = await getSpaceObjectById(id);
      if (!obj) {
        return NextResponse.json(
          { error: "Объект не найден" },
          { status: 404 }
        );
      }
      return NextResponse.json(obj);
    } catch (error) {
      console.error("Ошибка получения объекта:", error);
      return NextResponse.json(
        { error: "Ошибка получения данных из DynamoDB" },
        { status: 500 }
      );
    }
  }

  const obj = mockSpaceObjects.find((o) => o.id === id) ?? null;
  if (!obj) {
    return NextResponse.json({ error: "Объект не найден" }, { status: 404 });
  }
  return NextResponse.json(obj);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна в статическом режиме" },
      { status: 503 }
    );
  }

  try {
    const existing = await getSpaceObjectById(id);
    if (!existing) {
      return NextResponse.json({ error: "Объект не найден" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateObjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: `Некорректные данные: ${formatValidationIssues(parsed.error)}`,
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updateData: Parameters<typeof updateSpaceObject>[1] = {};
    if (parsed.data.citySlug !== undefined)
      updateData.citySlug = parsed.data.citySlug;
    if (parsed.data.imageUrl !== undefined)
      updateData.imageUrl = parsed.data.imageUrl || undefined;
    if (parsed.data.audioUrl !== undefined)
      updateData.audioUrl = parsed.data.audioUrl || undefined;
    if (parsed.data.translations !== undefined) {
      updateData.translations = {
        ru: existing.translations.ru,
        en: existing.translations.en,
        fr: existing.translations.fr,
        ...parsed.data.translations,
      };
    }

    const updated = await updateSpaceObject(id, updateData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Ошибка обновления объекта:", error);
    return NextResponse.json(
      { error: "Ошибка обновления объекта" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна в статическом режиме" },
      { status: 503 }
    );
  }

  try {
    const existing = await getSpaceObjectById(id);
    if (!existing) {
      return NextResponse.json({ error: "Объект не найден" }, { status: 404 });
    }

    await deleteSpaceObject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка удаления объекта:", error);
    return NextResponse.json(
      { error: "Ошибка удаления объекта" },
      { status: 500 }
    );
  }
}
