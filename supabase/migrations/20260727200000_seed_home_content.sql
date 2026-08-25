-- Seed homepage page_content rows (English source text; hy/ru placeholders for admin).

INSERT INTO public.page_content (page, key, description, i18n) VALUES
  (
    'home',
    'seo.title',
    'Homepage SEO document title',
    '{"hy":"Dr. Varazdat Avetisyan AI Educator, Researcher & Technologist","en":"Dr. Varazdat Avetisyan AI Educator, Researcher & Technologist","ru":"Dr. Varazdat Avetisyan AI Educator, Researcher & Technologist"}'::jsonb
  ),
  (
    'home',
    'seo.description',
    'Homepage SEO meta description',
    '{"hy":"Dr. Varazdat Avetisyan AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies.","en":"Dr. Varazdat Avetisyan AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies.","ru":"Dr. Varazdat Avetisyan AI Educator, Data Scientist, University Professor and CTO. Bridging research, education, and industry through intelligent technologies."}'::jsonb
  ),
  (
    'home',
    'expertise.0',
    'Expertise card: Artificial Intelligence',
    '{"hy":"Artificial Intelligence","en":"Artificial Intelligence","ru":"Artificial Intelligence"}'::jsonb
  ),
  (
    'home',
    'expertise.1',
    'Expertise card: Generative AI',
    '{"hy":"Generative AI","en":"Generative AI","ru":"Generative AI"}'::jsonb
  ),
  (
    'home',
    'expertise.2',
    'Expertise card: Data Science',
    '{"hy":"Data Science","en":"Data Science","ru":"Data Science"}'::jsonb
  ),
  (
    'home',
    'expertise.3',
    'Expertise card: Machine Learning',
    '{"hy":"Machine Learning","en":"Machine Learning","ru":"Machine Learning"}'::jsonb
  ),
  (
    'home',
    'expertise.4',
    'Expertise card: Deep Learning',
    '{"hy":"Deep Learning","en":"Deep Learning","ru":"Deep Learning"}'::jsonb
  ),
  (
    'home',
    'expertise.5',
    'Expertise card: Prompt Engineering',
    '{"hy":"Prompt Engineering","en":"Prompt Engineering","ru":"Prompt Engineering"}'::jsonb
  ),
  (
    'home',
    'expertise.6',
    'Expertise card: AI Agents',
    '{"hy":"AI Agents","en":"AI Agents","ru":"AI Agents"}'::jsonb
  ),
  (
    'home',
    'expertise.7',
    'Expertise card: Computer Science Education',
    '{"hy":"Computer Science Education","en":"Computer Science Education","ru":"Computer Science Education"}'::jsonb
  ),
  (
    'home',
    'expertise.8',
    'Expertise card: Educational Innovation',
    '{"hy":"Educational Innovation","en":"Educational Innovation","ru":"Educational Innovation"}'::jsonb
  ),
  (
    'home',
    'expertise.9',
    'Expertise card: Digital Transformation',
    '{"hy":"Digital Transformation","en":"Digital Transformation","ru":"Digital Transformation"}'::jsonb
  ),
  (
    'home',
    'journeys.learn.title',
    'Journey card (Learn): heading',
    '{"hy":"Develop AI & Technology Skills","en":"Develop AI & Technology Skills","ru":"Develop AI & Technology Skills"}'::jsonb
  ),
  (
    'home',
    'journeys.learn.body',
    'Journey card (Learn): body text',
    '{"hy":"Courses, videos, and articles for AI beginners through practitioners.","en":"Courses, videos, and articles for AI beginners through practitioners.","ru":"Courses, videos, and articles for AI beginners through practitioners."}'::jsonb
  ),
  (
    'home',
    'journeys.learn.cta',
    'Journey card (Learn): CTA label',
    '{"hy":"Explore Learning","en":"Explore Learning","ru":"Explore Learning"}'::jsonb
  ),
  (
    'home',
    'journeys.transform.title',
    'Journey card (Transform): heading',
    '{"hy":"Transform Your Organization","en":"Transform Your Organization","ru":"Transform Your Organization"}'::jsonb
  ),
  (
    'home',
    'journeys.transform.body',
    'Journey card (Transform): body text',
    '{"hy":"Consulting, corporate training, AI adoption, and digital transformation.","en":"Consulting, corporate training, AI adoption, and digital transformation.","ru":"Consulting, corporate training, AI adoption, and digital transformation."}'::jsonb
  ),
  (
    'home',
    'journeys.transform.cta',
    'Journey card (Transform): CTA label',
    '{"hy":"Transform With Me","en":"Transform With Me","ru":"Transform With Me"}'::jsonb
  ),
  (
    'home',
    'journeys.collaborate.title',
    'Journey card (Collaborate): heading',
    '{"hy":"Research & Partnerships","en":"Research & Partnerships","ru":"Research & Partnerships"}'::jsonb
  ),
  (
    'home',
    'journeys.collaborate.body',
    'Journey card (Collaborate): body text',
    '{"hy":"Publications, speaking engagements, academic and industry collaborations.","en":"Publications, speaking engagements, academic and industry collaborations.","ru":"Publications, speaking engagements, academic and industry collaborations."}'::jsonb
  ),
  (
    'home',
    'journeys.collaborate.cta',
    'Journey card (Collaborate): CTA label',
    '{"hy":"Let''s Collaborate","en":"Let''s Collaborate","ru":"Let''s Collaborate"}'::jsonb
  ),
  (
    'home',
    'journeys.impact.title',
    'Journey card (Impact): heading',
    '{"hy":"See the Measurable Impact","en":"See the Measurable Impact","ru":"See the Measurable Impact"}'::jsonb
  ),
  (
    'home',
    'journeys.impact.body',
    'Journey card (Impact): body text',
    '{"hy":"Awards, talks, media appearances, achievements, and partnerships.","en":"Awards, talks, media appearances, achievements, and partnerships.","ru":"Awards, talks, media appearances, achievements, and partnerships."}'::jsonb
  ),
  (
    'home',
    'journeys.impact.cta',
    'Journey card (Impact): CTA label',
    '{"hy":"See the Impact","en":"See the Impact","ru":"See the Impact"}'::jsonb
  ),
  (
    'home',
    'hero.title',
    'Hero section main heading',
    '{"hy":"Bridging Research, Education, and Industry Through Intelligent Technologies","en":"Bridging Research, Education, and Industry Through Intelligent Technologies","ru":"Bridging Research, Education, and Industry Through Intelligent Technologies"}'::jsonb
  ),
  (
    'home',
    'hero.subtitle',
    'Hero section subtitle line under main heading',
    '{"hy":"Educator | Researcher | Technologist | Entrepreneur | Innovator","en":"Educator | Researcher | Technologist | Entrepreneur | Innovator","ru":"Educator | Researcher | Technologist | Entrepreneur | Innovator"}'::jsonb
  ),
  (
    'home',
    'hero.lead',
    'Hero section lead paragraph',
    '{"hy":"A place for personalized AI solutions: courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond.","en":"A place for personalized AI solutions: courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond.","ru":"A place for personalized AI solutions: courses, consulting, and collaboration for individuals, universities, and organizations across Armenia and beyond."}'::jsonb
  ),
  (
    'home',
    'hero.cta1',
    'Hero primary CTA button (Explore Courses)',
    '{"hy":"Explore Courses","en":"Explore Courses","ru":"Explore Courses"}'::jsonb
  ),
  (
    'home',
    'hero.cta2',
    'Hero secondary CTA button (Request a Consultation)',
    '{"hy":"Request a Consultation","en":"Request a Consultation","ru":"Request a Consultation"}'::jsonb
  ),
  (
    'home',
    'hero.image_alt',
    'Hero portrait image alt text',
    '{"hy":"","en":"","ru":""}'::jsonb
  )
ON CONFLICT (page, key) DO NOTHING;

NOTIFY pgrst, 'reload schema';
