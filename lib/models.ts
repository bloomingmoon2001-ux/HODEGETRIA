import { docClient } from "./db";
import {
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { TableName, IndexName } from "./schema";

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "deploying";
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
  return (result.Item as Service) ?? null;
}

export async function getServicesByStatus(status: string): Promise<Service[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.SERVICES,
      IndexName: IndexName.SERVICES_STATUS,
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: {
        "#status": "status",
      },
      ExpressionAttributeValues: {
        ":status": status,
      },
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function getAllServices(): Promise<Service[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.SERVICES,
    })
  );
  return (result.Items as Service[]) ?? [];
}

export async function createService(
  data: Omit<Service, "createdAt" | "updatedAt">
): Promise<Service> {
  const now = new Date().toISOString();
  const service: Service = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await docClient.send(
    new PutCommand({
      TableName: TableName.SERVICES,
      Item: service,
    })
  );

  return service;
}

export async function updateService(
  id: string,
  data: Partial<Pick<Service, "name" | "description" | "status" | "url">>
): Promise<Service> {
  const updateExpr = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (data.name !== undefined) {
    updateExpr.push("#name = :name");
    exprValues[":name"] = data.name;
    exprNames["#name"] = "name";
  }

  if (data.description !== undefined) {
    updateExpr.push("#description = :description");
    exprValues[":description"] = data.description;
    exprNames["#description"] = "description";
  }

  if (data.status !== undefined) {
    updateExpr.push("#status = :status");
    exprValues[":status"] = data.status;
    exprNames["#status"] = "status";
  }

  if (data.url !== undefined) {
    updateExpr.push("#url = :url");
    exprValues[":url"] = data.url;
    exprNames["#url"] = "url";
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.SERVICES,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames:
        Object.keys(exprNames).length > 0 ? exprNames : undefined,
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as Service;
}

export async function deleteService(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.SERVICES,
      Key: { id },
    })
  );
}

// --- City types and CRUD ---

export interface CityTranslation {
  name: string;
  description: string;
}

export interface CityItem {
  id: string;
  slug: string;
  objectCount: number;
  createdAt: string;
  updatedAt: string;
  translations: {
    ru: CityTranslation;
    en: CityTranslation;
    fr: CityTranslation;
  };
}

export async function getAllCities(): Promise<CityItem[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.CITIES,
    })
  );
  return (result.Items as CityItem[]) ?? [];
}

export async function getCityById(id: string): Promise<CityItem | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.CITIES,
      Key: { id },
    })
  );
  return (result.Item as CityItem) ?? null;
}

export async function createCity(
  data: Omit<CityItem, "createdAt" | "updatedAt">
): Promise<CityItem> {
  const now = new Date().toISOString();
  const city: CityItem = { ...data, createdAt: now, updatedAt: now };
  await docClient.send(
    new PutCommand({
      TableName: TableName.CITIES,
      Item: city,
    })
  );
  return city;
}

export async function updateCity(
  id: string,
  data: Partial<Pick<CityItem, "slug" | "objectCount" | "translations">>
): Promise<CityItem> {
  const updateExpr: string[] = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (data.slug !== undefined) {
    updateExpr.push("#slug = :slug");
    exprValues[":slug"] = data.slug;
    exprNames["#slug"] = "slug";
  }
  if (data.objectCount !== undefined) {
    updateExpr.push("#objectCount = :objectCount");
    exprValues[":objectCount"] = data.objectCount;
    exprNames["#objectCount"] = "objectCount";
  }
  if (data.translations !== undefined) {
    updateExpr.push("#translations = :translations");
    exprValues[":translations"] = data.translations;
    exprNames["#translations"] = "translations";
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.CITIES,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames:
        Object.keys(exprNames).length > 0 ? exprNames : undefined,
      ReturnValues: "ALL_NEW",
    })
  );
  return result.Attributes as CityItem;
}

export async function deleteCity(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.CITIES,
      Key: { id },
    })
  );
}

// --- Space Object types and CRUD ---

export interface SpaceObjectTranslation {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  workingHours: string;
  transport: string;
  ticketPrices: string;
}

export interface SpaceObjectItem {
  id: string;
  citySlug: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: string;
  updatedAt: string;
  translations: {
    ru: SpaceObjectTranslation;
    en: SpaceObjectTranslation;
    fr: SpaceObjectTranslation;
  };
}

export async function getAllSpaceObjects(): Promise<SpaceObjectItem[]> {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TableName.SPACE_OBJECTS,
    })
  );
  return (result.Items as SpaceObjectItem[]) ?? [];
}

export async function getSpaceObjectsByCity(
  citySlug: string
): Promise<SpaceObjectItem[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TableName.SPACE_OBJECTS,
      IndexName: IndexName.SPACE_OBJECTS_CITY,
      KeyConditionExpression: "#citySlug = :citySlug",
      ExpressionAttributeNames: {
        "#citySlug": "citySlug",
      },
      ExpressionAttributeValues: {
        ":citySlug": citySlug,
      },
    })
  );
  return (result.Items as SpaceObjectItem[]) ?? [];
}

export async function getSpaceObjectById(
  id: string
): Promise<SpaceObjectItem | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TableName.SPACE_OBJECTS,
      Key: { id },
    })
  );
  return (result.Item as SpaceObjectItem) ?? null;
}

export async function createSpaceObject(
  data: Omit<SpaceObjectItem, "createdAt" | "updatedAt">
): Promise<SpaceObjectItem> {
  const now = new Date().toISOString();
  const obj: SpaceObjectItem = { ...data, createdAt: now, updatedAt: now };
  await docClient.send(
    new PutCommand({
      TableName: TableName.SPACE_OBJECTS,
      Item: obj,
    })
  );
  return obj;
}

export async function updateSpaceObject(
  id: string,
  data: Partial<
    Pick<SpaceObjectItem, "citySlug" | "imageUrl" | "audioUrl" | "translations">
  >
): Promise<SpaceObjectItem> {
  const updateExpr: string[] = [];
  const exprValues: Record<string, unknown> = {};
  const exprNames: Record<string, string> = {};

  if (data.citySlug !== undefined) {
    updateExpr.push("#citySlug = :citySlug");
    exprValues[":citySlug"] = data.citySlug;
    exprNames["#citySlug"] = "citySlug";
  }
  if (data.imageUrl !== undefined) {
    updateExpr.push("#imageUrl = :imageUrl");
    exprValues[":imageUrl"] = data.imageUrl;
    exprNames["#imageUrl"] = "imageUrl";
  }
  if (data.audioUrl !== undefined) {
    updateExpr.push("#audioUrl = :audioUrl");
    exprValues[":audioUrl"] = data.audioUrl;
    exprNames["#audioUrl"] = "audioUrl";
  }
  if (data.translations !== undefined) {
    updateExpr.push("#translations = :translations");
    exprValues[":translations"] = data.translations;
    exprNames["#translations"] = "translations";
  }

  updateExpr.push("updatedAt = :updatedAt");
  exprValues[":updatedAt"] = new Date().toISOString();

  const result = await docClient.send(
    new UpdateCommand({
      TableName: TableName.SPACE_OBJECTS,
      Key: { id },
      UpdateExpression: `set ${updateExpr.join(", ")}`,
      ExpressionAttributeValues: exprValues,
      ExpressionAttributeNames:
        Object.keys(exprNames).length > 0 ? exprNames : undefined,
      ReturnValues: "ALL_NEW",
    })
  );
  return result.Attributes as SpaceObjectItem;
}

export async function deleteSpaceObject(id: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TableName.SPACE_OBJECTS,
      Key: { id },
    })
  );
}
