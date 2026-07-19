--
-- PostgreSQL database dump
--



SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: set_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.set_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text,
    content text,
    cover_image_url text,
    published_at timestamp with time zone,
    tags text[] DEFAULT '{}'::text[],
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    category text,
    read_time_minutes integer
);

ALTER TABLE ONLY public.blog_posts REPLICA IDENTITY FULL;


--
-- Name: certifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.certifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    issuer text,
    issue_date date,
    expiry_date date,
    credential_id text,
    credential_url text,
    image_url text,
    description text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: companies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.companies (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    role text,
    description text,
    logo_url text,
    website_url text,
    start_year integer,
    end_year integer,
    is_current boolean DEFAULT false NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    category text
);

ALTER TABLE ONLY public.companies REPLICA IDENTITY FULL;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    level text,
    duration text,
    link_url text,
    image_url text,
    display_order integer DEFAULT 0,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    slug text NOT NULL,
    topics text[] DEFAULT '{}'::text[] NOT NULL,
    learning_outcomes text[] DEFAULT '{}'::text[] NOT NULL,
    prerequisites text[] DEFAULT '{}'::text[] NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    category text
);

ALTER TABLE ONLY public.courses REPLICA IDENTITY FULL;


--
-- Name: education; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.education (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    institution text,
    degree text,
    field text,
    start_year integer,
    end_year integer,
    description text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.education REPLICA IDENTITY FULL;


--
-- Name: error_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.error_logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    source text DEFAULT 'client'::text NOT NULL,
    severity text DEFAULT 'error'::text NOT NULL,
    message text NOT NULL,
    stack text,
    url text,
    route text,
    user_agent text,
    user_id uuid,
    occurred_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    kind text
);


--
-- Name: home_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_content (
    id boolean DEFAULT true NOT NULL,
    hero_badge text DEFAULT 'AI / ML Researcher & Educator'::text NOT NULL,
    hero_btn1_label text DEFAULT 'Explore Courses'::text NOT NULL,
    hero_btn1_url text DEFAULT '/courses'::text NOT NULL,
    hero_btn2_label text DEFAULT 'Book a Consultation'::text NOT NULL,
    hero_btn2_url text DEFAULT ''::text NOT NULL,
    hero_btn3_label text DEFAULT 'Contact Me'::text NOT NULL,
    hero_btn3_url text DEFAULT ''::text NOT NULL,
    about_label text DEFAULT 'About Me'::text NOT NULL,
    about_heading text DEFAULT 'Building the future of AI'::text NOT NULL,
    about_btn_label text DEFAULT 'Read Full Biography'::text NOT NULL,
    about_btn_url text DEFAULT '/about'::text NOT NULL,
    courses_label text DEFAULT 'Learning'::text NOT NULL,
    courses_heading text DEFAULT 'Featured Courses'::text NOT NULL,
    partners_heading text DEFAULT 'Partner Organizations'::text NOT NULL,
    cta_heading text DEFAULT 'Ready to collaborate?'::text NOT NULL,
    cta_text text DEFAULT 'Whether it''s research, teaching, or building — let''s start a conversation.'::text NOT NULL,
    cta_btn_label text DEFAULT 'Get in Touch'::text NOT NULL,
    cta_btn_url text DEFAULT ''::text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    CONSTRAINT home_content_singleton CHECK ((id = true))
);


--
-- Name: international_experience; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.international_experience (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text,
    organization text,
    location text,
    country_code text,
    lat double precision,
    lng double precision,
    category text,
    event_date date,
    description text,
    url text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    i18n jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text,
    body text NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: navigation_menu; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.navigation_menu (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    path text NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    label_hy text DEFAULT ''::text NOT NULL,
    label_en text NOT NULL,
    label_ru text DEFAULT ''::text NOT NULL
);


--
-- Name: profile; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profile (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    title text NOT NULL,
    tagline text,
    location text,
    bio text,
    email text,
    phone text,
    photo_url text,
    cv_url text,
    github_url text,
    linkedin_url text,
    twitter_url text,
    website_url text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL
);

ALTER TABLE ONLY public.profile REPLICA IDENTITY FULL;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    summary text,
    description text,
    image_url text,
    link_url text,
    repo_url text,
    tech_stack text[] DEFAULT '{}'::text[],
    featured boolean DEFAULT false NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    category text
);

ALTER TABLE ONLY public.projects REPLICA IDENTITY FULL;


--
-- Name: site_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.site_settings (
    id boolean DEFAULT true NOT NULL,
    primary_color text DEFAULT '#7c5cff'::text NOT NULL,
    background_color text DEFAULT '#0f172a'::text NOT NULL,
    text_color text DEFAULT '#f1f5f9'::text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    logo_url text,
    contact_email text,
    CONSTRAINT site_settings_singleton CHECK ((id = true))
);


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    category text NOT NULL,
    name text NOT NULL,
    level integer,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL
);

