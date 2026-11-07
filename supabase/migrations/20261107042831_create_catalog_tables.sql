/*
# Create catalog tables for cities, churches and media

1. New Tables
- `cities`: id (text, primary key), slug (unique), object_count, translations (jsonb with ru/en/fr name and description), timestamps.
- `space_objects`: churches and monasteries. id (text, primary key), city_slug (references cities.slug), slug, translations (jsonb with ru/en/fr name, slug, description, longDescription, workingHours, transport, ticketPrices), timestamps.
- `object_media`: photos and audio files attached to an object. id (uuid), object_id, kind ('photo' or 'audio'), url, storage_path, position, created_at.

2. Security
- Enable RLS on all three tables.
- Public visitors (anon) and signed-in users can only read. No write policies are added, so writes happen only on the server with the service role key after the admin login check.
- service_role gets full access for the admin API routes.

3. Notes
- Idempotent: uses IF NOT EXISTS and DROP POLICY IF EXISTS.
- No existing data is changed or removed.
*/

CREATE TABLE IF NOT EXISTS cities (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  object_count integer NOT NULL DEFAULT 0,
  translations jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS space_objects (
  id text PRIMARY KEY,
  city_slug text NOT NULL REFERENCES cities(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
  slug text NOT NULL,
  translations jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS space_objects_city_slug_idx ON space_objects (city_slug);

CREATE TABLE IF NOT EXISTS object_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  object_id text NOT NULL REFERENCES space_objects(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('photo', 'audio')),
  url text NOT NULL,
  storage_path text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS object_media_object_id_idx ON object_media (object_id);

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE space_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE object_media ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON cities, space_objects, object_media TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON cities, space_objects, object_media TO service_role;

DROP POLICY IF EXISTS "public_read_cities" ON cities;
CREATE POLICY "public_read_cities" ON cities FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_space_objects" ON space_objects;
CREATE POLICY "public_read_space_objects" ON space_objects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_read_object_media" ON object_media;
CREATE POLICY "public_read_object_media" ON object_media FOR SELECT
  TO anon, authenticated USING (true);
