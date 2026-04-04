ALTER TABLE public.events ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT '{}'::text[];
