"use client";

import Link from "next/link";
import { Church, Landmark, MapPin, Cross } from "lucide-react";
import { useLocale } from "@/components/language-provider";
import { useCities } from "@/lib/use-data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cityIcons: Record<string, typeof Church> = {
  moscow: Church,
  kaluga: Landmark,
  korolev: Church,
  samara: Landmark,
  "star-city": Church,
  baikonur: MapPin,
  spb: Church,
};

export function HomeContent() {
  const { locale } = useLocale();
  const cities = useCities(locale);

  return (
    <div>
      <section className="relative overflow-hidden border-b py-16 sm:py-24">
        <div className="pattern-grid pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Cross className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            {locale === "ru"
              ? "Святые места России"
              : locale === "en"
                ? "Holy Places of Russia"
                : "Lieux saints de Russie"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {locale === "ru"
              ? "Путеводитель по православным святыням: храмам, монастырям и чудотворным иконам. Прикоснитесь к духовному наследию России."
              : locale === "en"
                ? "A guide to Orthodox shrines: churches, monasteries, and miracle-working icons. Touch the spiritual heritage of Russia."
                : "Un guide des sanctuaires orthodoxes: églises, monastères et icônes miraculeuses. Touchez l'héritage spirituel de la Russie."}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => {
            const Icon = cityIcons[city.id] ?? Church;
            const objectsLabel =
              locale === "ru"
                ? city.objectCount === 1
                  ? "святыня"
                  : "святынь"
                : locale === "en"
                  ? city.objectCount === 1
                    ? "shrine"
                    : "shrines"
                  : city.objectCount === 1
                    ? "sanctuaire"
                    : "sanctuaires";
            return (
              <Link key={city.id} href={`/${city.slug}`}>
                <Card className="card-hover group cursor-pointer border-border/50 transition-all hover:border-primary/30 hover:shadow-[0_0_24px_-8px_oklch(0.65_0.16_68/0.3)] h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {city.objectCount} {objectsLabel}
                      </Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg group-hover:text-primary transition-colors">
                      {city.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {city.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
