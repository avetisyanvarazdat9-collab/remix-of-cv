-- Seed homepage about-preview, stats, hero CTA3, and SEO keywords (English placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'home',
    'hero.cta3',
    'Hero tertiary CTA button (Contact Me)',
    '{"hy":"Contact Me","en":"Contact Me","ru":"Contact Me"}'::jsonb
  ),
  (
    'home',
    'seo.keywords',
    'Homepage SEO meta keywords',
    '{"hy":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia","en":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia","ru":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia, AI Consultant Armenia"}'::jsonb
  ),
  (
    'home',
    'about.eyebrow',
    'About preview section eyebrow',
    '{"hy":"Meet Dr. Varazdat","en":"Meet Dr. Varazdat","ru":"Meet Dr. Varazdat"}'::jsonb
  ),
  (
    'home',
    'about.heading',
    'About preview section heading',
    '{"hy":"The person behind the expertise","en":"The person behind the expertise","ru":"The person behind the expertise"}'::jsonb
  ),
  (
    'home',
    'about.cta',
    'About preview section CTA',
    '{"hy":"Learn More","en":"Learn More","ru":"Learn More"}'::jsonb
  ),
  (
    'home',
    'about.brief.eyebrow',
    'About preview sidebar eyebrow',
    '{"hy":"In brief","en":"In brief","ru":"In brief"}'::jsonb
  ),
  (
    'home',
    'about.highlight.0',
    'About preview highlight: PhD',
    '{"hy":"PhD in Computer Engineering","en":"PhD in Computer Engineering","ru":"PhD in Computer Engineering"}'::jsonb
  ),
  (
    'home',
    'about.highlight.1',
    'About preview highlight: CTO',
    '{"hy":"CTO & Co-Founder, Luseen Mobile","en":"CTO & Co-Founder, Luseen Mobile","ru":"CTO & Co-Founder, Luseen Mobile"}'::jsonb
  ),
  (
    'home',
    'about.highlight.2',
    'About preview highlight: Professor',
    '{"hy":"Professor at UFAR, NPUA, GSU","en":"Professor at UFAR, NPUA, GSU","ru":"Professor at UFAR, NPUA, GSU"}'::jsonb
  ),
  (
    'home',
    'about.highlight.3',
    'About preview highlight: Speaker',
    '{"hy":"International speaker & trainer","en":"International speaker & trainer","ru":"International speaker & trainer"}'::jsonb
  ),
  (
    'home',
    'stats.eyebrow',
    'Stats section eyebrow',
    '{"hy":"Impact in action","en":"Impact in action","ru":"Impact in action"}'::jsonb
  ),
  (
    'home',
    'stats.heading',
    'Stats section heading',
    '{"hy":"A decade of measurable results","en":"A decade of measurable results","ru":"A decade of measurable results"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.0.value',
    'Stats fallback card 1 value (when no CMS stats)',
    '{"hy":"10+","en":"10+","ru":"10+"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.0.label',
    'Stats fallback card 1 label',
    '{"hy":"Years of Experience","en":"Years of Experience","ru":"Years of Experience"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.1.value',
    'Stats fallback card 2 value',
    '{"hy":"5,000+","en":"5,000+","ru":"5,000+"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.1.label',
    'Stats fallback card 2 label',
    '{"hy":"Students Trained","en":"Students Trained","ru":"Students Trained"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.2.value',
    'Stats fallback card 3 value',
    '{"hy":"100+","en":"100+","ru":"100+"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.2.label',
    'Stats fallback card 3 label',
    '{"hy":"Workshops Delivered","en":"Workshops Delivered","ru":"Workshops Delivered"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.3.value',
    'Stats fallback card 4 value',
    '{"hy":"20+","en":"20+","ru":"20+"}'::jsonb
  ),
  (
    'home',
    'stats.fallback.3.label',
    'Stats fallback card 4 label',
    '{"hy":"AI Courses Developed","en":"AI Courses Developed","ru":"AI Courses Developed"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
