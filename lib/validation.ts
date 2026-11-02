import { z } from "zod";

export const objectTranslationSchema = z.object({
  name: z.string().trim().min(1, "Название обязательно").max(200),
  slug: z.string().trim().min(1, "Slug обязателен").max(100),
  description: z.string().max(2000),
  longDescription: z.string().max(50_000),
  workingHours: z.string().max(2000),
  transport: z.string().max(2000),
  ticketPrices: z.string().max(2000),
});

export const optionalUrlField = z
  .string()
  .max(2000)
  .optional()
  .or(z.literal(""));

export const createObjectSchema = z.object({
  id: z.string().min(1).max(250),
  citySlug: z.string().min(1).max(100),
  imageUrl: optionalUrlField,
  audioUrl: optionalUrlField,
  translations: z.object({
    ru: objectTranslationSchema,
    en: objectTranslationSchema,
    fr: objectTranslationSchema,
  }),
});

export const updateObjectSchema = z.object({
  citySlug: z.string().min(1).max(100).optional(),
  imageUrl: optionalUrlField,
  audioUrl: optionalUrlField,
  translations: z
    .object({
      ru: objectTranslationSchema.optional(),
      en: objectTranslationSchema.optional(),
      fr: objectTranslationSchema.optional(),
    })
    .optional(),
});

export function formatValidationIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.filter((p) => p !== "translations").join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join("; ");
}
