"use client";

import Link from "next/link";
import { useLocale } from "@/components/language-provider";
import { useCity, useObject } from "@/lib/use-data";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Ticket,
  Satellite,
  Rocket,
  Telescope,
  Globe,
  Star,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AudioPlayer } from "@/components/audio-player";

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

const photoGradients: Record<string, string> = {
  moscow: "from-blue-900/40 via-purple-900/30 to-indigo-900/40",
  kaluga: "from-emerald-900/40 via-teal-900/30 to-cyan-900/40",
  korolev: "from-slate-900/40 via-blue-900/30 to-indigo-900/40",
  samara: "from-amber-900/40 via-orange-900/30 to-red-900/40",
  "star-city": "from-violet-900/40 via-purple-900/30 to-fuchsia-900/40",
  baikonur: "from-yellow-900/40 via-amber-900/30 to-orange-900/40",
  spb: "from-cyan-900/40 via-sky-900/30 to-blue-900/40",
};

export function ObjectContent({
  slug,
  objectSlug,
}: {
  slug: string;
  objectSlug: string;
}) {
  const { locale } = useLocale();
  const city = useCity(slug, locale);
  const object = useObject(objectSlug, slug, locale);

  if (!city || !object) {
    notFound();
    return null;
  }

  const Icon = objectIcons[object.slug] ?? Satellite;

  const backLabel =
    locale === "ru"
      ? `Вернуться к ${city.name}`
      : locale === "en"
        ? `Back to ${city.name}`
        : `Retour à ${city.name}`;

  const workingHoursLabel =
    locale === "ru"
      ? "Режим работы"
      : locale === "en"
        ? "Opening hours"
        : "Horaires d'ouverture";

  const transportLabel =
    locale === "ru"
      ? "Как добраться"
      : locale === "en"
        ? "How to get there"
        : "Comment s'y rendre";

  const ticketLabel =
    locale === "ru"
      ? "Стоимость билетов"
      : locale === "en"
        ? "Ticket prices"
        : "Prix des billets";

  return (
    <div>
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${photoGradients[slug] ?? "from-blue-900/40 via-purple-900/30 to-indigo-900/40"} py-16 sm:py-20`}
      >
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <Link
            href={`/${city.slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>

          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm">
              <Icon className="h-12 w-12 text-primary" />
            </div>
            <Badge variant="secondary" className="mb-4">
              {city.name}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {object.name}
            </h1>
            <p className="mt-3 max-w-xl text-base text-muted-foreground">
              {object.description}
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-foreground/90">
              {object.longDescription}
            </p>
          </div>

          {object.audioUrl && (
            <div className="my-8">
              <AudioPlayer audioUrl={object.audioUrl} />
            </div>
          )}

          <Separator className="my-10" />

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Clock className="h-4 w-4" />
                {workingHoursLabel}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {object.workingHours}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" />
                {transportLabel}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {object.transport}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Ticket className="h-4 w-4" />
                {ticketLabel}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {object.ticketPrices}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
