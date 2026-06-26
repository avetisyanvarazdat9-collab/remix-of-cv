
-- Ensure label_en is populated from legacy label
UPDATE public.navigation_menu
SET label_en = COALESCE(NULLIF(label_en, ''), label)
WHERE label_en IS NULL OR label_en = '';

-- Backfill HY/RU from label_en when missing
UPDATE public.navigation_menu
SET label_hy = COALESCE(NULLIF(label_hy, ''), label_en, label)
WHERE label_hy IS NULL OR label_hy = '';

UPDATE public.navigation_menu
SET label_ru = COALESCE(NULLIF(label_ru, ''), label_en, label)
WHERE label_ru IS NULL OR label_ru = '';

-- Known translations for default paths (only overrides if currently equal to English fallback)
UPDATE public.navigation_menu SET label_hy = 'Գլխավոր', label_ru = 'Главная' WHERE path = '/' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Իմ մասին', label_ru = 'Обо мне' WHERE path = '/about' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Նախագծեր', label_ru = 'Проекты' WHERE path = '/projects' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Դասընթացներ', label_ru = 'Курсы' WHERE path = '/courses' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Տեսադասեր', label_ru = 'Видеокурсы' WHERE path = '/video-courses' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Բլոգ', label_ru = 'Блог' WHERE path = '/blog' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Ելույթներ', label_ru = 'Выступления' WHERE path = '/talks' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Ընկերություններ', label_ru = 'Компании' WHERE path = '/companies' AND label_hy = label_en;
UPDATE public.navigation_menu SET label_hy = 'Կապ', label_ru = 'Контакты' WHERE path = '/contact' AND label_hy = label_en;

-- Enforce NOT NULL + defaults going forward
ALTER TABLE public.navigation_menu
  ALTER COLUMN label_hy SET DEFAULT '',
  ALTER COLUMN label_ru SET DEFAULT '',
  ALTER COLUMN label_hy SET NOT NULL,
  ALTER COLUMN label_ru SET NOT NULL;
