"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import {
  type TranslatedCity,
  type TranslatedObject,
  translatedCities,
  translatedObjects,
} from "@/lib/i18n";
import {
  fetchCities,
  fetchCityBySlug,
  fetchObjectsByCity,
  fetchObjectBySlug,
} from "@/lib/data-layer";

export function useCities(locale: Locale) {
  const [cities, setCities] = useState<TranslatedCity[]>(
    () => translatedCities[locale]
  );

  useEffect(() => {
    fetchCities(locale).then(setCities);
  }, [locale]);

  return cities;
}

export function useCity(slug: string, locale: Locale) {
  const [city, setCity] = useState<TranslatedCity | null>(() => {
    const cities = translatedCities[locale];
    const initial = cities.find((c) => c.slug === slug);
    return initial ?? null;
  });

  useEffect(() => {
    fetchCityBySlug(slug, locale).then((result) => {
      if (result) setCity(result);
    });
  }, [slug, locale]);

  return city;
}

export function useObjects(
  citySlug: string,
  locale: Locale
): TranslatedObject[] {
  const [objects, setObjects] = useState<TranslatedObject[]>(() =>
    translatedObjects[locale].filter((o) => o.citySlug === citySlug)
  );

  useEffect(() => {
    fetchObjectsByCity(citySlug, locale).then((result) => {
      if (result.length > 0) setObjects(result);
    });
  }, [citySlug, locale]);

  return objects;
}

export function useObject(
  slug: string,
  citySlug: string,
  locale: Locale
): TranslatedObject | null {
  const [object, setObject] = useState<TranslatedObject | null>(() => {
    const all = translatedObjects[locale];
    return (
      all.find(
        (o) => (o.slug === slug || o.id === slug) && o.citySlug === citySlug
      ) ?? null
    );
  });

  useEffect(() => {
    fetchObjectBySlug(slug, citySlug, locale).then((result) => {
      if (result) setObject(result);
    });
  }, [slug, citySlug, locale]);

  return object;
}
