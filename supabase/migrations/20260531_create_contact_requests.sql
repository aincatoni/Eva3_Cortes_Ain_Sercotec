create table if not exists public.contact_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  service text not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

create index if not exists contact_requests_status_idx
  on public.contact_requests (status);
