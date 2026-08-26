-- Seed About page chrome page_content rows (English placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'about',
    'seo.title',
    'About page SEO document title',
    '{"hy":"About Dr. Varazdat Avetisyan","en":"About Dr. Varazdat Avetisyan","ru":"About Dr. Varazdat Avetisyan"}'::jsonb
  ),
  (
    'about',
    'seo.description',
    'About page SEO meta description',
    '{"hy":"Learn about Dr. Varazdat Avetisyan: background, education, skills, certifications, and professional experience in AI and data science.","en":"Learn about Dr. Varazdat Avetisyan: background, education, skills, certifications, and professional experience in AI and data science.","ru":"Learn about Dr. Varazdat Avetisyan: background, education, skills, certifications, and professional experience in AI and data science."}'::jsonb
  ),
  (
    'about',
    'cta.download_cv',
    'About page Download CV button label',
    '{"hy":"Download CV","en":"Download CV","ru":"Download CV"}'::jsonb
  ),
  (
    'about',
    'sections.certifications.heading',
    'Certifications section heading',
    '{"hy":"Certifications","en":"Certifications","ru":"Certifications"}'::jsonb
  ),
  (
    'about',
    'sections.professional_experience.heading',
    'Professional Experience section heading',
    '{"hy":"Professional Experience","en":"Professional Experience","ru":"Professional Experience"}'::jsonb
  ),
  (
    'about',
    'sections.professional_development.heading',
    'Professional Development section heading',
    '{"hy":"Professional Development","en":"Professional Development","ru":"Professional Development"}'::jsonb
  ),
  (
    'about',
    'sections.professional_development.lead',
    'Professional Development section lead text',
    '{"hy":"International trainings, workshops, and exchange programs.","en":"International trainings, workshops, and exchange programs.","ru":"International trainings, workshops, and exchange programs."}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
