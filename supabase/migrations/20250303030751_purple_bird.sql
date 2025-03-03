/*
  # Create activities table

  1. New Tables
    - `activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `date` (date)
      - `city` (text)
      - `state` (text)
      - `type` (text)
      - `coursename` (text, for Golf)
      - `score` (integer, for Golf)
      - `beachname` (text, for Surfing)
      - `duration` (float, for Surfing and Mountain Biking)
      - `distance` (float, for Mountain Biking)
      - `trailsystem` (text, for Mountain Biking)
      - `weather` (jsonb, for storing weather data)
      - `created_at` (timestamp with time zone)
  
  2. Security
    - Enable RLS on `activities` table
    - Add policy for authenticated users to insert their own data
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  type text NOT NULL,
  coursename text,
  score integer,
  beachname text,
  duration float,
  distance float,
  trailsystem text,
  weather jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own activities"
  ON activities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities"
  ON activities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
  ON activities
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);