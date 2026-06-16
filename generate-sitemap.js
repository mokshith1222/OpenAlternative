import fs from 'fs';
import { toolsData } from './src/data/tools.js';

const DOMAIN = 'https://openalternative.example.com';

const generateSitemap = () => {
  // Get unique tools that are being replaced
  const replacedTools = [...new Set(toolsData.map(t => t.replaces.toLowerCase().replace(/\s+/g, '-')))];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage
  xml += '  <url>\n';
  xml += `    <loc>${DOMAIN}/</loc>\n`;
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  // Add alternative pages
  replacedTools.forEach(tool => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}/alternative/${tool}</loc>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync('./public/sitemap.xml', xml);
  console.log('Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
