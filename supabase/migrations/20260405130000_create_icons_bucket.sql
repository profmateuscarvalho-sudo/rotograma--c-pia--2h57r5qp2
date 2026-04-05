-- Create bucket for risk icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('risk-icons', 'risk-icons', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies if they exist (idempotent)
DROP POLICY IF EXISTS "Public Access risk-icons" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload risk-icons" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update risk-icons" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete risk-icons" ON storage.objects;

-- Create policies
CREATE POLICY "Public Access risk-icons" ON storage.objects
  FOR SELECT USING (bucket_id = 'risk-icons');

CREATE POLICY "Auth Upload risk-icons" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'risk-icons');

CREATE POLICY "Auth Update risk-icons" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'risk-icons');

CREATE POLICY "Auth Delete risk-icons" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'risk-icons');
