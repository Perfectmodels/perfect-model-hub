import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials or SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  console.log('Attempting to create buckets...');
  
  const { data: imagesBucket, error: imagesError } = await supabase.storage.createBucket('images', {
    public: true
  });
  
  if (imagesError) {
    console.error('Error creating images bucket:', imagesError.message);
  } else {
    console.log('Images bucket created or already exists');
  }

  const { data: docsBucket, error: docsError } = await supabase.storage.createBucket('documents', {
    public: false
  });

  if (docsError) {
    console.error('Error creating documents bucket:', docsError.message);
  } else {
    console.log('Documents bucket created or already exists');
  }
}

setupStorage();
