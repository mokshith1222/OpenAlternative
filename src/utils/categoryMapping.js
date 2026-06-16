export const categoryMap = {
  'API Gateway': 'Development & APIs',
  'API Platform': 'Development & APIs',
  'Analytics': 'Analytics & Data',
  'Auth & SSO': 'Security & Identity',
  'Automation': 'Productivity & Collab',
  'Backend as a service': 'Database & Backend',
  'Business Intelligence': 'Analytics & Data',
  'CMS': 'Marketing & Commerce',
  'Cloud Data Warehouse': 'Database & Backend',
  'Cloud Development Environment': 'Development & APIs',
  'Cloud Storage': 'DevOps & Infrastructure',
  'Cloud-Native Application Protection Platform': 'Security & Identity',
  'Communication': 'Communication & Media',
  'Community': 'Communication & Media',
  'Community Platform': 'Communication & Media',
  'Customer Data Platform': 'Analytics & Data',
  'Customer Engagement': 'Support & Operations',
  'Cybersecurity': 'Security & Identity',
  'Database': 'Database & Backend',
  'Design': 'Design & AI',
  'Development': 'Development & APIs',
  'Digital Signature': 'Productivity & Collab',
  'E-commerce': 'Marketing & Commerce',
  'ELT / ETL': 'Analytics & Data',
  'ERP': 'Support & Operations',
  'Email marketing': 'Marketing & Commerce',
  'Enterprise Search': 'Design & AI',
  'Feature flag and toggle management': 'Development & APIs',
  'File Hosting': 'Productivity & Collab',
  'Finance': 'Support & Operations',
  'Financial Service': 'Support & Operations',
  'Form Building': 'Marketing & Commerce',
  'Forum Software': 'Communication & Media',
  'Graph database': 'Database & Backend',
  'Helpdesk Solution': 'Support & Operations',
  'Infrastructure': 'DevOps & Infrastructure',
  'Internal Tools': 'Productivity & Collab',
  'Localization (i18n)': 'Design & AI',
  'Log Management': 'DevOps & Infrastructure',
  'ML Ops': 'Design & AI',
  'Marketing': 'Marketing & Commerce',
  'Marketing SaaS': 'Marketing & Commerce',
  'Media': 'Communication & Media',
  'Messaging': 'Communication & Media',
  'Metrics store': 'Analytics & Data',
  'Navigation': 'Design & AI',
  'No-code database': 'Database & Backend',
  'Notetaking': 'Productivity & Collab',
  'Observability and monitoring': 'DevOps & Infrastructure',
  'Password manager': 'Security & Identity',
  'Platform as a service': 'DevOps & Infrastructure',
  'Product Analytics': 'Analytics & Data',
  'Productivity': 'Productivity & Collab',
  'Project Management': 'Productivity & Collab',
  'Relational database': 'Database & Backend',
  'Remote Desktop Application': 'DevOps & Infrastructure',
  'Reverse ETL': 'Analytics & Data',
  'Robotic Process Automation (RPA)': 'Productivity & Collab',
  'Search': 'Design & AI',
  'Security': 'Security & Identity',
  'Session replay software': 'Analytics & Data',
  'Social Media': 'Communication & Media',
  'Streaming': 'Communication & Media',
  'Surveys': 'Marketing & Commerce',
  'Timeseries database': 'Database & Backend',
  'Tunnelling': 'DevOps & Infrastructure',
  'VPN as a Service': 'Security & Identity',
  'Video Conferencing': 'Communication & Media',
  'Webhooks': 'DevOps & Infrastructure',
  'Website analytics': 'Analytics & Data',
  'Workflow automation': 'Productivity & Collab'
};

export const getBroadCategory = (granular) => {
  if (!granular) return 'Other';
  if (categoryMap[granular]) return categoryMap[granular];
  
  const lower = granular.toLowerCase();
  
  // Intelligent Fallback mapping for 80+ new categories
  if (lower.includes('analytic') || lower.includes('data')) return 'Analytics & Data';
  if (lower.includes('database') || lower.includes('storage') || lower.includes('archive') || lower.includes('file transfer') || lower.includes('pastebin')) return 'Database & Backend';
  if (lower.includes('security') || lower.includes('password') || lower.includes('vpn') || lower.includes('proxy') || lower.includes('identity')) return 'Security & Identity';
  if (lower.includes('infrastructure') || lower.includes('monitor') || lower.includes('network') || lower.includes('dns') || lower.includes('status')) return 'DevOps & Infrastructure';
  if (lower.includes('development') || lower.includes('software') || lower.includes('api') || lower.includes('ci/cd') || lower.includes('hosting')) return 'Development & APIs';
  if (lower.includes('commerce') || lower.includes('marketing') || lower.includes('money') || lower.includes('erp') || lower.includes('resource planning')) return 'Marketing & Commerce';
  if (lower.includes('product') || lower.includes('management') || lower.includes('office') || lower.includes('note') || lower.includes('document') || lower.includes('bookmark') || lower.includes('calendar')) return 'Productivity & Collab';
  if (lower.includes('communication') || lower.includes('media') || lower.includes('video') || lower.includes('audio') || lower.includes('social') || lower.includes('game') || lower.includes('photo') || lower.includes('blog') || lower.includes('feed') || lower.includes('irc') || lower.includes('xmpp')) return 'Communication & Media';
  if (lower.includes('support') || lower.includes('help') || lower.includes('inventory') || lower.includes('health') || lower.includes('recipe')) return 'Support & Operations';
  if (lower.includes('ai') || lower.includes('search') || lower.includes('design') || lower.includes('map') || lower.includes('gps')) return 'Design & AI';
  
  return 'Other'; // default fallback
};
