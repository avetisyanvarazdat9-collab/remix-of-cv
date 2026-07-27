-- Course delivery format and status for public filtering (All / Online / Ongoing / Completed)

ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS delivery_type text NOT NULL DEFAULT 'offline',
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'ongoing';

ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_delivery_type_check;
ALTER TABLE public.courses
  ADD CONSTRAINT courses_delivery_type_check
  CHECK (delivery_type IN ('online', 'offline'));

ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_status_check;
ALTER TABLE public.courses
  ADD CONSTRAINT courses_status_check
  CHECK (status IN ('ongoing', 'completed'));

COMMENT ON COLUMN public.courses.delivery_type IS 'Course format: online or offline';
COMMENT ON COLUMN public.courses.status IS 'Course lifecycle: ongoing or completed';
