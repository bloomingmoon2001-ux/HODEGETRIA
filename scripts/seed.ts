import { docClient } from "../lib/db";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { TableName } from "../lib/schema";
import { mockCities, mockSpaceObjects } from "../lib/mock-data";

async function seed() {
  console.log("🌱 Запуск сидирования данных...");

  for (const city of mockCities) {
    await docClient.send(
      new PutCommand({
        TableName: TableName.CITIES,
        Item: city,
      })
    );
    console.log(`  ✓ Город: ${city.id}`);
  }

  for (const obj of mockSpaceObjects) {
    await docClient.send(
      new PutCommand({
        TableName: TableName.SPACE_OBJECTS,
        Item: obj,
      })
    );
    console.log(`  ✓ Объект: ${obj.id}`);
  }

  console.log("🎉 Сидирование завершено!");
}

seed().catch((e) => {
  console.error("❌ Ошибка сидирования:", e);
  process.exit(1);
});