ALTER TABLE ONLY public.skills REPLICA IDENTITY FULL;


--
-- Name: statistics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.statistics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    label text NOT NULL,
    value text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: talks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.talks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    event_name text,
    event_date date,
    location text,
    description text,
    slides_url text,
    video_url text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    category text
);

ALTER TABLE ONLY public.talks REPLICA IDENTITY FULL;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    author_name text NOT NULL,
    role text,
    organization text,
    quote text NOT NULL,
    category text,
    avatar_url text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT testimonials_category_check CHECK ((category = ANY (ARRAY['Student'::text, 'University'::text, 'Corporate'::text])))
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: video_courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.video_courses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    video_url text,
    thumbnail_url text,
    duration text,
    platform text,
    display_order integer DEFAULT 0 NOT NULL,
    is_visible boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    i18n jsonb DEFAULT '{}'::jsonb NOT NULL,
    slug text NOT NULL,
    topics text[] DEFAULT '{}'::text[] NOT NULL,
    youtube_url text
);

ALTER TABLE ONLY public.video_courses REPLICA IDENTITY FULL;


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: certifications certifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (id);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: education education_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (id);


--
-- Name: error_logs error_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.error_logs
    ADD CONSTRAINT error_logs_pkey PRIMARY KEY (id);


--
-- Name: home_content home_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_content
    ADD CONSTRAINT home_content_pkey PRIMARY KEY (id);


--
-- Name: international_experience international_experience_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.international_experience
    ADD CONSTRAINT international_experience_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: navigation_menu navigation_menu_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.navigation_menu
    ADD CONSTRAINT navigation_menu_pkey PRIMARY KEY (id);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (id);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: statistics statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.statistics
    ADD CONSTRAINT statistics_pkey PRIMARY KEY (id);


--
-- Name: talks talks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.talks
    ADD CONSTRAINT talks_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: video_courses video_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.video_courses
    ADD CONSTRAINT video_courses_pkey PRIMARY KEY (id);


--
-- Name: courses_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX courses_slug_key ON public.courses USING btree (slug);


--
-- Name: error_logs_kind_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX error_logs_kind_idx ON public.error_logs USING btree (kind);


--
-- Name: error_logs_occurred_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX error_logs_occurred_at_idx ON public.error_logs USING btree (occurred_at DESC);


--
-- Name: video_courses_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX video_courses_slug_key ON public.video_courses USING btree (slug);


--
-- Name: blog_posts blog_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: certifications certifications_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER certifications_set_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: companies companies_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: courses courses_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: education education_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: navigation_menu navigation_menu_set_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER navigation_menu_set_updated_at BEFORE UPDATE ON public.navigation_menu FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: profile profile_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER profile_updated_at BEFORE UPDATE ON public.profile FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: projects projects_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: home_content set_home_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_home_content_updated_at BEFORE UPDATE ON public.home_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: site_settings set_site_settings_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: skills skills_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: statistics statistics_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER statistics_updated_at BEFORE UPDATE ON public.statistics FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: talks talks_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER talks_updated_at BEFORE UPDATE ON public.talks FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: testimonials testimonials_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: international_experience trg_intl_exp_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trg_intl_exp_updated_at BEFORE UPDATE ON public.international_experience FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: video_courses video_courses_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER video_courses_updated_at BEFORE UPDATE ON public.video_courses FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: error_logs Admins can delete error logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete error logs" ON public.error_logs FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: navigation_menu Admins can delete nav; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can delete nav" ON public.navigation_menu FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: navigation_menu Admins can insert nav; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can insert nav" ON public.navigation_menu FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: navigation_menu Admins can update nav; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can update nav" ON public.navigation_menu FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: error_logs Admins can view error logs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view error logs" ON public.error_logs FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: certifications Admins manage certifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins manage certifications" ON public.certifications TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: international_experience Admins manage international experience; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins manage international experience" ON public.international_experience TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: certifications Anon view visible certifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anon view visible certifications" ON public.certifications FOR SELECT TO anon USING ((is_visible = true));


--
-- Name: certifications Authenticated view certifications; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated view certifications" ON public.certifications FOR SELECT TO authenticated USING (((is_visible = true) OR private.has_role(auth.uid(), 'admin'::public.app_role)));


--
-- Name: error_logs Block client error log inserts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Block client error log inserts" ON public.error_logs FOR INSERT TO authenticated, anon WITH CHECK (false);


--
-- Name: navigation_menu Public can read visible nav; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can read visible nav" ON public.navigation_menu FOR SELECT USING (true);


