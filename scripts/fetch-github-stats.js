import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchStats() {
  console.log('Fetching live GitHub stats to update Supabase...');
  
  const { data: tools, error: fetchError } = await supabase.from('tools').select('*');
  if (fetchError || !tools) {
    console.error("Failed to fetch tools from Supabase:", fetchError);
    return;
  }
  
  const updatedTools = await Promise.all(tools.map(async (tool) => {
    const repoMap = {
      'appflowy': 'AppFlowy-IO/AppFlowy',
      'plane': 'makeplane/plane',
      'calcom': 'calcom/cal.com'
    };
    
    const targetRepo = tool.githubRepo || repoMap[tool.id];
    
    if (!targetRepo) return tool;

    try {
      const response = await axios.get(`https://api.github.com/repos/${targetRepo}`, {
        headers: {
          'User-Agent': 'OpenAlternative-Directory',
        }
      });
      
      const stars = response.data.stargazers_count;
      const formattedStars = stars > 999 ? Math.floor(stars/1000) + 'k' : String(stars);
      
      console.log(`Successfully fetched stats for ${tool.name}: ${formattedStars} stars`);
      
      return {
        ...tool,
        githubRepo: targetRepo,
        githubStars: formattedStars
      };
    } catch (error) {
      console.warn(`Failed to fetch stats for ${tool.name}:`, error.message);
      return tool; 
    }
  }));

  console.log("Updating Supabase database with new stats...");
  const { error: upsertError } = await supabase.from('tools').upsert(updatedTools, { onConflict: 'id' });
  
  if (upsertError) {
    console.error("Failed to update Supabase:", upsertError);
    process.exit(1);
  } else {
    console.log('✅ Successfully updated Supabase with latest GitHub stats.');
  }
}

fetchStats();
