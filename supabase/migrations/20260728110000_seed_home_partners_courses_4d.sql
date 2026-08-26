-- Seed homepage journeys chrome, partners, featured courses, and four dimensions section copy.

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'home',
    'journeys.section.eyebrow',
    'Journeys section eyebrow',
    '{"hy":"Choose your journey","en":"Choose your journey","ru":"Choose your journey"}'::jsonb
  ),
  (
    'home',
    'journeys.section.heading',
    'Journeys section heading',
    '{"hy":"Where would you like to go next?","en":"Where would you like to go next?","ru":"Where would you like to go next?"}'::jsonb
  ),
  (
    'home',
    'journeys.learn.eyebrow',
    'Journey card (Learn): eyebrow',
    '{"hy":"Learn","en":"Learn","ru":"Learn"}'::jsonb
  ),
  (
    'home',
    'journeys.transform.eyebrow',
    'Journey card (Transform): eyebrow',
    '{"hy":"Transform","en":"Transform","ru":"Transform"}'::jsonb
  ),
  (
    'home',
    'journeys.collaborate.eyebrow',
    'Journey card (Collaborate): eyebrow',
    '{"hy":"Collaborate","en":"Collaborate","ru":"Collaborate"}'::jsonb
  ),
  (
    'home',
    'journeys.impact.eyebrow',
    'Journey card (Impact): eyebrow',
    '{"hy":"Impact","en":"Impact","ru":"Impact"}'::jsonb
  ),
  (
    'home',
    'partners.eyebrow',
    'Partners section eyebrow',
    '{"hy":"Trusted by","en":"Trusted by","ru":"Trusted by"}'::jsonb
  ),
  (
    'home',
    'partners.heading',
    'Partners section heading',
    '{"hy":"Universities, Companies & Training Centers","en":"Universities, Companies & Training Centers","ru":"Universities, Companies & Training Centers"}'::jsonb
  ),
  (
    'home',
    'partners.lead',
    'Partners section lead paragraph',
    '{"hy":"Organizations that I have worked with, taught at, collaborated with, or conducted research for.","en":"Organizations that I have worked with, taught at, collaborated with, or conducted research for.","ru":"Organizations that I have worked with, taught at, collaborated with, or conducted research for."}'::jsonb
  ),
  (
    'home',
    'partners.category_fallback',
    'Partners category badge fallback',
    '{"hy":"Partner","en":"Partner","ru":"Partner"}'::jsonb
  ),
  (
    'home',
    'featured_courses.eyebrow',
    'Featured courses section eyebrow',
    '{"hy":"Featured courses","en":"Featured courses","ru":"Featured courses"}'::jsonb
  ),
  (
    'home',
    'featured_courses.heading',
    'Featured courses section heading',
    '{"hy":"Popular programs","en":"Popular programs","ru":"Popular programs"}'::jsonb
  ),
  (
    'home',
    'featured_courses.view_all',
    'Featured courses view-all link',
    '{"hy":"View all","en":"View all","ru":"View all"}'::jsonb
  ),
  (
    'home',
    'featured_courses.card_cta',
    'Featured courses card CTA',
    '{"hy":"Learn more","en":"Learn more","ru":"Learn more"}'::jsonb
  ),
  (
    'home',
    'four_dimensions.eyebrow',
    'Four Dimensions section eyebrow',
    '{"hy":"Four Dimensions of Impact","en":"Four Dimensions of Impact","ru":"Four Dimensions of Impact"}'::jsonb
  ),
  (
    'home',
    'four_dimensions.heading',
    'Four Dimensions section heading',
    '{"hy":"Four worlds. One practitioner.","en":"Four worlds. One practitioner.","ru":"Four worlds. One practitioner."}'::jsonb
  ),
  (
    'home',
    'four_dimensions.lead',
    'Four Dimensions section lead paragraph',
    '{"hy":"Academic depth, industry execution, real teaching, and international perspective combined in one person.","en":"Academic depth, industry execution, real teaching, and international perspective combined in one person.","ru":"Academic depth, industry execution, real teaching, and international perspective combined in one person."}'::jsonb
  ),
  (
    'home',
    'four_dimensions.cta_fallback',
    'Four Dimensions pillar CTA fallback',
    '{"hy":"Learn More","en":"Learn More","ru":"Learn More"}'::jsonb
  ),
  (
    'home',
    'four_dimensions.timeline_cta_fallback',
    'Four Dimensions timeline button fallback',
    '{"hy":"View Timeline","en":"View Timeline","ru":"View Timeline"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
