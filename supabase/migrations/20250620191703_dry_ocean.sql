/*
  # Create comprehensive profile tables for JobSpark

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - Links to auth.users
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `phone` (text) - Contact phone number
      - `location` (text) - City, Province location
      - `date_of_birth` (date) - Date of birth
      - `professional_summary` (text) - Career summary
      - `profile_completed` (boolean) - Profile completion status
      - `created_at` (timestamp) - Profile creation timestamp
      - `updated_at` (timestamp) - Last profile update timestamp

    - `work_experiences`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - Links to profiles
      - `job_title` (text) - Position title
      - `company` (text) - Company name
      - `location` (text) - Work location
      - `start_date` (text) - Start date (MM/YYYY format)
      - `end_date` (text) - End date (MM/YYYY format)
      - `is_current_role` (boolean) - Currently working here
      - `description` (text) - Role description and achievements
      - `created_at` (timestamp) - Record creation timestamp

    - `education`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - Links to profiles
      - `institution` (text) - Educational institution name
      - `degree` (text) - Degree or qualification
      - `field_of_study` (text) - Field of study
      - `start_date` (text) - Start date (MM/YYYY format)
      - `end_date` (text) - End date (MM/YYYY format)
      - `is_currently_studying` (boolean) - Currently studying here
      - `grade` (text) - Grade or GPA achieved
      - `created_at` (timestamp) - Record creation timestamp

    - `skills`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - Links to profiles
      - `category` (text) - Skill category (technical, soft, languages)
      - `name` (text) - Skill name
      - `created_at` (timestamp) - Record creation timestamp

  2. Security
    - Enable RLS on all profile tables
    - Add policies for authenticated users to manage their own profile data
    - Ensure users can only access their own profile information

  3. Indexes
    - Add indexes for efficient querying by user_id
    - Add indexes for skill categories for filtering
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  location text,
  date_of_birth date,
  professional_summary text,
  profile_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create work_experiences table
CREATE TABLE IF NOT EXISTS work_experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  job_title text NOT NULL,
  company text NOT NULL,
  location text,
  start_date text,
  end_date text,
  is_current_role boolean DEFAULT false,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  institution text NOT NULL,
  degree text NOT NULL,
  field_of_study text,
  start_date text,
  end_date text,
  is_currently_studying boolean DEFAULT false,
  grade text,
  created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL CHECK (category IN ('technical', 'soft', 'languages')),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for work_experiences table
CREATE POLICY "Users can read own work experiences"
  ON work_experiences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own work experiences"
  ON work_experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own work experiences"
  ON work_experiences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own work experiences"
  ON work_experiences
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for education table
CREATE POLICY "Users can read own education"
  ON education
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own education"
  ON education
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own education"
  ON education
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own education"
  ON education
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for skills table
CREATE POLICY "Users can read own skills"
  ON skills
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON skills
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON skills
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON skills
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_work_experiences_user_id ON work_experiences(user_id);
CREATE INDEX IF NOT EXISTS idx_education_user_id ON education(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON skills(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Create updated_at trigger for profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();