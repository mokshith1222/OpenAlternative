import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function scrape() {
  console.log('Fetching raw README from RunaCapital/awesome-oss-alternatives...');
  
  try {
    const { data: readme } = await axios.get('https://raw.githubusercontent.com/RunaCapital/awesome-oss-alternatives/main/README.md');
    const lines = readme.split('\n');
    const toolsToInsert = [];
    
    for (const line of lines) {
      // Look for table rows. Exclude header rows.
      if (line.includes('|') && !line.includes('---') && !line.toLowerCase().includes('alternative to') && !line.toLowerCase().includes('github stars') && line.length > 20) {
        const parts = line.split('|').map(p => p.trim());
        
        // Structure: Category|Company|Description|GitHub Stars|Alternative to
        if (parts.length >= 5) {
          const category = parts[0].trim();
          const ossAltMarkdown = parts[1].trim();
          const desc = parts[2].trim();
          const proprietaryMarkdown = parts[4].trim();

          // Extract OSS Name and URL
          const ossMatch = ossAltMarkdown.match(/\[(.*?)\]\((.*?)\)/);
          // Extract Proprietary Name (could be a link or plain text or multiple links)
          // Just take the text content without brackets or parenthesis if it's a link
          let proprietary = proprietaryMarkdown;
          const propMatch = proprietaryMarkdown.match(/\[(.*?)\]/);
          if (propMatch) {
            proprietary = propMatch[1]; // Grab the first proprietary tool name if it's a link
          }

          if (ossMatch && proprietary && category) {
            const name = ossMatch[1];
            const url = ossMatch[2];
            let githubRepo = null;
            
            if (url.includes('github.com/')) {
              // Extract user/repo format
              const repoPath = url.split('github.com/')[1];
              githubRepo = repoPath.split('/').slice(0, 2).join('/').replace(/#.*$/, '').replace(/\?.*$/, '');
            }

            if (name && proprietary && name !== 'Company' && proprietary !== 'Alternative to') {
               toolsToInsert.push({
                 id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                 name: name,
                 category: category,
                 replaces: proprietary,
                 description: desc || '',
                 githubRepo: githubRepo,
                 isSelfHostable: true
               });
            }
          }
        }
      }
    }

    // Deduplicate by ID
    const uniqueToolsMap = new Map();
    for (const t of toolsToInsert) {
      uniqueToolsMap.set(t.id, t);
    }
    const uniqueTools = Array.from(uniqueToolsMap.values());

    console.log(`Found ${uniqueTools.length} unique tools to insert!`);
    
    if (uniqueTools.length > 0) {
      console.log('Uploading batch to Supabase...');
      const { error } = await supabase.from('tools').upsert(uniqueTools, { onConflict: 'id' });
      
      if (error) {
         console.error("❌ Upsert failed:", error.message);
         process.exit(1);
      } else {
         console.log(`✅ Successfully inserted ${uniqueTools.length} tools into your Supabase database!`);
      }
    }
  } catch (err) {
    console.error("❌ Scraping failed:", err.message);
    process.exit(1);
  }
}

scrape();
