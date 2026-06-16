import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = 'https://openalternative.example.com'; // Replace with actual domain when launching

async function generateSitemap() {
  console.log('Fetching tools for sitemap...');
  let allTools = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const { data, error } = await supabase
      .from('tools')
      .select('id, name')
      .range(page * 1000, (page + 1) * 1000 - 1);
    
    if (error) {
      console.error('Error fetching tools:', error);
      process.exit(1);
    }
    
    if (data.length > 0) {
      allTools = [...allTools, ...data];
      page++;
    } else {
      hasMore = false;
    }
  }

  console.log(`Found ${allTools.length} tools. Generating XML...`);

  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/categories`,
    `${BASE_URL}/submit`,
    `${BASE_URL}/about`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
  ];

  // Add individual tool pages
  allTools.forEach(tool => {
    urls.push(`${BASE_URL}/tool/${tool.id}`);
  });

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === BASE_URL + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
