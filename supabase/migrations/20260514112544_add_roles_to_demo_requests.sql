/*
  # Add roles column to demo_requests

  1. Changes
    - Add `roles` (text array) column to `demo_requests` for storing multi-select "describe yourself" values
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'demo_requests' AND column_name = 'roles'
  ) THEN
    ALTER TABLE demo_requests ADD COLUMN roles text[] DEFAULT '{}';
  END IF;
END $$;
