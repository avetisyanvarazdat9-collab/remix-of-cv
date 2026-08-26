-- Seed Impact hub page_content rows (English placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'impact',
    'seo.title',
    'Impact page SEO document title',
    '{"hy":"Impact Achievements, Talks & Recognition | Dr. Varazdat Avetisyan","en":"Impact Achievements, Talks & Recognition | Dr. Varazdat Avetisyan","ru":"Impact Achievements, Talks & Recognition | Dr. Varazdat Avetisyan"}'::jsonb
  ),
  (
    'impact',
    'seo.description',
    'Impact page SEO meta description',
    '{"hy":"Measurable impact of Dr. Varazdat Avetisyan''s work in AI education, research, and industry: students trained, workshops delivered, partnerships built.","en":"Measurable impact of Dr. Varazdat Avetisyan''s work in AI education, research, and industry: students trained, workshops delivered, partnerships built.","ru":"Measurable impact of Dr. Varazdat Avetisyan''s work in AI education, research, and industry: students trained, workshops delivered, partnerships built."}'::jsonb
  ),
  (
    'impact',
    'seo.keywords',
    'Impact page SEO meta keywords',
    '{"hy":"Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia","en":"Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia","ru":"Computer Science Professor Armenia, AI Educator Armenia, AI Speaker Armenia"}'::jsonb
  ),
  (
    'impact',
    'hero.eyebrow',
    'Impact hero eyebrow',
    '{"hy":"Impact","en":"Impact","ru":"Impact"}'::jsonb
  ),
  (
    'impact',
    'hero.heading',
    'Impact hero heading',
    '{"hy":"Measurable outcomes, real people","en":"Measurable outcomes, real people","ru":"Measurable outcomes, real people"}'::jsonb
  ),
  (
    'impact',
    'hero.subheading',
    'Impact hero subheading',
    '{"hy":"A decade of teaching, building, and speaking turned into numbers, stories, and lasting partnerships.","en":"A decade of teaching, building, and speaking turned into numbers, stories, and lasting partnerships.","ru":"A decade of teaching, building, and speaking turned into numbers, stories, and lasting partnerships."}'::jsonb
  ),
  (
    'impact',
    'hero.cta',
    'Impact hero CTA',
    '{"hy":"See How I Can Help","en":"See How I Can Help","ru":"See How I Can Help"}'::jsonb
  ),
  (
    'impact',
    'stats.eyebrow',
    'Stats section eyebrow',
    '{"hy":"By the numbers","en":"By the numbers","ru":"By the numbers"}'::jsonb
  ),
  (
    'impact',
    'stats.heading',
    'Stats section heading',
    '{"hy":"Impact in action","en":"Impact in action","ru":"Impact in action"}'::jsonb
  ),
  (
    'impact',
    'testimonials.eyebrow',
    'Testimonials section eyebrow',
    '{"hy":"Voices","en":"Voices","ru":"Voices"}'::jsonb
  ),
  (
    'impact',
    'testimonials.heading',
    'Testimonials section heading',
    '{"hy":"What people say","en":"What people say","ru":"What people say"}'::jsonb
  ),
  (
    'impact',
    'talks.eyebrow',
    'Talks section eyebrow',
    '{"hy":"Recognition","en":"Recognition","ru":"Recognition"}'::jsonb
  ),
  (
    'impact',
    'talks.heading',
    'Talks section heading',
    '{"hy":"Talks, keynotes & media","en":"Talks, keynotes & media","ru":"Talks, keynotes & media"}'::jsonb
  ),
  (
    'impact',
    'partners.eyebrow',
    'Partners section eyebrow',
    '{"hy":"Partners","en":"Partners","ru":"Partners"}'::jsonb
  ),
  (
    'impact',
    'partners.heading',
    'Partners section heading',
    '{"hy":"Trusted by universities and organizations","en":"Trusted by universities and organizations","ru":"Trusted by universities and organizations"}'::jsonb
  ),
  (
    'impact',
    'cta.heading',
    'Bottom CTA heading',
    '{"hy":"Bring this impact to your team","en":"Bring this impact to your team","ru":"Bring this impact to your team"}'::jsonb
  ),
  (
    'impact',
    'cta.body',
    'Bottom CTA body',
    '{"hy":"Whether you''re an organization, university, or team, let''s see what''s possible.","en":"Whether you''re an organization, university, or team, let''s see what''s possible.","ru":"Whether you''re an organization, university, or team, let''s see what''s possible."}'::jsonb
  ),
  (
    'impact',
    'cta.button',
    'Bottom CTA button',
    '{"hy":"Start a Conversation","en":"Start a Conversation","ru":"Start a Conversation"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
