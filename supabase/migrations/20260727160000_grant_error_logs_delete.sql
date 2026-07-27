-- error_logs: allow authenticated role to DELETE (RLS limits to admins)
GRANT DELETE ON public.error_logs TO authenticated;

DROP POLICY IF EXISTS "Admins can delete error logs" ON public.error_logs;
CREATE POLICY "Admins can delete error logs" ON public.error_logs
  FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles r
      WHERE r.user_id = auth.uid()
        AND r.role = 'admin'
    )
  );
