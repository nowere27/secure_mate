/*
  # Create bodyguards table

  1. New Tables
    - `bodyguards`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text, not null)
      - `phone` (text, not null)
      - `email` (text, unique, not null)
      - `profile_photo` (text, nullable)
      - `experience` (integer, not null)
      - `hourly_rate` (numeric, not null)
      - `location` (text, not null)
      - `id_proof` (text, nullable)
      - `status` (text, default 'pending')
      - `created_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `bodyguards` table
    - Add policy for authenticated users to read approved bodyguards
    - Add policy for bodyguards to update their own profile
    - Add policy for bodyguards to insert their own profile
*/

CREATE TABLE IF NOT EXISTS public.bodyguards (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  profile_photo TEXT,
  experience INTEGER NOT NULL,
  hourly_rate NUMERIC(10, 2) NOT NULL,
  location TEXT NOT NULL,
  id_proof TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.bodyguards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read bodyguards"
  ON public.bodyguards
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow bodyguards to update their own profile"
  ON public.bodyguards
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Allow bodyguards to insert their own profile"
  ON public.bodyguards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);