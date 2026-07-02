"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, MapPin, Satellite, ChevronRight } from "lucide-react";
import type { CityItem } from "@/lib/models";

export default function AdminObjectsPage() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cities");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCities(data);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          Назад в админку
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Объекты по городам</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Выберите город для управления объектами
        </p>
      </div>

      {cities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MapPin className="h-12 w-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">Нет городов</p>
          <p className="text-sm mt-1">Сначала добавьте город</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cities.map((city) => (
            <Link key={city.id} href={`/admin/objects/${city.slug}`}>
              <Card size="sm" className="card-hover cursor-pointer">
                <CardContent className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="font-medium">
                        {city.translations.ru.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        /{city.slug}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Satellite className="h-4 w-4" />
                    <span>{city.objectCount} объектов</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
