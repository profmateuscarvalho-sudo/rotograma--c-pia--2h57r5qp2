CREATE TABLE IF NOT EXISTS public.risk_catalog (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    custom_icon_url TEXT,
    category TEXT,
    description TEXT,
    base_weight INTEGER NOT NULL DEFAULT 1,
    road_contexts TEXT[] DEFAULT '{}'::TEXT[],
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.risk_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_risk_catalog" ON public.risk_catalog;
CREATE POLICY "authenticated_select_risk_catalog" ON public.risk_catalog
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_risk_catalog" ON public.risk_catalog;
CREATE POLICY "authenticated_insert_risk_catalog" ON public.risk_catalog
    FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_risk_catalog" ON public.risk_catalog;
CREATE POLICY "authenticated_update_risk_catalog" ON public.risk_catalog
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_risk_catalog" ON public.risk_catalog;
CREATE POLICY "authenticated_delete_risk_catalog" ON public.risk_catalog
    FOR DELETE TO authenticated USING (true);
