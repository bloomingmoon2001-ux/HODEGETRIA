import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminObjects } from "@/components/admin-objects";
import { cities } from "@/lib/data";

export const metadata: Metadata = {
  title: "Управление объектами",
};

export function generateStaticParams() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

export default async function AdminObjectsPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;

  let cityName = citySlug;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/api/cities`, {
      cache: "no-store",
    });
    if (res.ok) {
      const cities = await res.json();
      const city = cities.find((c: { slug: string }) => c.slug === citySlug);
      if (city) {
        cityName = city.translations.ru.name;
      }
    }
  } catch {
    // fallback to slug
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin/objects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к городам
        </Link>
      </div>
      <Suspense>
        <AdminObjects citySlug={citySlug} cityName={cityName} />
      </Suspense>
    </div>
  );
}
