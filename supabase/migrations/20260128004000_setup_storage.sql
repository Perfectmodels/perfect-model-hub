-- Create storage buckets for images and documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS for the buckets
-- Images: Anyone can read, Authenticated users can upload
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Documents: Only Admin can read/write
CREATE POLICY "Admin Access" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND (select auth.role()) = 'service_role');
CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND (select auth.role()) = 'service_role');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND (select auth.role()) = 'service_role');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND (select auth.role()) = 'service_role');
