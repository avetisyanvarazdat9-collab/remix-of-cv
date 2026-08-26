-- Seed Learn hub page_content rows (English placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'learn',
    'seo.title',
    'Learn page SEO document title',
    '{"hy":"Learn AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan","en":"Learn AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan","ru":"Learn AI Courses, Video Lessons & Articles | Dr. Varazdat Avetisyan"}'::jsonb
  ),
  (
    'learn',
    'seo.description',
    'Learn page SEO meta description',
    '{"hy":"Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan.","en":"Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan.","ru":"Develop AI, Data Science and Software Engineering skills through in-person courses, on-demand video lessons and long-form articles taught by Dr. Varazdat Avetisyan."}'::jsonb
  ),
  (
    'learn',
    'seo.keywords',
    'Learn page SEO meta keywords',
    '{"hy":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia","en":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia","ru":"AI Training Armenia, Generative AI Armenia, Machine Learning Instructor Armenia, Data Science Training Armenia, Prompt Engineering Armenia"}'::jsonb
  ),
  (
    'learn',
    'hero.eyebrow',
    'Learn hero eyebrow',
    '{"hy":"Learn","en":"Learn","ru":"Learn"}'::jsonb
  ),
  (
    'learn',
    'hero.heading',
    'Learn hero heading',
    '{"hy":"Build real AI and data skills","en":"Build real AI and data skills","ru":"Build real AI and data skills"}'::jsonb
  ),
  (
    'learn',
    'hero.subheading',
    'Learn hero subheading',
    '{"hy":"Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner.","en":"Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner.","ru":"Curated courses, on-demand videos, and long-form articles designed to take you from curious beginner to confident practitioner."}'::jsonb
  ),
  (
    'learn',
    'hero.cta_primary',
    'Learn hero primary CTA',
    '{"hy":"Browse Courses","en":"Browse Courses","ru":"Browse Courses"}'::jsonb
  ),
  (
    'learn',
    'hero.cta_secondary',
    'Learn hero secondary CTA',
    '{"hy":"Watch Videos","en":"Watch Videos","ru":"Watch Videos"}'::jsonb
  ),
  (
    'learn',
    'courses.eyebrow',
    'Courses section eyebrow',
    '{"hy":"Courses","en":"Courses","ru":"Courses"}'::jsonb
  ),
  (
    'learn',
    'courses.heading',
    'Courses section heading',
    '{"hy":"Instructor-led programs","en":"Instructor-led programs","ru":"Instructor-led programs"}'::jsonb
  ),
  (
    'learn',
    'courses.card_cta',
    'Courses card CTA',
    '{"hy":"Learn more","en":"Learn more","ru":"Learn more"}'::jsonb
  ),
  (
    'learn',
    'videos.eyebrow',
    'Video Library section eyebrow',
    '{"hy":"Video Library","en":"Video Library","ru":"Video Library"}'::jsonb
  ),
  (
    'learn',
    'videos.heading',
    'Video Library section heading',
    '{"hy":"Watch and learn at your pace","en":"Watch and learn at your pace","ru":"Watch and learn at your pace"}'::jsonb
  ),
  (
    'learn',
    'articles.eyebrow',
    'Articles section eyebrow',
    '{"hy":"Articles","en":"Articles","ru":"Articles"}'::jsonb
  ),
  (
    'learn',
    'articles.heading',
    'Articles section heading',
    '{"hy":"Insights from the frontier of AI","en":"Insights from the frontier of AI","ru":"Insights from the frontier of AI"}'::jsonb
  ),
  (
    'learn',
    'cta.heading',
    'Bottom CTA heading',
    '{"hy":"Ready to enroll in a course?","en":"Ready to enroll in a course?","ru":"Ready to enroll in a course?"}'::jsonb
  ),
  (
    'learn',
    'cta.body',
    'Bottom CTA body',
    '{"hy":"Reach out to discuss which program best matches your goals, team, or organization.","en":"Reach out to discuss which program best matches your goals, team, or organization.","ru":"Reach out to discuss which program best matches your goals, team, or organization."}'::jsonb
  ),
  (
    'learn',
    'cta.button',
    'Bottom CTA button',
    '{"hy":"Get Course Details","en":"Get Course Details","ru":"Get Course Details"}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
