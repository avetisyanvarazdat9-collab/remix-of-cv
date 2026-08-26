-- Seed homepage Areas of expertise section chrome.

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'home',
    'expertise.eyebrow',
    'Areas of expertise section eyebrow',
    '{"hy":"Areas of expertise","en":"Areas of expertise","ru":"Areas of expertise"}'::jsonb
  ),
  (
    'home',
    'expertise.heading',
    'Areas of expertise section heading',
    '{"hy":"Where I can help","en":"Where I can help","ru":"Where I can help"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
