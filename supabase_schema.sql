-- =========================================================================
-- SQL SETUP SCRIPT FOR CODEMATES INDIA SUPABASE BACKEND
-- =========================================================================
-- Copy and paste this script directly into your Supabase Dashboard SQL Editor
-- (Dashboard -> SQL Editor -> New Query) and run it!
-- =========================================================================

-- ── 1. LEADS TABLE ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_contact_method TEXT NOT NULL,
    project_type TEXT,
    selected_features TEXT[],
    expected_timeline TEXT,
    estimated_budget_index TEXT,
    project_name TEXT,
    project_description TEXT,
    business_type TEXT,
    existing_website TEXT,
    estimated_investment_range TEXT,
    complexity TEXT,
    estimated_timeline_weeks TEXT,
    recommended_team TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT leads (necessary for public form submissions)
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT 
    WITH CHECK (true);

-- Allow only authenticated administrators to SELECT (read) leads
CREATE POLICY "Allow authenticated selects" ON public.leads
    FOR SELECT 
    TO authenticated 
    USING (true);


-- ── 2. CONTACT INQUIRIES TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_required TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    project_timeline TEXT NOT NULL,
    project_description TEXT NOT NULL,
    uploaded_file_name TEXT,
    uploaded_file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT inquiries (necessary for public form submissions)
CREATE POLICY "Allow public inserts" ON public.contact_inquiries
    FOR INSERT 
    WITH CHECK (true);

-- Allow only authenticated administrators to SELECT (read) inquiries
CREATE POLICY "Allow authenticated selects" ON public.contact_inquiries
    FOR SELECT 
    TO authenticated 
    USING (true);


-- ── 3. STORAGE SCHEMAS & RLS INTEGRATION ─────────────────────────────────

-- Safely insert storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('requirements', 'requirements', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public insertions (anonymous uploads) into "inquiries/" folder within bucket
CREATE POLICY "Allow public anonymous uploads" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'requirements' 
        AND (storage.foldername(name))[1] = 'inquiries'
    );

-- Enable public selects (downloads) for objects in "requirements" bucket
CREATE POLICY "Allow public downloads" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'requirements');

-- Enable authenticated users (admins) full CRUD access to requirements bucket
CREATE POLICY "Allow admin full control" ON storage.objects
    FOR ALL 
    TO authenticated 
    USING (bucket_id = 'requirements');


-- ── 4. JOB APPLICATIONS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    linkedin TEXT,
    location TEXT NOT NULL,
    job_type TEXT NOT NULL,
    earning_preference TEXT NOT NULL,
    growth_contribution TEXT NOT NULL,
    mindset TEXT NOT NULL,
    team_collaboration TEXT NOT NULL,
    growth_priority TEXT NOT NULL,
    partnership_interest TEXT NOT NULL,
    resume_url TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT job applications (necessary for public form submissions)
CREATE POLICY "Allow public inserts" ON public.job_applications
    FOR INSERT 
    WITH CHECK (true);

-- Allow only authenticated administrators to SELECT (read) job applications
CREATE POLICY "Allow authenticated selects" ON public.job_applications
    FOR SELECT 
    TO authenticated 
    USING (true);


-- ── 5. CAREER RESUMES STORAGE BUCKET ───────────────────────────────────

-- Safely insert storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('career-resumes', 'career-resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public insertions (anonymous uploads) into the bucket
CREATE POLICY "Allow public anonymous uploads to career-resumes" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'career-resumes'
    );

-- Enable public selects (downloads) for objects in "career-resumes" bucket
CREATE POLICY "Allow public downloads from career-resumes" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'career-resumes');

-- Enable authenticated users (admins) full CRUD access to career-resumes bucket
CREATE POLICY "Allow admin full control on career-resumes" ON storage.objects
    FOR ALL 
    TO authenticated 
    USING (bucket_id = 'career-resumes');

