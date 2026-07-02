import { NextResponse } from "next/server";
import { isDatabaseAvailable } from "@/lib/db";
import { getAllCities, createCity } from "@/lib/models";
import { mockCities } from "@/lib/mock-data";
import { z } from "zod";

const translationSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000),
});

const createCitySchema = z.object({
  id: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  objectCount: z.number().int().min(0).default(0),
  translations: z.object({
    ru: translationSchema,
    en: translationSchema,
    fr: translationSchema,
  }),
});

export async function GET() {
  const dbAvailable = await isDatabaseAvailable();

  if (dbAvailable) {
    try {
      const cities = await getAllCities();
      return NextResponse.json(cities);
    } catch (error) {
      console.error("Ошибка получения городов:", error);
      return NextResponse.json(
        { error: "Ошибка получения данных из DynamoDB" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(mockCities);
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
    const parsed = createCitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const city = await createCity(parsed.data);
    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания города:", error);
    return NextResponse.json(
      { error: "Ошибка создания города" },
      { status: 500 }
    );
  }
}
