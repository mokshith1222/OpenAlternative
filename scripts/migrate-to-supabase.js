import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { toolsData } from '../src/data/tools.js';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log(`Connecting to Supabase at ${supabaseUrl}...`);
  console.log(`Found ${toolsData.length} tools to migrate.`);

  const { data, error } = await supabase
    .from('tools')
    .upsert(toolsData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Migration successful! All tools are now in Supabase.');
  }
}

migrate();
