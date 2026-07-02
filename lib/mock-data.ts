// Мок-данные для статического режима (без БД)
// Используются когда USE_DATABASE=false или БД недоступна

import { Service, CityItem, SpaceObjectItem } from "./models";
import { translatedCities, translatedObjects } from "./i18n";

export const mockServices: Service[] = [
  {
    id: "mock-service-1",
    name: "API Gateway",
    description: "Шлюз для микросервисной архитектуры",
    status: "active",
    url: "https://api.example.com",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "mock-service-2",
    name: "Auth Service",
    description: "Сервис аутентификации и авторизации",
    status: "active",
    url: "https://auth.example.com",
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: "mock-service-3",
    name: "ML Pipeline",
    description: "Пайплайн для обработки данных с AI",
    status: "deploying",
    url: undefined,
    createdAt: new Date("2024-03-10").toISOString(),
    updatedAt: new Date("2024-03-10").toISOString(),
  },
];

const ruCities = translatedCities["ru"];
const ruObjects = translatedObjects["ru"];

export const mockCities: CityItem[] = ruCities.map((city) => ({
  id: city.id,
  slug: city.slug,
  objectCount: city.objectCount,
  createdAt: new Date("2024-01-01").toISOString(),
  updatedAt: new Date("2024-01-01").toISOString(),
  translations: {
    ru: { name: city.name, description: city.description },
    en: {
      name: translatedCities["en"].find((c) => c.id === city.id)?.name ?? "",
      description:
        translatedCities["en"].find((c) => c.id === city.id)?.description ?? "",
    },
    fr: {
      name: translatedCities["fr"].find((c) => c.id === city.id)?.name ?? "",
      description:
        translatedCities["fr"].find((c) => c.id === city.id)?.description ?? "",
    },
  },
}));

export const mockSpaceObjects: SpaceObjectItem[] = ruObjects.map((obj) => ({
  id: obj.id,
  citySlug: obj.citySlug,
  imageUrl: undefined,
  audioUrl: obj.audioUrl,
  createdAt: new Date("2024-01-01").toISOString(),
  updatedAt: new Date("2024-01-01").toISOString(),
  translations: {
    ru: {
      name: obj.name,
      slug: obj.slug,
      description: obj.description,
      longDescription: obj.longDescription,
      workingHours: obj.workingHours,
      transport: obj.transport,
      ticketPrices: obj.ticketPrices,
    },
    en: {
      name: translatedObjects["en"].find((o) => o.id === obj.id)?.name ?? "",
      slug: translatedObjects["en"].find((o) => o.id === obj.id)?.slug ?? "",
      description:
        translatedObjects["en"].find((o) => o.id === obj.id)?.description ?? "",
      longDescription:
        translatedObjects["en"].find((o) => o.id === obj.id)?.longDescription ??
        "",
      workingHours:
        translatedObjects["en"].find((o) => o.id === obj.id)?.workingHours ??
        "",
      transport:
        translatedObjects["en"].find((o) => o.id === obj.id)?.transport ?? "",
      ticketPrices:
        translatedObjects["en"].find((o) => o.id === obj.id)?.ticketPrices ??
        "",
    },
    fr: {
      name: translatedObjects["fr"].find((o) => o.id === obj.id)?.name ?? "",
      slug: translatedObjects["fr"].find((o) => o.id === obj.id)?.slug ?? "",
      description:
        translatedObjects["fr"].find((o) => o.id === obj.id)?.description ?? "",
      longDescription:
        translatedObjects["fr"].find((o) => o.id === obj.id)?.longDescription ??
        "",
      workingHours:
        translatedObjects["fr"].find((o) => o.id === obj.id)?.workingHours ??
        "",
      transport:
        translatedObjects["fr"].find((o) => o.id === obj.id)?.transport ?? "",
      ticketPrices:
        translatedObjects["fr"].find((o) => o.id === obj.id)?.ticketPrices ??
        "",
    },
  },
}));
