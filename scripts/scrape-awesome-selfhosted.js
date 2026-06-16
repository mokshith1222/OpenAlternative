import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function scrape() {
  console.log('Fetching raw README from awesome-selfhosted (Massive Scale)...');
  
  try {
    const { data: readme } = await axios.get('https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md');
    const lines = readme.split('\n');
    const toolsToInsert = [];
    
    let currentCategory = 'General';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Category headers start with ### 
      if (line.startsWith('### ')) {
        currentCategory = line.replace('### ', '').trim();
      }
      
      // Tool entries start with "- ["
      if (line.startsWith('- [')) {
        // Match "- [Name](URL)"
        const nameUrlMatch = line.match(/^- \[(.*?)\]\((.*?)\)/);
        
        if (nameUrlMatch) {
          const name = nameUrlMatch[1];
          const url = nameUrlMatch[2];
          
          let desc = '';
          const descSplit = line.split(' - ');
          if (descSplit.length > 1) {
             desc = descSplit.slice(1).join(' - ');
             desc = desc.split('. (')[0].trim();
             desc = desc.replace(/\.$/, '');
          }

          let githubRepo = null;
          if (url.includes('github.com/')) {
             githubRepo = url.split('github.com/')[1].split(')')[0].split(' ')[0].replace(/\/$/, '');
          } else {
             const ghMatch = line.match(/github\.com\/([^/]+\/[^/)\s]+)/);
             if (ghMatch) {
                githubRepo = ghMatch[1].replace(/\/$/, '');
             }
          }

          // Filter out extremely long/invalid names
          if (name && name.length < 50 && !name.includes('Awesome')) {
             toolsToInsert.push({
               id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
               name: name,
               category: currentCategory,
               replaces: `Proprietary ${currentCategory} Software`,
               description: desc || '',
               githubRepo: githubRepo,
               isSelfHostable: true
             });
          }
        }
      }
    }

    // Deduplicate
    const uniqueToolsMap = new Map();
    for (const t of toolsToInsert) {
      if (t.id && t.name) {
         uniqueToolsMap.set(t.id, t);
      }
    }
    const uniqueTools = Array.from(uniqueToolsMap.values());

    console.log(`Found ${uniqueTools.length} unique tools to insert!`);
    
    if (uniqueTools.length > 0) {
      console.log('Uploading batch to Supabase (chunked)...');
      
      const chunkSize = 500;
      for (let i = 0; i < uniqueTools.length; i += chunkSize) {
        const chunk = uniqueTools.slice(i, i + chunkSize);
        console.log(`Uploading chunk ${i + 1} to ${i + chunk.length}...`);
        const { error } = await supabase.from('tools').upsert(chunk, { onConflict: 'id' });
        if (error) {
           console.error("❌ Chunk upsert failed:", error.message);
        }
      }
      
      console.log(`✅ Successfully injected thousands of tools into Supabase!`);
    }
  } catch (err) {
    console.error("❌ Scraping failed:", err.message);
    process.exit(1);
  }
}

scrape();
