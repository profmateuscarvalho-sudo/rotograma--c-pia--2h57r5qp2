-- Create a bucket for storing general images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public read access
DROP POLICY IF EXISTS "Public Access to images" ON storage.objects;
CREATE POLICY "Public Access to images" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Policy to allow authenticated users to upload
DROP POLICY IF EXISTS "Auth users can upload images" ON storage.objects;
CREATE POLICY "Auth users can upload images" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
