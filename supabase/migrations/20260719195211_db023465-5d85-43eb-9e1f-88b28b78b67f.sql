DROP POLICY IF EXISTS "admins manage user_roles" ON public.user_roles;
DROP POLICY IF EXISTS admin_all ON public.user_roles;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can read their own roles" ON public.user_roles;
CREATE POLICY "users can read their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);