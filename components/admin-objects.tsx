"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Globe,
  Satellite,
  Upload,
  ImageIcon,
  Music,
} from "lucide-react";
import type { SpaceObjectItem } from "@/lib/models";

interface AdminObjectsProps {
  citySlug: string;
  cityName: string;
}

type ObjectFormData = {
  slug: string;
  ruName: string;
  ruDescription: string;
  ruLongDescription: string;
  ruWorkingHours: string;
  ruTransport: string;
  ruTicketPrices: string;
  enName: string;
  enDescription: string;
  enLongDescription: string;
  enWorkingHours: string;
  enTransport: string;
  enTicketPrices: string;
  frName: string;
  frDescription: string;
  frLongDescription: string;
  frWorkingHours: string;
  frTransport: string;
  frTicketPrices: string;
  imageUrl: string;
  audioUrl: string;
};

const emptyForm: ObjectFormData = {
  slug: "",
  ruName: "",
  ruDescription: "",
  ruLongDescription: "",
  ruWorkingHours: "",
  ruTransport: "",
  ruTicketPrices: "",
  enName: "",
  enDescription: "",
  enLongDescription: "",
  enWorkingHours: "",
  enTransport: "",
  enTicketPrices: "",
  frName: "",
  frDescription: "",
  frLongDescription: "",
  frWorkingHours: "",
  frTransport: "",
  frTicketPrices: "",
  imageUrl: "",
  audioUrl: "",
};

const LANGUAGES = [
  { key: "ru", label: "Русский" },
  { key: "en", label: "English" },
  { key: "fr", label: "Français" },
] as const;

const TRANSLATION_FIELDS = [
  { key: "Name", label: "Название", multiline: false },
  { key: "Description", label: "Краткое описание", multiline: true, rows: 2 },
  {
    key: "LongDescription",
    label: "Полное описание",
    multiline: true,
    rows: 4,
  },
  { key: "WorkingHours", label: "Режим работы", multiline: false },
  { key: "Transport", label: "Проезд", multiline: true, rows: 2 },
  { key: "TicketPrices", label: "Цены", multiline: true, rows: 2 },
] as const;

