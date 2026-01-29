
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = 'contact@perfectmodels.ga';
  const password = 'pmm2025@';
  const fullName = 'Super Admin';

  console.log(`Creating admin user: ${email}...`);

  let userId;

  // 1. Create the user in Auth
  const { data: userData, error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      role: 'admin'
    },
    app_metadata: {
      role: 'admin'
    }
  });

  if (userError) {
    if (userError.message.includes('already registered') || userError.status === 422) {
      console.log('User already exists, updating roles...');
      // Fetch existing user to get ID
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
      const existingUser = users.find(u => u.email === email);
      
      if (!existingUser) {
        console.error('Could not find existing user despite "already registered" error.');
        return;
      }
      
      // Update metadata for existing user
      await supabase.auth.admin.updateUserById(existingUser.id, {
        app_metadata: { role: 'admin' },
        user_metadata: { role: 'admin', full_name: fullName }
      });
      
      userId = existingUser.id;
    } else {
      console.error('Error creating user:', userError.message);
      return;
    }
  } else {
    userId = userData.user.id;
    console.log(`User created with ID: ${userId}`);
  }

  // 2. Ensure Profile exists and is Admin (in case trigger didn't fire or table didn't exist when trigger fired)
  // We wait a moment for the trigger if it exists
  await new Promise(r => setTimeout(r, 2000));

  console.log('Updating profile role to admin...');
  
  // Upsert profile just in case
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      role: 'admin',
      full_name: fullName,
      username: 'admin',
      updated_at: new Date().toISOString()
    });

  if (profileError) {
    console.error('Error updating profile:', profileError.message);
    console.log('Ensure you have run the migration to create the "profiles" table first!');
  } else {
    console.log('Success! Admin user created and profile updated.');
    console.log('Email:', email);
    console.log('Password:', password);
  }
}

createAdminUser();