--
-- Name: international_experience Public read visible international experience; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public read visible international experience" ON public.international_experience FOR SELECT USING ((is_visible = true));


--
-- Name: home_content admins can insert home_content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins can insert home_content" ON public.home_content FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: site_settings admins can insert site_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins can insert site_settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: home_content admins can update home_content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins can update home_content" ON public.home_content FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: site_settings admins can update site_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins can update site_settings" ON public.site_settings FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: messages admins delete messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins delete messages" ON public.messages FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: companies admins manage companies; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage companies" ON public.companies TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: courses admins manage courses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage courses" ON public.courses TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: education admins manage education; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage education" ON public.education TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_posts admins manage posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage posts" ON public.blog_posts TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: profile admins manage profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage profile" ON public.profile TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: projects admins manage projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage projects" ON public.projects TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: skills admins manage skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage skills" ON public.skills TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: statistics admins manage statistics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage statistics" ON public.statistics TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: talks admins manage talks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage talks" ON public.talks TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: testimonials admins manage testimonials; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage testimonials" ON public.testimonials TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles admins manage user_roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage user_roles" ON public.user_roles TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: video_courses admins manage video_courses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins manage video_courses" ON public.video_courses TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_posts admins read all posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: messages admins read messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins read messages" ON public.messages FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: messages admins update messages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "admins update messages" ON public.messages FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: messages anyone can submit message; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "anyone can submit message" ON public.messages FOR INSERT WITH CHECK (((length(TRIM(BOTH FROM name)) >= 1) AND (length(TRIM(BOTH FROM name)) <= 100) AND ((length(TRIM(BOTH FROM email)) >= 3) AND (length(TRIM(BOTH FROM email)) <= 255)) AND (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'::text) AND ((length(TRIM(BOTH FROM body)) >= 1) AND (length(TRIM(BOTH FROM body)) <= 5000))));


--
-- Name: blog_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: certifications; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

--
-- Name: companies; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

--
-- Name: courses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

--
-- Name: education; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

--
-- Name: error_logs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

--
-- Name: home_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

--
-- Name: international_experience; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.international_experience ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: navigation_menu; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.navigation_menu ENABLE ROW LEVEL SECURITY;

--
-- Name: profile; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

--
-- Name: projects; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

--
-- Name: home_content public can read home_content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public can read home_content" ON public.home_content FOR SELECT USING (true);


--
-- Name: profile public can read profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public can read profile" ON public.profile FOR SELECT USING (true);


--
-- Name: site_settings public can read site_settings; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public can read site_settings" ON public.site_settings FOR SELECT USING (true);


--
-- Name: companies public read companies; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read companies" ON public.companies FOR SELECT USING (is_visible);


--
-- Name: courses public read courses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read courses" ON public.courses FOR SELECT USING (is_visible);


--
-- Name: education public read education; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read education" ON public.education FOR SELECT USING (is_visible);


--
-- Name: projects public read projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read projects" ON public.projects FOR SELECT USING (is_visible);


--
-- Name: blog_posts public read published posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read published posts" ON public.blog_posts FOR SELECT USING (is_published);


--
-- Name: skills public read skills; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read skills" ON public.skills FOR SELECT USING (is_visible);


--
-- Name: statistics public read statistics; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read statistics" ON public.statistics FOR SELECT USING (is_visible);


--
-- Name: talks public read talks; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read talks" ON public.talks FOR SELECT USING (is_visible);


--
-- Name: testimonials public read testimonials; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (is_visible);


--
-- Name: video_courses public read video_courses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "public read video_courses" ON public.video_courses FOR SELECT USING (is_visible);


--
-- Name: site_settings; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

--
-- Name: skills; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

--
-- Name: statistics; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;

--
-- Name: talks; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.talks ENABLE ROW LEVEL SECURITY;

--
-- Name: testimonials; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles users can read their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING ((auth.uid() = user_id));


--
-- Name: video_courses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.video_courses ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA private; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA private TO authenticated;
GRANT USAGE ON SCHEMA private TO service_role;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION has_role(_user_id uuid, _role public.app_role); Type: ACL; Schema: private; Owner: -
--

REVOKE ALL ON FUNCTION private.has_role(_user_id uuid, _role public.app_role) FROM PUBLIC;
GRANT ALL ON FUNCTION private.has_role(_user_id uuid, _role public.app_role) TO authenticated;
GRANT ALL ON FUNCTION private.has_role(_user_id uuid, _role public.app_role) TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION set_updated_at(); Type: ACL; Schema: public; Owner: -
--

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
GRANT ALL ON FUNCTION public.set_updated_at() TO service_role;


--
-- Name: TABLE blog_posts; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.blog_posts TO anon;
GRANT ALL ON TABLE public.blog_posts TO authenticated;
GRANT ALL ON TABLE public.blog_posts TO service_role;


