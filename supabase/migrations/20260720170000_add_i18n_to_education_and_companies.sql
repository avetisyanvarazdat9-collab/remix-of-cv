-- education and companies were omitted from the original i18n migration.
-- CrudPage writes payload.i18n for translatable fields on these tables.

ALTER TABLE public.education ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.companies ADD COLUMN IF NOT EXISTS i18n jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Backfill existing plain-text values into i18n (safe to rerun).
UPDATE public.education
SET i18n = i18n
  || jsonb_build_object(
    'institution', jsonb_build_object('hy', COALESCE(institution, ''), 'en', COALESCE(institution, ''), 'ru', COALESCE(institution, '')),
    'degree', jsonb_build_object('hy', COALESCE(degree, ''), 'en', COALESCE(degree, ''), 'ru', COALESCE(degree, '')),
    'field', jsonb_build_object('hy', COALESCE(field, ''), 'en', COALESCE(field, ''), 'ru', COALESCE(field, '')),
    'description', jsonb_build_object('hy', COALESCE(description, ''), 'en', COALESCE(description, ''), 'ru', COALESCE(description, ''))
  )
WHERE NOT (i18n ? 'institution');

UPDATE public.companies
SET i18n = i18n
  || jsonb_build_object(
    'role', jsonb_build_object('hy', COALESCE(role, ''), 'en', COALESCE(role, ''), 'ru', COALESCE(role, '')),
    'description', jsonb_build_object('hy', COALESCE(description, ''), 'en', COALESCE(description, ''), 'ru', COALESCE(description, ''))
  )
WHERE NOT (i18n ? 'role');

-- Ask PostgREST to refresh its schema cache after DDL.
NOTIFY pgrst, 'reload schema';
