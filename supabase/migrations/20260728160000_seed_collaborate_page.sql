-- Seed Collaborate hub page_content rows (English placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'collaborate',
    'seo.title',
    'Collaborate page SEO document title',
    '{"hy":"Collaborate Research, Talks & Partnerships | Dr. Varazdat Avetisyan","en":"Collaborate Research, Talks & Partnerships | Dr. Varazdat Avetisyan","ru":"Collaborate Research, Talks & Partnerships | Dr. Varazdat Avetisyan"}'::jsonb
  ),
  (
    'collaborate',
    'seo.description',
    'Collaborate page SEO meta description',
    '{"hy":"Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan.","en":"Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan.","ru":"Research collaborations, speaking engagements, academic partnerships, and applied AI projects with Dr. Varazdat Avetisyan."}'::jsonb
  ),
  (
    'collaborate',
    'seo.keywords',
    'Collaborate page SEO meta keywords',
    '{"hy":"AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker","en":"AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker","ru":"AI Speaker Armenia, Research collaboration, Academic partnership, AI keynote speaker"}'::jsonb
  ),
  (
    'collaborate',
    'hero.eyebrow',
    'Collaborate hero eyebrow',
    '{"hy":"Collaborate","en":"Collaborate","ru":"Collaborate"}'::jsonb
  ),
  (
    'collaborate',
    'hero.heading',
    'Collaborate hero heading',
    '{"hy":"Research, speaking, and partnerships","en":"Research, speaking, and partnerships","ru":"Research, speaking, and partnerships"}'::jsonb
  ),
  (
    'collaborate',
    'hero.subheading',
    'Collaborate hero subheading',
    '{"hy":"From joint research and grant proposals to keynote talks and cross-institutional programs, let''s build something together.","en":"From joint research and grant proposals to keynote talks and cross-institutional programs, let''s build something together.","ru":"From joint research and grant proposals to keynote talks and cross-institutional programs, let''s build something together."}'::jsonb
  ),
  (
    'collaborate',
    'hero.cta',
    'Collaborate hero primary CTA',
    '{"hy":"Propose a Collaboration","en":"Propose a Collaboration","ru":"Propose a Collaboration"}'::jsonb
  ),
  (
    'collaborate',
    'hero.cta_secondary',
    'Collaborate hero secondary CTA',
    '{"hy":"See Talks & Events","en":"See Talks & Events","ru":"See Talks & Events"}'::jsonb
  ),
  (
    'collaborate',
    'projects.eyebrow',
    'Projects section eyebrow',
    '{"hy":"Projects","en":"Projects","ru":"Projects"}'::jsonb
  ),
  (
    'collaborate',
    'projects.heading',
    'Projects section heading',
    '{"hy":"Selected research & applied work","en":"Selected research & applied work","ru":"Selected research & applied work"}'::jsonb
  ),
  (
    'collaborate',
    'speaking.eyebrow',
    'Speaking section eyebrow',
    '{"hy":"Speaking","en":"Speaking","ru":"Speaking"}'::jsonb
  ),
  (
    'collaborate',
    'speaking.heading',
    'Speaking section heading',
    '{"hy":"Recent talks & events","en":"Recent talks & events","ru":"Recent talks & events"}'::jsonb
  ),
  (
    'collaborate',
    'partners.eyebrow',
    'Partners section eyebrow',
    '{"hy":"Partners","en":"Partners","ru":"Partners"}'::jsonb
  ),
  (
    'collaborate',
    'partners.heading',
    'Partners section heading',
    '{"hy":"Institutions I collaborate with","en":"Institutions I collaborate with","ru":"Institutions I collaborate with"}'::jsonb
  ),
  (
    'collaborate',
    'cta.heading',
    'Bottom CTA heading',
    '{"hy":"Have an idea worth exploring together?","en":"Have an idea worth exploring together?","ru":"Have an idea worth exploring together?"}'::jsonb
  ),
  (
    'collaborate',
    'cta.body',
    'Bottom CTA body',
    '{"hy":"Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome.","en":"Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome.","ru":"Research collaborations, guest lectures, joint grants, keynote talks, and industry partnerships are all welcome."}'::jsonb
  ),
  (
    'collaborate',
    'cta.button',
    'Bottom CTA button',
    '{"hy":"Get in Touch","en":"Get in Touch","ru":"Get in Touch"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
