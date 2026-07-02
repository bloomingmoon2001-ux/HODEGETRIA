import { NextRequest, NextResponse } from "next/server";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getAllSpaceObjects,
  getSpaceObjectsByCity,
  createSpaceObject,
} from "@/lib/models";
import { mockSpaceObjects } from "@/lib/mock-data";
import { z } from "zod";

const objectTranslationSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().max(500),
  longDescription: z.string().max(10000),
  workingHours: z.string().max(500),
  transport: z.string().max(500),
  ticketPrices: z.string().max(500),
});

const createObjectSchema = z.object({
  id: z.string().min(1).max(100),
  citySlug: z.string().min(1).max(100),
  imageUrl: z.string().max(500).optional().or(z.literal("")),
  audioUrl: z.string().url().optional().or(z.literal("")),
  translations: z.object({
    ru: objectTranslationSchema,
    en: objectTranslationSchema,
    fr: objectTranslationSchema,
  }),
});

export async function GET(request: NextRequest) {
  const dbAvailable = await isDatabaseAvailable();
  const { searchParams } = new URL(request.url);
  const citySlug = searchParams.get("citySlug");

  if (dbAvailable) {
    try {
      let objects;
      if (citySlug) {
        objects = await getSpaceObjectsByCity(citySlug);
      } else {
        objects = await getAllSpaceObjects();
      }
      return NextResponse.json(objects);
    } catch (error) {
      console.error("Ошибка получения объектов:", error);
      return NextResponse.json(
        { error: "Ошибка получения данных из DynamoDB" },
        { status: 500 }
      );
    }
  }

  let result = mockSpaceObjects;
  if (citySlug) {
    result = result.filter((o) => o.citySlug === citySlug);
  }
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна в статическом режиме" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = createObjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = {
      ...parsed.data,
      imageUrl: parsed.data.imageUrl || undefined,
      audioUrl: parsed.data.audioUrl || undefined,
    };

    const obj = await createSpaceObject(data);
    return NextResponse.json(obj, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания объекта:", error);
    return NextResponse.json(
      { error: "Ошибка создания объекта" },
      { status: 500 }
    );
  }
}