export function AdminObjects({ citySlug, cityName }: AdminObjectsProps) {
  const router = useRouter();
  const [objects, setObjects] = useState<SpaceObjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [form, setForm] = useState<ObjectFormData>(emptyForm);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const fetchObjects = useCallback(async () => {
    try {
      const res = await fetch(`/api/objects?citySlug=${citySlug}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setObjects(data);
    } catch {
      toast.error("Ошибка загрузки объектов");
    } finally {
      setLoading(false);
    }
  }, [citySlug]);

  useEffect(() => {
    fetchObjects();
  }, [fetchObjects]);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  }

  function openEdit(obj: SpaceObjectItem) {
    setEditingId(obj.id);
    setForm({
      slug: obj.translations.ru.slug,
      ruName: obj.translations.ru.name,
      ruDescription: obj.translations.ru.description,
      ruLongDescription: obj.translations.ru.longDescription,
      ruWorkingHours: obj.translations.ru.workingHours,
      ruTransport: obj.translations.ru.transport,
      ruTicketPrices: obj.translations.ru.ticketPrices,
      enName: obj.translations.en.name,
      enDescription: obj.translations.en.description,
      enLongDescription: obj.translations.en.longDescription,
      enWorkingHours: obj.translations.en.workingHours,
      enTransport: obj.translations.en.transport,
      enTicketPrices: obj.translations.en.ticketPrices,
      frName: obj.translations.fr.name,
      frDescription: obj.translations.fr.description,
      frLongDescription: obj.translations.fr.longDescription,
      frWorkingHours: obj.translations.fr.workingHours,
      frTransport: obj.translations.fr.transport,
      frTicketPrices: obj.translations.fr.ticketPrices,
      imageUrl: obj.imageUrl || "",
      audioUrl: obj.audioUrl || "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function buildTranslations(formData: ObjectFormData) {
    return {
      ru: {
        name: formData.ruName,
        slug: formData.slug,
        description: formData.ruDescription,
        longDescription: formData.ruLongDescription,
        workingHours: formData.ruWorkingHours,
        transport: formData.ruTransport,
        ticketPrices: formData.ruTicketPrices,
      },
      en: {
        name: formData.enName,
        slug: formData.slug,
        description: formData.enDescription,
        longDescription: formData.enLongDescription,
        workingHours: formData.enWorkingHours,
        transport: formData.enTransport,
        ticketPrices: formData.enTicketPrices,
      },
      fr: {
        name: formData.frName,
        slug: formData.slug,
        description: formData.frDescription,
        longDescription: formData.frLongDescription,
        workingHours: formData.frWorkingHours,
        transport: formData.frTransport,
        ticketPrices: formData.frTicketPrices,
      },
    };
  }

  async function handleAudioUpload(file: File) {
    setUploadingAudio(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Ошибка загрузки");
      }

      const data = await res.json();
      setForm({ ...form, audioUrl: data.url });
      toast.success("Аудиофайл загружен");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка загрузки файла");
    } finally {
      setUploadingAudio(false);
    }
  }

  async function handleSave() {
    if (!form.slug.trim() || !form.ruName.trim()) {
      toast.error("Заполните slug и название на русском");
      return;
    }

    setSaving(true);
    try {
      const translations = buildTranslations(form);

      if (editingId) {
        const res = await fetch(`/api/objects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageUrl: form.imageUrl || undefined,
            audioUrl: form.audioUrl || undefined,
            translations,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to update");
        }
        toast.success("Объект обновлён");
      } else {
        const id = `${citySlug}-${form.slug.toLowerCase().replace(/[^a-z0-9-]/g, "")}`;
        const res = await fetch("/api/objects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            citySlug,
            imageUrl: form.imageUrl || undefined,
            audioUrl: form.audioUrl || undefined,
            translations,
          }),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create");
        }
        toast.success("Объект создан");
      }

      closeModal();
      await fetchObjects();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(obj: SpaceObjectItem) {
    const name = obj.translations.ru.name;
    toast(`Удалить объект «${name}»?`, {
      action: {
        label: "Удалить",
        onClick: async () => {
          try {
            const res = await fetch(`/api/objects/${obj.id}`, {
              method: "DELETE",
            });
            if (!res.ok) {
              const err = await res.json();
              throw new Error(err.error || "Failed to delete");
            }
            toast.success("Объект удалён");
            await fetchObjects();
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
          <h2 className="text-xl font-semibold">Объекты: {cityName}</h2>
          <p className="text-sm text-muted-foreground">
            Управление объектами города
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить объект
        </Button>
      </div>

      {objects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Satellite className="h-12 w-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">Нет объектов</p>
          <p className="text-sm mt-1">
            Добавьте первый объект в город {cityName}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {objects.map((obj) => (
            <Card key={obj.id} size="sm">
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Satellite className="h-4 w-4 shrink-0 text-primary" />
                    <span className="font-medium truncate">
                      {obj.translations.ru.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{obj.translations.ru.slug}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    <span>{obj.translations.en.name}</span>
                    <span className="text-border">|</span>
                    <span>{obj.translations.fr.name}</span>
                  </div>
                  {obj.audioUrl && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Music className="h-3 w-3" />
                      <span>Аудио</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(obj)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(obj)}
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-16">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative z-50 w-full max-w-3xl mx-4 rounded-xl border bg-card p-6 shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {editingId ? "Редактировать объект" : "Новый объект"}
              </h3>
              <Button variant="outline" size="sm" onClick={closeModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Slug
                  </label>
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="museum-of-cosmonautics"
                    disabled={!!editingId}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Ссылка на фото
                  </label>
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <Input
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm({ ...form, imageUrl: e.target.value })
                      }
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-lg border p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Music className="h-4 w-4" />
                  Аудиофайл
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    value={form.audioUrl}
                    onChange={(e) =>
                      setForm({ ...form, audioUrl: e.target.value })
                    }
                    placeholder="https://example.com/audio.mp3"
                    className="flex-1"
                  />
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload(file);
                      e.target.value = "";
                    }}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={uploadingAudio}
                    onClick={() => audioInputRef.current?.click()}
                  >
                    {uploadingAudio ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {LANGUAGES.map((lang) => (
                <div key={lang.key} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    {lang.label}
                  </div>
                  {TRANSLATION_FIELDS.map((field) => {
                    const fieldKey =
                      `${lang.key}${field.key}` as keyof ObjectFormData;
                    return (
                      <div key={fieldKey}>
                        <label className="block text-sm mb-1">
                          {field.label}
                        </label>
                        {field.multiline ? (
                          <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={(form[fieldKey] as string) || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                [fieldKey]: e.target.value,
                              })
                            }
                            rows={field.rows || 3}
                          />
                        ) : (
                          <Input
                            value={(form[fieldKey] as string) || ""}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                [fieldKey]: e.target.value,
                              })
                            }
                          />
                        )}
                      </div>
                    );
                  })}
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
