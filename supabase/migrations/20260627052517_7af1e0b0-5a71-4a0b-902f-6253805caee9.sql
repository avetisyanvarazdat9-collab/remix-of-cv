REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
DROP POLICY IF EXISTS "Public can view visible certifications" ON public.certifications;
CREATE POLICY "Anon view visible certifications" ON public.certifications
  FOR SELECT TO anon USING (is_visible = true);
CREATE POLICY "Authenticated view certifications" ON public.certifications
  FOR SELECT TO authenticated USING (is_visible = true OR public.has_role(auth.uid(), 'admin'::app_role));