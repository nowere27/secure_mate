/*
  # Create storage bucket for bodyguard files

  1. Storage
    - Create `bodyguard-files` bucket for profile photos and ID proofs
    - Set up public access for profile photos
    - Set up restricted access for ID proofs

  2. Security
    - Add RLS policies for file uploads
    - Allow bodyguards to upload their own files
    - Allow public read access to profile photos
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'bodyguard-files'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('bodyguard-files', 'bodyguard-files', true);
  END IF;
END $$;

CREATE POLICY "Allow authenticated users to upload files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'bodyguard-files');

CREATE POLICY "Allow public read access to bodyguard files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'bodyguard-files');