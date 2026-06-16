import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const massiveToolsData = [
  { id: 'supabase', name: 'Supabase', category: 'Database', replaces: 'Firebase', isSelfHostable: true, description: 'The open source Firebase alternative.', githubRepo: 'supabase/supabase' },
  { id: 'posthog', name: 'PostHog', category: 'Analytics', replaces: 'Mixpanel', isSelfHostable: true, description: 'Open-source product analytics, session recording, and feature flags.', githubRepo: 'PostHog/posthog' },
  { id: 'penpot', name: 'Penpot', category: 'Design', replaces: 'Figma', isSelfHostable: true, description: 'The open-source design & prototyping platform for cross-domain teams.', githubRepo: 'penpot/penpot' },
  { id: 'n8n', name: 'n8n', category: 'Automation', replaces: 'Zapier', isSelfHostable: true, description: 'Free and open fair-code licensed node based Workflow Automation Tool.', githubRepo: 'n8n-io/n8n' },
  { id: 'ghost', name: 'Ghost', category: 'CMS', replaces: 'WordPress', isSelfHostable: true, description: 'The creator economy platform. Open source publisher.', githubRepo: 'TryGhost/Ghost' },
  { id: 'meilisearch', name: 'Meilisearch', category: 'Search', replaces: 'Algolia', isSelfHostable: true, description: 'A lightning-fast, open-source, rust-based search engine.', githubRepo: 'meilisearch/meilisearch' },
  { id: 'typesense', name: 'Typesense', category: 'Search', replaces: 'Algolia', isSelfHostable: true, description: 'Fast, typo-tolerant open-source search engine.', githubRepo: 'typesense/typesense' },
  { id: 'odoo', name: 'Odoo', category: 'ERP', replaces: 'SAP', isSelfHostable: true, description: 'Open Source ERP and CRM software.', githubRepo: 'odoo/odoo' },
  { id: 'metabase', name: 'Metabase', category: 'Analytics', replaces: 'Tableau', isSelfHostable: true, description: 'The simplest, fastest way to get business intelligence and analytics to everyone.', githubRepo: 'metabase/metabase' },
  { id: 'jitsi', name: 'Jitsi Meet', category: 'Communication', replaces: 'Zoom', isSelfHostable: true, description: 'Secure, Simple and Scalable Video Conferences.', githubRepo: 'jitsi/jitsi-meet' },
  { id: 'discourse', name: 'Discourse', category: 'Community', replaces: 'Reddit', isSelfHostable: true, description: 'A platform for community discussion.', githubRepo: 'discourse/discourse' },
  { id: 'medusa', name: 'Medusa', category: 'E-commerce', replaces: 'Shopify', isSelfHostable: true, description: 'The open-source Shopify alternative.', githubRepo: 'medusajs/medusa' },
  { id: 'chatwoot', name: 'Chatwoot', category: 'Support', replaces: 'Intercom', isSelfHostable: true, description: 'Customer engagement suite, an open-source alternative to Intercom.', githubRepo: 'chatwoot/chatwoot' },
  { id: 'novu', name: 'Novu', category: 'Infrastructure', replaces: 'Twilio', isSelfHostable: true, description: 'The open-source notification infrastructure.', githubRepo: 'novuhq/novu' },
  { id: 'coolify', name: 'Coolify', category: 'Infrastructure', replaces: 'Vercel', isSelfHostable: true, description: 'An open-source & self-hostable Heroku / Netlify / Vercel alternative.', githubRepo: 'coollabsio/coolify' },
  { id: 'documenso', name: 'Documenso', category: 'Productivity', replaces: 'DocuSign', isSelfHostable: true, description: 'The Open Source DocuSign Alternative.', githubRepo: 'documenso/documenso' },
  { id: 'infisical', name: 'Infisical', category: 'Security', replaces: 'AWS Secrets Manager', isSelfHostable: true, description: 'Open-source, end-to-end encrypted secret management platform.', githubRepo: 'Infisical/infisical' },
  { id: 'dub', name: 'Dub', category: 'Marketing', replaces: 'Bitly', isSelfHostable: true, description: 'Open-source link management infrastructure.', githubRepo: 'dubinc/dub' },
  { id: 'minio', name: 'MinIO', category: 'Infrastructure', replaces: 'AWS S3', isSelfHostable: true, description: 'High Performance, Kubernetes Native Object Storage.', githubRepo: 'minio/minio' },
  { id: 'nocodb', name: 'NocoDB', category: 'Productivity', replaces: 'Airtable', isSelfHostable: true, description: 'The Open Source Airtable Alternative.', githubRepo: 'nocodb/nocodb' },
  { id: 'appsmith', name: 'Appsmith', category: 'Development', replaces: 'Retool', isSelfHostable: true, description: 'Platform to build admin panels, internal tools, and dashboards.', githubRepo: 'appsmithorg/appsmith' },
  { id: 'tooljet', name: 'ToolJet', category: 'Development', replaces: 'Retool', isSelfHostable: true, description: 'Open-source low-code framework to build & deploy internal tools.', githubRepo: 'ToolJet/ToolJet' },
  { id: 'strapi', name: 'Strapi', category: 'CMS', replaces: 'Contentful', isSelfHostable: true, description: 'The leading open-source headless CMS.', githubRepo: 'strapi/strapi' },
  { id: 'superset', name: 'Apache Superset', category: 'Analytics', replaces: 'Tableau', isSelfHostable: true, description: 'Modern, enterprise-ready business intelligence web application.', githubRepo: 'apache/superset' },
  { id: 'gitlab', name: 'GitLab', category: 'Development', replaces: 'GitHub', isSelfHostable: true, description: 'The DevOps Platform.', githubRepo: 'gitlabhq/gitlabhq' },
  { id: 'bitwarden', name: 'Bitwarden', category: 'Security', replaces: '1Password', isSelfHostable: true, description: 'Open source password management solutions.', githubRepo: 'bitwarden/server' },
  { id: 'grafana', name: 'Grafana', category: 'Analytics', replaces: 'Datadog', isSelfHostable: true, description: 'The open and composable observability and data visualization platform.', githubRepo: 'grafana/grafana' },
  { id: 'sentry', name: 'Sentry', category: 'Analytics', replaces: 'Datadog', isSelfHostable: true, description: 'Developer-first error tracking and performance monitoring.', githubRepo: 'getsentry/sentry' },
  { id: 'outline', name: 'Outline', category: 'Productivity', replaces: 'Notion', isSelfHostable: true, description: 'The fastest knowledge base for growing teams.', githubRepo: 'outline/outline' },
  { id: 'focalboard', name: 'Focalboard', category: 'Project Management', replaces: 'Trello', isSelfHostable: true, description: 'Open source, self-hosted alternative to Trello, Notion, and Asana.', githubRepo: 'mattermost/focalboard' },
  { id: 'taiga', name: 'Taiga', category: 'Project Management', replaces: 'Jira', isSelfHostable: true, description: 'Open source project management tool for multi-functional agile teams.', githubRepo: 'taigaio/taiga-front' },
  { id: 'wekan', name: 'Wekan', category: 'Project Management', replaces: 'Trello', isSelfHostable: true, description: 'The open-source kanban.', githubRepo: 'wekan/wekan' },
  { id: 'hoppscotch', name: 'Hoppscotch', category: 'Development', replaces: 'Postman', isSelfHostable: true, description: 'Open source API development ecosystem.', githubRepo: 'hoppscotch/hoppscotch' },
  { id: 'typebot', name: 'Typebot', category: 'Marketing', replaces: 'Typeform', isSelfHostable: true, description: 'Conversational forms builder that you can self-host.', githubRepo: 'baptisteArno/typebot.io' },
  { id: 'formbricks', name: 'Formbricks', category: 'Marketing', replaces: 'Qualtrics', isSelfHostable: true, description: 'Open source survey and experience management.', githubRepo: 'formbricks/formbricks' },
  { id: 'supabase2', name: 'Appwrite', category: 'Database', replaces: 'Firebase', isSelfHostable: true, description: 'Secure Open-Source Backend Server for Web, Mobile & Flutter Developers.', githubRepo: 'appwrite/appwrite' },
  { id: 'crowdsec', name: 'CrowdSec', category: 'Security', replaces: 'Cloudflare', isSelfHostable: true, description: 'Open-source, massively multiplayer firewall.', githubRepo: 'crowdsecurity/crowdsec' },
  { id: 'authentik', name: 'authentik', category: 'Security', replaces: 'Okta', isSelfHostable: true, description: 'The open-source Identity Provider that unifies your identity infrastructure.', githubRepo: 'goauthentik/authentik' },
  { id: 'logto', name: 'Logto', category: 'Security', replaces: 'Auth0', isSelfHostable: true, description: 'The better identity infrastructure for developers.', githubRepo: 'logto-io/logto' }
];

async function seed() {
  console.log(`Connecting to Supabase... Seeding ${massiveToolsData.length} tools.`);
  
  const { data, error } = await supabase
    .from('tools')
    .upsert(massiveToolsData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Mass seeding successful! The database is now loaded.');
  }
}

seed();
