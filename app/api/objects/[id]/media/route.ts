import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { addObjectMedia } from "@/lib/catalog";
import { mediaKindSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

const MEDIA_RULES = {
  photo: {
    types: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    } as Record<string, string>,
    maxBytes: 10 * 1024 * 1024,
    label: "JPEG, PNG или WebP до 10 МБ",
  },
  audio: {
    types: {
      "audio/mpeg": "mp3",
      "audio/mp3": "mp3",
      "audio/wav": "wav",
      "audio/ogg": "ogg",
      "audio/webm": "webm",
      "audio/mp4": "m4a",
      "audio/x-m4a": "m4a",
    } as Record<string, string>,
    maxBytes: 50 * 1024 * 1024,
    label: "MP3, WAV, OGG, WebM или M4A до 50 МБ",
  },
} as const;

export async function POST(request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const { id } = await params;
  const formData = await request.formData().catch(() => null);
  const kindParsed = mediaKindSchema.safeParse(formData?.get("kind"));
  if (!formData || !kindParsed.success) {
    return NextResponse.json({ error: "Не указан тип файла" }, { status: 400 });
  }

  const kind = kindParsed.data;
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }

  const rules = MEDIA_RULES[kind];
  const extension = rules.types[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: `Недопустимый тип файла. Разрешены: ${rules.label}` },
      { status: 400 }
    );
  }
  if (file.size > rules.maxBytes) {
    return NextResponse.json(
      { error: `Файл слишком большой. Разрешены: ${rules.label}` },
      { status: 400 }
    );
  }

  try {
    const media = await addObjectMedia({
      objectId: id,
      kind,
      body: new Uint8Array(await file.arrayBuffer()),
      contentType: file.type,
      extension,
    });
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error("Ошибка загрузки файла:", error);
    return NextResponse.json({ error: "Не удалось загрузить файл" }, { status: 500 });
  }
}
