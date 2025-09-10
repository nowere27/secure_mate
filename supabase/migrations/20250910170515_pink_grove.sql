/*
  # Add automatic updated_at triggers

  1. Functions
    - Create `update_updated_at_column()` function to automatically update the updated_at column

  2. Triggers
    - Add trigger for bodyguards table
    - Add trigger for bookings table  
    - Add trigger for profiles table

  3. Notes
    - These triggers will automatically set updated_at to the current timestamp whenever a row is updated
*/

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_bodyguards_updated_at'
  ) THEN
    CREATE TRIGGER update_bodyguards_updated_at
    BEFORE UPDATE ON public.bodyguards
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_bookings_updated_at'
  ) THEN
    CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_profiles_updated_at'
  ) THEN
    CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;