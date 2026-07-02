import { NextRequest, NextResponse } from "next/server";
import { isDatabaseAvailable } from "@/lib/db";
import { getCityById, updateCity, deleteCity } from "@/lib/models";
import { mockCities } from "@/lib/mock-data";
import { z } from "zod";

const translationSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
});

const updateCitySchema = z.object({
  slug: z.string().min(1).max(100).optional(),
  objectCount: z.number().int().min(0).optional(),
  translations: z
    .object({
      ru: translationSchema.optional(),
      en: translationSchema.optional(),
      fr: translationSchema.optional(),
    })
    .optional(),
});

async function getDbCity(id: string) {
  const dbAvailable = await isDatabaseAvailable();
  if (dbAvailable) {
    try {
      return await getCityById(id);
    } catch {
      return null;
    }
  }
  return mockCities.find((c) => c.id === id) ?? null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const city = await getCityById(id);
      if (!city) {
        return NextResponse.json({ error: "Город не найден" }, { status: 404 });
      }
      return NextResponse.json(city);
    } catch (error) {
      console.error("Ошибка получения города:", error);
      return NextResponse.json(
        { error: "Ошибка получения данных из DynamoDB" },
        { status: 500 }
      );
    }
  }

  const city = getDbCity(id);
  if (!city) {
    return NextResponse.json({ error: "Город не найден" }, { status: 404 });
  }
  return NextResponse.json(city);
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
    const existing = await getCityById(id);
    if (!existing) {
      return NextResponse.json({ error: "Город не найден" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateCitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updateData: Parameters<typeof updateCity>[1] = {};
    if (parsed.data.slug !== undefined) updateData.slug = parsed.data.slug;
    if (parsed.data.objectCount !== undefined)
      updateData.objectCount = parsed.data.objectCount;
    if (parsed.data.translations !== undefined) {
      updateData.translations = {
        ru: existing.translations.ru,
        en: existing.translations.en,
        fr: existing.translations.fr,
        ...parsed.data.translations,
      };
    }

    const updated = await updateCity(id, updateData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Ошибка обновления города:", error);
    return NextResponse.json(
      { error: "Ошибка обновления города" },
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
    const existing = await getCityById(id);
    if (!existing) {
      return NextResponse.json({ error: "Город не найден" }, { status: 404 });
    }

    await deleteCity(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка удаления города:", error);
    return NextResponse.json(
      { error: "Ошибка удаления города" },
      { status: 500 }
    );
  }
}
