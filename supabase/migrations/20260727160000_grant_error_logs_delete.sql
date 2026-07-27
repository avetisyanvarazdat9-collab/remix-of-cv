-- error_logs: allow authenticated role to DELETE (RLS limits to admins)
GRANT DELETE ON public.error_logs TO authenticated;

DROP POLICY IF EXISTS "Admins can delete error logs" ON public.error_logs;
CREATE POLICY "Admins can delete error logs" ON public.error_logs
  FOR DELETE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
