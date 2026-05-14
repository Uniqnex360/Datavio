/*
  # Create demo_requests table

  1. New Tables
    - `demo_requests`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `catalog_challenge` (text) — selected dropdown value or "other"
      - `other_challenge` (text) — filled when catalog_challenge is "other"
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous INSERT so visitors can submit without auth
    - No SELECT policy for public (only service role can read submissions)
*/

CREATE TABLE IF NOT EXISTS demo_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text NOT NULL,
  catalog_challenge text NOT NULL,
  other_challenge text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a demo request"
  ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);
