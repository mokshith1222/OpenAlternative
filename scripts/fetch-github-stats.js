import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { toolsData } from '../src/data/tools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchStats() {
  console.log('Fetching live GitHub stats for tools...');
  
  const updatedTools = await Promise.all(toolsData.map(async (tool) => {
    // For this example we'll map a few tools manually if they don't have githubRepo in the data yet
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
          // 'Authorization': process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : undefined
        }
      });
      
      const stars = response.data.stargazers_count;
      const formattedStars = stars > 999 ? Math.floor(stars/1000) + 'k' : stars;
      
      console.log(`Successfully fetched stats for ${tool.name}: ${formattedStars} stars`);
      
      return {
        ...tool,
        githubRepo: targetRepo,
        githubStars: formattedStars
      };
    } catch (error) {
      console.warn(`Failed to fetch stats for ${tool.name} (Rate limit?):`, error.message);
      return tool; 
    }
  }));

  const fileContent = `export const toolsData = ${JSON.stringify(updatedTools, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, '../src/data/tools.js'), fileContent);
  console.log('Successfully updated src/data/tools.js');
}

fetchStats();
