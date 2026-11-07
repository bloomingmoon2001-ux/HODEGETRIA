import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { deleteObjectMedia } from "@/lib/catalog";

type RouteContext = { params: Promise<{ id: string; mediaId: string }> };

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Требуется вход в админку" }, { status: 401 });
  }

  const { mediaId } = await params;
  try {
    await deleteObjectMedia(mediaId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Ошибка удаления файла:", error);
    return NextResponse.json({ error: "Не удалось удалить файл" }, { status: 500 });
  }
}
