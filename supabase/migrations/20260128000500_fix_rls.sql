
-- Force drop and recreate permissive policies
do $$
declare
  t text;
begin
  for t in 
    select table_name from information_schema.tables where table_schema = 'public'
  loop
    execute format('alter table public.%I enable row level security;', t);
    
    -- Drop existing potentially restrictive policies
    begin
        execute format('drop policy "Public write access" on public.%I;', t);
    exception when others then null; end;

    begin
        execute format('drop policy "Public read access" on public.%I;', t);
    exception when others then null; end;

     begin
        execute format('drop policy "Admin write access" on public.%I;', t);
    exception when others then null; end;

     begin
        execute format('drop policy "Admin read access" on public.%I;', t);
    exception when others then null; end;
    
    -- Create permissive policies
    execute format('create policy "Public read access" on public.%I for select using (true);', t);
    execute format('create policy "Public write access" on public.%I for all using (true);', t);
  end loop;
end;
$$;
