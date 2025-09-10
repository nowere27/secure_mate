/*
  # Create bodyguards table

  1. New Tables
    - `bodyguards`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone` (text)
      - `email` (text, unique)
      - `password` (text)
      - `profile_photo` (text, storage URL)
      - `experience` (integer, years)
      - `hourly_rate` (numeric)
      - `location` (text)
      - `id_proof` (text, storage URL)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `bodyguards` table
    - Add policy for bodyguards to read their own data
    - Add policy for authenticated users to insert their profile
*/

CREATE TABLE IF NOT EXISTS bodyguards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  profile_photo text,
  experience integer NOT NULL,
  hourly_rate numeric NOT NULL,
  location text NOT NULL,
  id_proof text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bodyguards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bodyguards can read own data"
  ON bodyguards
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can insert bodyguard profile"
  ON bodyguards
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create storage bucket for bodyguard files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('bodyguard-files', 'bodyguard-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload bodyguard files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'bodyguard-files');

CREATE POLICY "Anyone can view bodyguard files"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'bodyguard-files');