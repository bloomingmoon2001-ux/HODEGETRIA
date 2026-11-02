import { NextRequest, NextResponse } from "next/server";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getAllSpaceObjects,
  getSpaceObjectsByCity,
  createSpaceObject,
} from "@/lib/models";
import { mockSpaceObjects } from "@/lib/mock-data";
import { createObjectSchema, formatValidationIssues } from "@/lib/validation";

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
        {
          error: `Некорректные данные: ${formatValidationIssues(parsed.error)}`,
          details: parsed.error.flatten(),
        },
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
