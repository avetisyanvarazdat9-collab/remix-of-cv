ALTER TABLE public.navigation_menu
  ADD COLUMN IF NOT EXISTS label_hy text,
  ADD COLUMN IF NOT EXISTS label_en text,
  ADD COLUMN IF NOT EXISTS label_ru text;

UPDATE public.navigation_menu SET label_en = COALESCE(label_en, label) WHERE label_en IS NULL;
UPDATE public.navigation_menu SET label_hy = COALESCE(label_hy, label_en, label) WHERE label_hy IS NULL;
UPDATE public.navigation_menu SET label_ru = COALESCE(label_ru, label_en, label) WHERE label_ru IS NULL;

ALTER TABLE public.navigation_menu ALTER COLUMN label_en SET NOT NULL;

-- Seed Armenian and Russian translations for default menu items based on the English label.
UPDATE public.navigation_menu SET label_hy = 'Գլխավոր',        label_ru = 'Главная'      WHERE lower(label_en) = 'home';
UPDATE public.navigation_menu SET label_hy = 'Իմ մասին',       label_ru = 'Обо мне'      WHERE lower(label_en) = 'about';
UPDATE public.navigation_menu SET label_hy = 'Նախագծեր',       label_ru = 'Проекты'      WHERE lower(label_en) = 'projects';
UPDATE public.navigation_menu SET label_hy = 'Դասընթացներ',    label_ru = 'Курсы'        WHERE lower(label_en) = 'courses';
UPDATE public.navigation_menu SET label_hy = 'Տեսադաս',         label_ru = 'Видео'        WHERE lower(label_en) = 'video';
UPDATE public.navigation_menu SET label_hy = 'Ելույթներ',       label_ru = 'Доклады'      WHERE lower(label_en) = 'talks';
UPDATE public.navigation_menu SET label_hy = 'Բլոգ',            label_ru = 'Блог'         WHERE lower(label_en) = 'blog';
UPDATE public.navigation_menu SET label_hy = 'Ընկերություններ', label_ru = 'Компании'     WHERE lower(label_en) = 'companies';
UPDATE public.navigation_menu SET label_hy = 'Կապ',             label_ru = 'Контакты'     WHERE lower(label_en) = 'contact';