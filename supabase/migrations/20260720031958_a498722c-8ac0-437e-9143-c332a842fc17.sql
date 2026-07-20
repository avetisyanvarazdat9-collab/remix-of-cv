CREATE OR REPLACE FUNCTION public.admin_save_profile(p_profile_id uuid, p_profile jsonb)
RETURNS public.profile
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result public.profile;
  target_id uuid;
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;

  IF p_profile_id IS NOT NULL THEN
    UPDATE public.profile
       SET name = COALESCE(NULLIF(p_profile->>'name', ''), name, 'Dr. Varazdat Avetisyan'),
           title = COALESCE(NULLIF(p_profile->>'title', ''), title, 'AI/ML Researcher, Lecturer & Entrepreneur'),
           tagline = NULLIF(p_profile->>'tagline', ''),
           location = NULLIF(p_profile->>'location', ''),
           bio = NULLIF(p_profile->>'bio', ''),
           email = NULLIF(p_profile->>'email', ''),
           phone = NULLIF(p_profile->>'phone', ''),
           photo_url = NULLIF(p_profile->>'photo_url', ''),
           cv_url = NULLIF(p_profile->>'cv_url', ''),
           github_url = NULLIF(p_profile->>'github_url', ''),
           linkedin_url = NULLIF(p_profile->>'linkedin_url', ''),
           twitter_url = NULLIF(p_profile->>'twitter_url', ''),
           website_url = NULLIF(p_profile->>'website_url', ''),
           i18n = COALESCE(p_profile->'i18n', i18n, '{}'::jsonb),
           updated_at = now()
     WHERE id = p_profile_id
     RETURNING * INTO result;
  END IF;

  IF result.id IS NULL THEN
    SELECT id INTO target_id FROM public.profile ORDER BY created_at ASC LIMIT 1;

    IF target_id IS NOT NULL THEN
      UPDATE public.profile
         SET name = COALESCE(NULLIF(p_profile->>'name', ''), name, 'Dr. Varazdat Avetisyan'),
             title = COALESCE(NULLIF(p_profile->>'title', ''), title, 'AI/ML Researcher, Lecturer & Entrepreneur'),
             tagline = NULLIF(p_profile->>'tagline', ''),
             location = NULLIF(p_profile->>'location', ''),
             bio = NULLIF(p_profile->>'bio', ''),
             email = NULLIF(p_profile->>'email', ''),
             phone = NULLIF(p_profile->>'phone', ''),
             photo_url = NULLIF(p_profile->>'photo_url', ''),
             cv_url = NULLIF(p_profile->>'cv_url', ''),
             github_url = NULLIF(p_profile->>'github_url', ''),
             linkedin_url = NULLIF(p_profile->>'linkedin_url', ''),
             twitter_url = NULLIF(p_profile->>'twitter_url', ''),
             website_url = NULLIF(p_profile->>'website_url', ''),
             i18n = COALESCE(p_profile->'i18n', i18n, '{}'::jsonb),
             updated_at = now()
       WHERE id = target_id
       RETURNING * INTO result;
    ELSE
      INSERT INTO public.profile (
        name, title, tagline, location, bio, email, phone, photo_url, cv_url,
        github_url, linkedin_url, twitter_url, website_url, i18n
      ) VALUES (
        COALESCE(NULLIF(p_profile->>'name', ''), 'Dr. Varazdat Avetisyan'),
        COALESCE(NULLIF(p_profile->>'title', ''), 'AI/ML Researcher, Lecturer & Entrepreneur'),
        NULLIF(p_profile->>'tagline', ''),
        NULLIF(p_profile->>'location', ''),
        NULLIF(p_profile->>'bio', ''),
        NULLIF(p_profile->>'email', ''),
        NULLIF(p_profile->>'phone', ''),
        NULLIF(p_profile->>'photo_url', ''),
        NULLIF(p_profile->>'cv_url', ''),
        NULLIF(p_profile->>'github_url', ''),
        NULLIF(p_profile->>'linkedin_url', ''),
        NULLIF(p_profile->>'twitter_url', ''),
        NULLIF(p_profile->>'website_url', ''),
        COALESCE(p_profile->'i18n', '{}'::jsonb)
      )
      RETURNING * INTO result;
    END IF;
  END IF;

  RETURN result;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_save_profile(uuid, jsonb) FROM public;
GRANT EXECUTE ON FUNCTION public.admin_save_profile(uuid, jsonb) TO authenticated;