-- Storage Policy Fix Only
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Authenticated Insert Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Images" ON storage.objects;

-- Allow public read access
CREATE POLICY "Public Read Images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Allow public upload access (for legacy admin support)
CREATE POLICY "Public Upload Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
