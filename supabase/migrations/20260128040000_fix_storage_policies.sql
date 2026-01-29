-- Drop existing policies to start fresh and avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
DROP POLICY IF EXISTS "Give me uploads" ON storage.objects;

-- Ensure the images bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy 1: Allow public read access to all objects in the 'images' bucket
CREATE POLICY "Public Read Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Policy 2: Allow authenticated users to upload files to the 'images' bucket
CREATE POLICY "Authenticated Insert Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to update their own files (or all files in 'images' for now to be safe)
CREATE POLICY "Authenticated Update Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to delete files
CREATE POLICY "Authenticated Delete Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');
