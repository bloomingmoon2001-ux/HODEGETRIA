import type { Locale } from "./i18n";
import {
  translatedCities,
  translatedObjects,
  type TranslatedCity,
  type TranslatedObject,
} from "./i18n";
import type { CityItem, SpaceObjectItem } from "./models";

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function cityItemToTranslated(item: CityItem, locale: Locale): TranslatedCity {
  const t = item.translations[locale];
  return {
    id: item.id,
    name: t.name,
    description: t.description,
    objectCount: item.objectCount,
    slug: item.slug,
  };
}

function objectItemToTranslated(
  item: SpaceObjectItem,
  locale: Locale
): TranslatedObject {
  const t = item.translations[locale];
  return {
    id: item.id,
    name: t.name,
    slug: t.slug,
    description: t.description,
    longDescription: t.longDescription,
    workingHours: t.workingHours,
    transport: t.transport,
    ticketPrices: t.ticketPrices,
    citySlug: item.citySlug,
    audioUrl: item.audioUrl,
  };
}

export async function fetchCities(locale: Locale): Promise<TranslatedCity[]> {
  const data = await fetchJson<CityItem[]>("/api/cities");
  if (data && data.length > 0) {
    return data.map((item) => cityItemToTranslated(item, locale));
  }
  return translatedCities[locale];
}

export async function fetchCityBySlug(
  slug: string,
  locale: Locale
): Promise<TranslatedCity | null> {
  const data = await fetchJson<CityItem[]>("/api/cities");
  if (data && data.length > 0) {
    const city = data.find((c) => c.slug === slug || c.id === slug);
    if (city) return cityItemToTranslated(city, locale);
    return null;
  }
  return translatedCities[locale].find((c) => c.slug === slug) ?? null;
}

export async function fetchObjectsByCity(
  citySlug: string,
  locale: Locale
): Promise<TranslatedObject[]> {
  const data = await fetchJson<SpaceObjectItem[]>(
    `/api/objects?citySlug=${encodeURIComponent(citySlug)}`
  );
  if (data && data.length > 0) {
    return data.map((item) => objectItemToTranslated(item, locale));
  }
  return translatedObjects[locale].filter((o) => o.citySlug === citySlug);
}

export async function fetchObjectBySlug(
  slug: string,
  citySlug: string,
  locale: Locale
): Promise<TranslatedObject | null> {
  const data = await fetchJson<SpaceObjectItem[]>(
    `/api/objects?citySlug=${encodeURIComponent(citySlug)}`
  );
  if (data && data.length > 0) {
    const obj = data.find((o) => {
      const t = o.translations[locale];
      return t.slug === slug || o.id === slug;
    });
    if (obj) return objectItemToTranslated(obj, locale);
    return null;
  }
  return (
    translatedObjects[locale].find(
      (o) => (o.slug === slug || o.id === slug) && o.citySlug === citySlug
    ) ?? null
  );
}
