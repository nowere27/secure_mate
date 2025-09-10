/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key, auto-generated)
      - `client_id` (uuid, references auth.users, not null)
      - `bodyguard_id` (uuid, references bodyguards, not null)
      - `booking_date` (date, not null)
      - `booking_time` (time, not null)
      - `duration_hours` (integer, not null)
      - `total_amount` (numeric, not null)
      - `status` (text, default 'pending')
      - `special_requirements` (text, nullable)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for clients to read their own bookings
    - Add policy for bodyguards to read their assigned bookings
    - Add policy for clients to create bookings
    - Add policy for clients to update their own bookings
    - Add policy for bodyguards to update their assigned bookings
*/

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id),
  bodyguard_id UUID NOT NULL REFERENCES public.bodyguards(id),
  booking_date DATE NOT NULL,
  booking_time TIME WITHOUT TIME ZONE NOT NULL,
  duration_hours INTEGER NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  special_requirements TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow clients to read their own bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Allow bodyguards to read their assigned bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = bodyguard_id);

CREATE POLICY "Allow clients to create bookings"
  ON public.bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Allow clients to update their own bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id);

CREATE POLICY "Allow bodyguards to update their assigned bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = bodyguard_id);