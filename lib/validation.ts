import { z } from "zod";

export const cityTranslationSchema = z.object({
  name: z.string().trim().min(1, "Название обязательно").max(200),
  description: z.string().max(2000),
});

export const citySlugSchema = z
  .string()
  .trim()
  .min(1, "Slug обязателен")
  .max(100)
  .regex(/^[a-z0-9-]+$/, "Slug: только латиница, цифры и дефис");

export const createCitySchema = z.object({
  id: z.string().min(1).max(100),
  slug: citySlugSchema,
  translations: z.object({
    ru: cityTranslationSchema,
    en: cityTranslationSchema,
    fr: cityTranslationSchema,
  }),
});

export const updateCitySchema = z.object({
  slug: citySlugSchema,
  translations: createCitySchema.shape.translations,
});

export const objectTranslationSchema = z.object({
  name: z.string().trim().min(1, "Название обязательно").max(200),
  slug: z.string().trim().min(1, "Slug обязателен").max(100),
  description: z.string().max(2000),
  longDescription: z.string().max(50_000),
  workingHours: z.string().max(2000),
  transport: z.string().max(2000),
  ticketPrices: z.string().max(2000),
});

export const createObjectSchema = z.object({
  id: z.string().min(1).max(250),
  citySlug: z.string().min(1).max(100),
  translations: z.object({
    ru: objectTranslationSchema,
    en: objectTranslationSchema,
    fr: objectTranslationSchema,
  }),
});

export const updateObjectSchema = z.object({
  citySlug: z.string().min(1).max(100).optional(),
  translations: z
    .object({
      ru: objectTranslationSchema,
      en: objectTranslationSchema,
      fr: objectTranslationSchema,
    })
    .optional(),
});

export const mediaKindSchema = z.enum(["photo", "audio"]);

export function formatValidationIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.filter((p) => p !== "translations").join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join("; ");
}
