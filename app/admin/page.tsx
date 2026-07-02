import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Satellite, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel",
};

const sections = [
  {
    title: "Города",
    description: "Управление городами и переводами",
    href: "/admin/cities",
    icon: MapPin,
  },
  {
    title: "Объекты",
    description: "Управление объектами и аудиофайлами",
    href: "/admin/objects",
    icon: Satellite,
  },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="mt-1 text-muted-foreground">
        Управление контентом приложения
      </p>

      <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="card-hover cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="mt-3">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
