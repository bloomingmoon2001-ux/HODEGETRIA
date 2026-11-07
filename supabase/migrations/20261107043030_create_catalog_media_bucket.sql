/*
# Create public storage bucket for church photos and audio

1. New Storage
- `catalog-media` bucket: public read so photos and audio play directly on the site.
- Size limit 50 MB per file. Allowed types: JPEG, PNG, WebP, MP3, WAV, OGG, WebM, M4A.

2. Security
- Anonymous visitors can read files through the public URL only.
- No storage write policies are added. Uploads happen on the server with the service role key after the admin login check.

3. Notes
- Idempotent: uses ON CONFLICT DO NOTHING.
- No existing data is changed.
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'catalog-media',
  'catalog-media',
  true,
  52428800,
  ARRAY['image/jpeg','image/png','image/webp','audio/mpeg','audio/mp3','audio/wav','audio/ogg','audio/webm','audio/mp4','audio/x-m4a']
)
ON CONFLICT (id) DO NOTHING;
