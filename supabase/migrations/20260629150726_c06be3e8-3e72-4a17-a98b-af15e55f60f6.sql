
-- 1. Move has_role to a private schema (not exposed by PostgREST)
CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 2. Recreate every policy referencing public.has_role to use private.has_role
DROP POLICY IF EXISTS "Admins can delete error logs" ON public.error_logs;
CREATE POLICY "Admins can delete error logs" ON public.error_logs
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view error logs" ON public.error_logs;
CREATE POLICY "Admins can view error logs" ON public.error_logs
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete nav" ON public.navigation_menu;
CREATE POLICY "Admins can delete nav" ON public.navigation_menu
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert nav" ON public.navigation_menu;
CREATE POLICY "Admins can insert nav" ON public.navigation_menu
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update nav" ON public.navigation_menu;
CREATE POLICY "Admins can update nav" ON public.navigation_menu
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins can insert home_content" ON public.home_content;
CREATE POLICY "admins can insert home_content" ON public.home_content
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins can update home_content" ON public.home_content;
CREATE POLICY "admins can update home_content" ON public.home_content
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins can insert site_settings" ON public.site_settings;
CREATE POLICY "admins can insert site_settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins can update site_settings" ON public.site_settings;
CREATE POLICY "admins can update site_settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins delete messages" ON public.messages;
CREATE POLICY "admins delete messages" ON public.messages
  FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins read messages" ON public.messages;
CREATE POLICY "admins read messages" ON public.messages
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins update messages" ON public.messages;
CREATE POLICY "admins update messages" ON public.messages
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage companies" ON public.companies;
CREATE POLICY "admins manage companies" ON public.companies
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage courses" ON public.courses;
CREATE POLICY "admins manage courses" ON public.courses
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage education" ON public.education;
CREATE POLICY "admins manage education" ON public.education
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage posts" ON public.blog_posts;
CREATE POLICY "admins manage posts" ON public.blog_posts
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins read all posts" ON public.blog_posts;
CREATE POLICY "admins read all posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage profile" ON public.profile;
CREATE POLICY "admins manage profile" ON public.profile
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage projects" ON public.projects;
CREATE POLICY "admins manage projects" ON public.projects
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage skills" ON public.skills;
CREATE POLICY "admins manage skills" ON public.skills
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage talks" ON public.talks;
CREATE POLICY "admins manage talks" ON public.talks
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "admins manage video_courses" ON public.video_courses;
CREATE POLICY "admins manage video_courses" ON public.video_courses
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins manage certifications" ON public.certifications;
CREATE POLICY "Admins manage certifications" ON public.certifications
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated view certifications" ON public.certifications;
CREATE POLICY "Authenticated view certifications" ON public.certifications
  FOR SELECT TO authenticated USING (is_visible = true OR private.has_role(auth.uid(), 'admin'));

-- 3. Drop the public has_role so it is no longer in the API schema
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 4. Lock down user_roles: tighten grants and add explicit admin-only write policy
REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

CREATE POLICY "admins manage user_roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
