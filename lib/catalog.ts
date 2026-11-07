import type { Locale } from "./i18n";
import { CATALOG_BUCKET, getSupabaseAdmin } from "./supabase";

export interface CityTranslation {
  name: string;
  description: string;
}

export interface CityItem {
  id: string;
  slug: string;
  objectCount: number;
  translations: Record<Locale, CityTranslation>;
}

export interface SpaceObjectTranslation {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  workingHours: string;
  transport: string;
  ticketPrices: string;
}

export interface MediaItem {
  id: string;
  kind: "photo" | "audio";
  url: string;
  position: number;
}

export interface SpaceObjectItem {
  id: string;
  citySlug: string;
  translations: Record<Locale, SpaceObjectTranslation>;
  photos: MediaItem[];
  audios: MediaItem[];
}

interface CityRow {
  id: string;
  slug: string;
  translations: Record<Locale, CityTranslation>;
}

interface MediaRow {
  id: string;
  kind: "photo" | "audio";
  url: string;
  storage_path: string;
  position: number;
}

interface ObjectRow {
  id: string;
  city_slug: string;
  translations: Record<Locale, SpaceObjectTranslation>;
  object_media: MediaRow[];
}

const OBJECT_SELECT = "id, city_slug, translations, object_media(id, kind, url, storage_path, position)";

function toMediaItem(row: MediaRow): MediaItem {
  return { id: row.id, kind: row.kind, url: row.url, position: row.position };
}

function toObjectItem(row: ObjectRow): SpaceObjectItem {
  const media = [...(row.object_media ?? [])].sort((a, b) => a.position - b.position);
  return {
    id: row.id,
    citySlug: row.city_slug,
    translations: row.translations,
    photos: media.filter((m) => m.kind === "photo").map(toMediaItem),
    audios: media.filter((m) => m.kind === "audio").map(toMediaItem),
  };
}

function assertNoError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

export async function listCities(): Promise<CityItem[]> {
  const supabase = getSupabaseAdmin();
  const [citiesRes, objectsRes] = await Promise.all([
    supabase.from("cities").select("id, slug, translations").order("slug"),
    supabase.from("space_objects").select("city_slug"),
  ]);
  assertNoError(citiesRes.error);
  assertNoError(objectsRes.error);

  const counts = new Map<string, number>();
  for (const row of objectsRes.data ?? []) {
    counts.set(row.city_slug, (counts.get(row.city_slug) ?? 0) + 1);
  }

  return ((citiesRes.data ?? []) as CityRow[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    translations: row.translations,
    objectCount: counts.get(row.slug) ?? 0,
  }));
}

export async function getCityById(id: string): Promise<CityRow | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("cities")
    .select("id, slug, translations")
    .eq("id", id)
    .maybeSingle();
  assertNoError(error);
  return (data as CityRow | null) ?? null;
}

export async function createCity(data: {
  id: string;
  slug: string;
  translations: Record<Locale, CityTranslation>;
}): Promise<void> {
  const { error } = await getSupabaseAdmin().from("cities").insert(data);
  assertNoError(error);
}

export async function updateCity(
  id: string,
  data: { slug: string; translations: Record<Locale, CityTranslation> }
): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from("cities")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  assertNoError(error);
}

export async function deleteCity(id: string): Promise<void> {
  const { error } = await getSupabaseAdmin().from("cities").delete().eq("id", id);
  assertNoError(error);
}

export async function listObjects(citySlug?: string): Promise<SpaceObjectItem[]> {
  let query = getSupabaseAdmin()
    .from("space_objects")
    .select(OBJECT_SELECT)
    .order("created_at");
  if (citySlug) query = query.eq("city_slug", citySlug);
  const { data, error } = await query;
  assertNoError(error);
  return ((data ?? []) as unknown as ObjectRow[]).map(toObjectItem);
}

export async function getObjectById(id: string): Promise<SpaceObjectItem | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("space_objects")
    .select(OBJECT_SELECT)
    .eq("id", id)
    .maybeSingle();
  assertNoError(error);
  return data ? toObjectItem(data as unknown as ObjectRow) : null;
}

export async function createObject(data: {
  id: string;
  citySlug: string;
  slug: string;
  translations: Record<Locale, SpaceObjectTranslation>;
}): Promise<void> {
  const { error } = await getSupabaseAdmin().from("space_objects").insert(data);
  assertNoError(error);
}

export async function updateObject(
  id: string,
  data: {
    citySlug?: string;
    translations?: Record<Locale, SpaceObjectTranslation>;
  }
): Promise<void> {
  const update = {
    city_slug: data.citySlug,
    slug: data.translations?.ru.slug,
    translations: data.translations,
    updated_at: new Date().toISOString(),
  };
  const { error } = await getSupabaseAdmin()
    .from("space_objects")
    .update(update)
    .eq("id", id);
  assertNoError(error);
}

export async function deleteObject(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data: media, error: mediaError } = await supabase
    .from("object_media")
    .select("storage_path")
    .eq("object_id", id);
  assertNoError(mediaError);

  const paths = (media ?? []).map((m) => m.storage_path);
  if (paths.length > 0) {
    const { error } = await supabase.storage.from(CATALOG_BUCKET).remove(paths);
    assertNoError(error);
  }

  const { error } = await supabase.from("space_objects").delete().eq("id", id);
  assertNoError(error);
}

export async function addObjectMedia(params: {
  objectId: string;
  kind: "photo" | "audio";
  body: Uint8Array;
  contentType: string;
  extension: string;
}): Promise<MediaItem> {
  const supabase = getSupabaseAdmin();
  const mediaId = crypto.randomUUID();
  const storagePath = `${params.objectId}/${params.kind}-${mediaId}.${params.extension}`;

  const { error: uploadError } = await supabase.storage
    .from(CATALOG_BUCKET)
    .upload(storagePath, params.body, { contentType: params.contentType });
  assertNoError(uploadError);

  const { data: last, error: positionError } = await supabase
    .from("object_media")
    .select("position")
    .eq("object_id", params.objectId)
    .eq("kind", params.kind)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  assertNoError(positionError);
  const position = last ? last.position + 1 : 0;

  const url = supabase.storage.from(CATALOG_BUCKET).getPublicUrl(storagePath).data
    .publicUrl;

  const { error } = await supabase.from("object_media").insert({
    id: mediaId,
    object_id: params.objectId,
    kind: params.kind,
    url,
    storage_path: storagePath,
    position,
  });
  if (error) {
    await supabase.storage.from(CATALOG_BUCKET).remove([storagePath]);
    throw new Error(error.message);
  }

  return { id: mediaId, kind: params.kind, url, position };
}

export async function deleteObjectMedia(mediaId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { data, error: selectError } = await supabase
    .from("object_media")
    .select("storage_path")
    .eq("id", mediaId)
    .maybeSingle();
  assertNoError(selectError);
  if (!data) throw new Error("Файл не найден");

  const { error: removeError } = await supabase.storage
    .from(CATALOG_BUCKET)
    .remove([data.storage_path]);
  assertNoError(removeError);

  const { error } = await supabase.from("object_media").delete().eq("id", mediaId);
  assertNoError(error);
}
