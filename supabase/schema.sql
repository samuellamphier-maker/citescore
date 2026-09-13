-- Run in the Supabase SQL editor before setting SUPABASE_URL /
-- SUPABASE_SERVICE_ROLE_KEY. Column names are camelCase to match the
-- JSON documents the app already writes to the file store.

create table if not exists public.audit_jobs (
  id text primary key,
  "stripeSessionId" text not null unique,
  email text not null,
  "siteUrl" text not null default '',
  status text not null,
  error text,
  "failureEmailedAt" text,
  "downloadToken" text not null unique,
  crawl jsonb,
  report jsonb,
  events jsonb not null default '[]'::jsonb,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "completedAt" timestamptz
);

create index if not exists audit_jobs_status_idx on public.audit_jobs (status);
create index if not exists audit_jobs_created_idx on public.audit_jobs ("createdAt" desc);

alter table public.audit_jobs enable row level security;

-- The app uses the service role key (bypasses RLS). No anon policies on purpose.