--
-- Name: TABLE certifications; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.certifications TO anon;
GRANT ALL ON TABLE public.certifications TO authenticated;
GRANT ALL ON TABLE public.certifications TO service_role;


--
-- Name: TABLE companies; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.companies TO anon;
GRANT ALL ON TABLE public.companies TO authenticated;
GRANT ALL ON TABLE public.companies TO service_role;


--
-- Name: TABLE courses; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.courses TO anon;
GRANT ALL ON TABLE public.courses TO authenticated;
GRANT ALL ON TABLE public.courses TO service_role;


--
-- Name: TABLE education; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.education TO anon;
GRANT ALL ON TABLE public.education TO authenticated;
GRANT ALL ON TABLE public.education TO service_role;


--
-- Name: TABLE error_logs; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.error_logs TO anon;
GRANT ALL ON TABLE public.error_logs TO authenticated;
GRANT ALL ON TABLE public.error_logs TO service_role;


--
-- Name: TABLE home_content; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.home_content TO anon;
GRANT ALL ON TABLE public.home_content TO authenticated;
GRANT ALL ON TABLE public.home_content TO service_role;


--
-- Name: TABLE international_experience; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.international_experience TO anon;
GRANT ALL ON TABLE public.international_experience TO authenticated;
GRANT ALL ON TABLE public.international_experience TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.messages TO anon;
GRANT ALL ON TABLE public.messages TO authenticated;
GRANT ALL ON TABLE public.messages TO service_role;


--
-- Name: TABLE navigation_menu; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.navigation_menu TO anon;
GRANT ALL ON TABLE public.navigation_menu TO authenticated;
GRANT ALL ON TABLE public.navigation_menu TO service_role;


--
-- Name: TABLE profile; Type: ACL; Schema: public; Owner: -
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;
GRANT ALL ON TABLE public.profile TO service_role;


--
-- Name: COLUMN profile.id; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(id) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.name; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(name) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.title; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(title) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.tagline; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(tagline) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.location; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(location) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.bio; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(bio) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.photo_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(photo_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.cv_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(cv_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.github_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(github_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.linkedin_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(linkedin_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.twitter_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(twitter_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.website_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(website_url) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.created_at; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(created_at) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.updated_at; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(updated_at) ON TABLE public.profile TO anon;


--
-- Name: COLUMN profile.i18n; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(i18n) ON TABLE public.profile TO anon;


--
-- Name: TABLE projects; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.projects TO anon;
GRANT ALL ON TABLE public.projects TO authenticated;
GRANT ALL ON TABLE public.projects TO service_role;


--
-- Name: TABLE site_settings; Type: ACL; Schema: public; Owner: -
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE public.site_settings TO anon;
GRANT ALL ON TABLE public.site_settings TO authenticated;
GRANT ALL ON TABLE public.site_settings TO service_role;


--
-- Name: COLUMN site_settings.id; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(id) ON TABLE public.site_settings TO anon;


--
-- Name: COLUMN site_settings.primary_color; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(primary_color) ON TABLE public.site_settings TO anon;


--
-- Name: COLUMN site_settings.background_color; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(background_color) ON TABLE public.site_settings TO anon;


--
-- Name: COLUMN site_settings.text_color; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(text_color) ON TABLE public.site_settings TO anon;


--
-- Name: COLUMN site_settings.updated_at; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(updated_at) ON TABLE public.site_settings TO anon;


--
-- Name: COLUMN site_settings.logo_url; Type: ACL; Schema: public; Owner: -
--

GRANT SELECT(logo_url) ON TABLE public.site_settings TO anon;


--
-- Name: TABLE skills; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.skills TO anon;
GRANT ALL ON TABLE public.skills TO authenticated;
GRANT ALL ON TABLE public.skills TO service_role;


--
-- Name: TABLE statistics; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.statistics TO anon;
GRANT ALL ON TABLE public.statistics TO authenticated;
GRANT ALL ON TABLE public.statistics TO service_role;


--
-- Name: TABLE talks; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.talks TO anon;
GRANT ALL ON TABLE public.talks TO authenticated;
GRANT ALL ON TABLE public.talks TO service_role;


--
-- Name: TABLE testimonials; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.testimonials TO anon;
GRANT ALL ON TABLE public.testimonials TO authenticated;
GRANT ALL ON TABLE public.testimonials TO service_role;


--
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.user_roles TO service_role;
GRANT SELECT ON TABLE public.user_roles TO authenticated;


--
-- Name: TABLE video_courses; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.video_courses TO anon;
GRANT ALL ON TABLE public.video_courses TO authenticated;
GRANT ALL ON TABLE public.video_courses TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--


