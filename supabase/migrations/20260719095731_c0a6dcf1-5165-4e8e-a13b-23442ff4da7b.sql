
CREATE POLICY "portfolio-assets public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio-assets');
CREATE POLICY "portfolio-assets authenticated write" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "portfolio-assets authenticated update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');
CREATE POLICY "portfolio-assets authenticated delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');
