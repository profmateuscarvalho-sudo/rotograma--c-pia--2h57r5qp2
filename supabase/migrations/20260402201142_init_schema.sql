DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'carvalhomateus@icloud.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'carvalhomateus@icloud.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Mateus Carvalho"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.routes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  evaluator TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'em_andamento',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own routes" ON public.routes;
CREATE POLICY "Users can manage their own routes" ON public.routes
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.segments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL,
  number INT NOT NULL,
  start_km NUMERIC NOT NULL,
  end_km NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own segments" ON public.segments;
CREATE POLICY "Users can manage their own segments" ON public.segments
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL,
  segment_id UUID REFERENCES public.segments(id) ON DELETE CASCADE NOT NULL,
  risk_type_id TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  note TEXT,
  photo_url TEXT,
  audio_url TEXT,
  video_timestamp TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own events" ON public.events;
CREATE POLICY "Users can manage their own events" ON public.events
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.observations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  route_id UUID REFERENCES public.routes(id) ON DELETE CASCADE NOT NULL,
  segment_id UUID REFERENCES public.segments(id) ON DELETE CASCADE NOT NULL,
  note TEXT,
  audio_url TEXT,
  video_timestamp TEXT,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.observations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own observations" ON public.observations;
CREATE POLICY "Users can manage their own observations" ON public.observations
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true) 
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Users can upload media" ON storage.objects;
CREATE POLICY "Users can upload media" ON storage.objects 
  FOR INSERT TO authenticated 
  WITH CHECK (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can view media" ON storage.objects;
CREATE POLICY "Users can view media" ON storage.objects 
  FOR SELECT TO authenticated 
  USING (bucket_id = 'media');
  
DROP POLICY IF EXISTS "Users can update media" ON storage.objects;
CREATE POLICY "Users can update media" ON storage.objects 
  FOR UPDATE TO authenticated 
  USING (bucket_id = 'media' AND auth.uid()::text = (storage.foldername(name))[1]);
