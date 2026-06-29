ALTER TABLE public.companies ALTER COLUMN name DROP NOT NULL;
ALTER TABLE public.education ALTER COLUMN institution DROP NOT NULL;
ALTER TABLE public.education ALTER COLUMN degree DROP NOT NULL;
ALTER TABLE public.certifications ALTER COLUMN name DROP NOT NULL;