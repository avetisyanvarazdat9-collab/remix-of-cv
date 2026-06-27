GRANT SELECT ON public.certifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certifications TO authenticated;
GRANT ALL ON public.certifications TO service_role;