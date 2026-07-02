import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AdminCities } from "@/components/admin-cities";

export const metadata: Metadata = {
  title: "Управление городами",
};

export default function AdminCitiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад в админку
        </Link>
      </div>
      <Suspense>
        <AdminCities />
      </Suspense>
    </div>
  );
}
