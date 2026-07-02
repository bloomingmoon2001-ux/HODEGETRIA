"use client";

import Link from "next/link";
import { useLocale } from "@/components/language-provider";
import { useCity, useObjects } from "@/lib/use-data";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Satellite,
  Rocket,
  Telescope,
  Globe,
  Star,
  Building2,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const objectIcons: Record<string, typeof Satellite> = {
  "museum-of-cosmonautics": Telescope,
  "memorial-museum": Building2,
  "cosmos-pavilion": Building2,
  "gagarin-monument": Star,
  "moscow-planetarium": Globe,
  "kaluga-museum": Building2,
  "tsiolkovsky-house-museum": Building2,
  "kaluga-planetarium": Globe,
  energia: Rocket,
  "korolev-house-museum": Building2,
  "korolev-monument": Star,
  "tsniimash-museum": Building2,
  "samara-space-museum": Building2,
  "soyuz-rocket-monument": Rocket,
  "gagarin-training-center": Building2,
  "cpc-museum": Building2,
  "cosmonaut-house": Building2,
  "baikonur-cosmodrome": Rocket,
  "baikonur-museum": Building2,
  "baikonur-gagarin-monument": Star,
  "gagarin-start": Rocket,
  "spb-cosmonautics-museum": Building2,
  "spb-planetarium": Globe,
};

export function CityContent({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const city = useCity(slug, locale);
  const objects = useObjects(slug, locale);

  if (!city) {
    notFound();
    return null;
  }

  const backLabel =
    locale === "ru"
      ? "На главную"
      : locale === "en"
        ? "Back to home"
        : "Retour à l'accueil";

  const noObjectsLabel =
    locale === "ru"
      ? "В этом городе пока нет объектов."
      : locale === "en"
        ? "No objects in this city yet."
        : "Aucun objet dans cette ville pour le moment.";

  return (
    <div>
      <section className="relative overflow-hidden border-b py-12 sm:py-16">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {city.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            {city.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-14">
        {objects.length === 0 ? (
          <p className="text-center text-muted-foreground">{noObjectsLabel}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {objects.map((object) => {
              const Icon = objectIcons[object.slug] ?? Satellite;
              return (
                <Link key={object.id} href={`/${city.slug}/${object.slug}`}>
                  <Card className="card-hover group cursor-pointer border-border/50 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_-8px_hsl(var(--primary)/0.3)] h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="mt-3 text-lg group-hover:text-primary transition-colors">
                        {object.name}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {object.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
