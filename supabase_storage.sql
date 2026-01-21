-- Create Storage Bucket
insert into storage.buckets (id, name, public) values ('products', 'products', true);

-- Create Storage Policy to allow public viewing
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'products' );

-- Create Storage Policy to allow authenticated uploads
create policy "Authenticated Uploads"
  on storage.objects for insert
  with check ( bucket_id = 'products' and auth.role() = 'authenticated' );
