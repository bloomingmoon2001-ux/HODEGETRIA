"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, X, Globe, MapPin } from "lucide-react";
import type { CityItem } from "@/lib/models";

type CityFormData = {
  slug: string;
  ruName: string;
  ruDescription: string;
  enName: string;
  enDescription: string;
  frName: string;
  frDescription: string;
};

const emptyForm: CityFormData = {
  slug: "",
  ruName: "",
  ruDescription: "",
  enName: "",
  enDescription: "",
  frName: "",
  frDescription: "",
};

const LANGUAGES = [
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
  { key: "fr", label: "Français" },
] as const;

export function AdminCities() {
  const router = useRouter();
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CityFormData>(emptyForm);

  const fetchCities = useCallback(async () => {
    try {
      const res = await fetch("/api/cities");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCities(data);
    } catch {
      toast.error("Ошибка загрузки городов");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(city: CityItem) {
    setEditingId(city.id);
    setForm({
      slug: city.slug,
      ruName: city.translations.ru.name,
      ruDescription: city.translations.ru.description,
      enName: city.translations.en.name,
      enDescription: city.translations.en.description,
      frName: city.translations.fr.name,
      frDescription: city.translations.fr.description,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.slug.trim() || !form.ruName.trim()) {
      toast.error("Заполните slug и название на русском");
      return;
    }

    setSaving(true);
    try {
      const translations = {
        ru: { name: form.ruName, description: form.ruDescription },
        en: { name: form.enName, description: form.enDescription },
        fr: { name: form.frName, description: form.frDescription },
      };

      if (editingId) {
        const res = await fetch(`/api/cities/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: form.slug, translations }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update");
        }
        toast.success("Город обновлён");
      } else {
        const id = form.slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
        const res = await fetch("/api/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            slug: form.slug,
            objectCount: 0,
            translations,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create");
        }
        toast.success("Город создан");
      }

      closeModal();
      await fetchCities();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(city: CityItem) {
    toast(`Удалить город «${city.translations.ru.name}»?`, {
      action: {
        label: "Удалить",
        onClick: async () => {
          try {
            const res = await fetch(`/api/cities/${city.id}`, {
              method: "DELETE",
            });
            if (!res.ok) {
              const err = await res.json();
              throw new Error(err.error || "Failed to delete");
            }
            toast.success("Город удалён");
            await fetchCities();
            router.refresh();
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Ошибка удаления");
          }
        },
      },
      cancel: {
        label: "Отмена",
        onClick: () => {},
      },
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Города</h2>
          <p className="text-sm text-muted-foreground">
            Управление списком городов и переводов
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить город
        </Button>
      </div>

      {cities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MapPin className="h-12 w-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">Нет городов</p>
          <p className="text-sm mt-1">Добавьте первый город, чтобы начать</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cities.map((city) => (
            <Card key={city.id} size="sm">
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-medium truncate">
                      {city.translations.ru.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{city.slug}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>{city.translations.en.name}</span>
                    <span className="text-border">|</span>
                    <span>{city.translations.fr.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(city)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(city)}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-24">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative z-50 w-full max-w-2xl mx-4 rounded-xl border bg-card p-6 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {editingId ? "Редактировать город" : "Новый город"}
              </h3>
              <Button variant="outline" size="sm" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="moscow"
                  disabled={!!editingId}
                />
              </div>

              {LANGUAGES.map((lang) => (
                <div key={lang.key} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {lang.label}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Название</label>
                    <Input
                      value={
                        form[`${lang.key}Name` as keyof CityFormData] as string
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [`${lang.key}Name`]: e.target.value,
                        })
                      }
                      placeholder={
                        lang.key === "ru"
                          ? "Москва"
                          : lang.key === "en"
                            ? "Moscow"
                            : "Moscou"
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Описание</label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={
                        form[
                          `${lang.key}Description` as keyof CityFormData
                        ] as string
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [`${lang.key}Description`]: e.target.value,
                        })
                      }
                      placeholder="Описание города..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
              <Button variant="outline" onClick={closeModal}>
                Отмена
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {editingId ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
