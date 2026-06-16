import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const massiveToolsData = [
  { id: 'matrix', name: 'Matrix', category: 'Communication', replaces: 'Discord', isSelfHostable: true, description: 'An open standard for secure, decentralized, real-time communication.', githubRepo: 'matrix-org/synapse' },
  { id: 'nextcloud', name: 'Nextcloud', category: 'Productivity', replaces: 'Google Drive', isSelfHostable: true, description: 'The open source file sync and share solution.', githubRepo: 'nextcloud/server' },
  { id: 'umami', name: 'Umami', category: 'Analytics', replaces: 'Google Analytics', isSelfHostable: true, description: 'Umami is a simple, fast, privacy-focused alternative to Google Analytics.', githubRepo: 'umami-software/umami' },
  { id: 'matomo', name: 'Matomo', category: 'Analytics', replaces: 'Google Analytics', isSelfHostable: true, description: 'The leading open alternative to Google Analytics that protects your data.', githubRepo: 'matomo-org/matomo' },
  { id: 'listmonk', name: 'listmonk', category: 'Marketing', replaces: 'Mailchimp', isSelfHostable: true, description: 'High performance, self-hosted, newsletter and mailing list manager.', githubRepo: 'knadh/listmonk' },
  { id: 'mautic', name: 'Mautic', category: 'Marketing', replaces: 'HubSpot', isSelfHostable: true, description: 'Open Source Marketing Automation Software.', githubRepo: 'mautic/mautic' },
  { id: 'papercups', name: 'Papercups', category: 'Support', replaces: 'Intercom', isSelfHostable: true, description: 'Open source customer support tool.', githubRepo: 'papercups-io/papercups' },
  { id: 'proxmox', name: 'Proxmox VE', category: 'Infrastructure', replaces: 'VMware', isSelfHostable: true, description: 'Open-source server management platform for enterprise virtualization.', githubRepo: 'proxmox/pve-manager' },
  { id: 'pihole', name: 'Pi-hole', category: 'Security', replaces: 'NextDNS', isSelfHostable: true, description: 'A black hole for Internet advertisements.', githubRepo: 'pi-hole/pi-hole' },
  { id: 'jellyfin', name: 'Jellyfin', category: 'Media', replaces: 'Plex', isSelfHostable: true, description: 'The Free Software Media System.', githubRepo: 'jellyfin/jellyfin' },
  { id: 'homeassistant', name: 'Home Assistant', category: 'Automation', replaces: 'SmartThings', isSelfHostable: true, description: 'Open source home automation that puts local control and privacy first.', githubRepo: 'home-assistant/core' },
  { id: 'blender', name: 'Blender', category: 'Design', replaces: 'Maya', isSelfHostable: true, description: 'The free and open source 3D creation suite.', githubRepo: 'blender/blender' },
  { id: 'inkscape', name: 'Inkscape', category: 'Design', replaces: 'Adobe Illustrator', isSelfHostable: true, description: 'A professional vector graphics editor.', githubRepo: 'inkscape/inkscape' },
  { id: 'audacity', name: 'Audacity', category: 'Media', replaces: 'Adobe Audition', isSelfHostable: true, description: 'Free, open source, cross-platform audio software.', githubRepo: 'audacity/audacity' },
  { id: 'obsstudio', name: 'OBS Studio', category: 'Media', replaces: 'XSplit', isSelfHostable: true, description: 'Free and open source software for video recording and live streaming.', githubRepo: 'obsproject/obs-studio' },
  { id: 'freecad', name: 'FreeCAD', category: 'Design', replaces: 'AutoCAD', isSelfHostable: true, description: 'Your own 3D parametric modeler.', githubRepo: 'FreeCAD/FreeCAD' },
  { id: 'godot', name: 'Godot Engine', category: 'Development', replaces: 'Unity', isSelfHostable: true, description: 'Multi-platform 2D and 3D game engine.', githubRepo: 'godotengine/godot' },
  { id: 'magento', name: 'Magento Open Source', category: 'E-commerce', replaces: 'Shopify', isSelfHostable: true, description: 'An open-source e-commerce platform.', githubRepo: 'magento/magento2' },
  { id: 'directus', name: 'Directus', category: 'CMS', replaces: 'Contentful', isSelfHostable: true, description: 'The modern data platform.', githubRepo: 'directus/directus' },
  { id: 'payload', name: 'Payload CMS', category: 'CMS', replaces: 'Contentful', isSelfHostable: true, description: 'The best way to build a modern backend + admin UI.', githubRepo: 'payloadcms/payload' },
  { id: 'pocketbase', name: 'PocketBase', category: 'Database', replaces: 'Firebase', isSelfHostable: true, description: 'Open Source backend for your next SaaS and Mobile app in 1 file.', githubRepo: 'pocketbase/pocketbase' },
  { id: 'gitea', name: 'Gitea', category: 'Development', replaces: 'GitHub', isSelfHostable: true, description: 'Git with a cup of tea, painless self-hosted git service.', githubRepo: 'go-gitea/gitea' },
  { id: 'uptimekuma', name: 'Uptime Kuma', category: 'Infrastructure', replaces: 'Pingdom', isSelfHostable: true, description: 'A fancy self-hosted monitoring tool.', githubRepo: 'louislam/uptime-kuma' },
  { id: 'keycloak', name: 'Keycloak', category: 'Security', replaces: 'Auth0', isSelfHostable: true, description: 'Open Source Identity and Access Management.', githubRepo: 'keycloak/keycloak' },
  { id: 'opentofu', name: 'OpenTofu', category: 'Infrastructure', replaces: 'Terraform', isSelfHostable: true, description: 'The open-source infrastructure as code tool.', githubRepo: 'opentofu/opentofu' },
  { id: 'libreoffice', name: 'LibreOffice', category: 'Productivity', replaces: 'Microsoft Office', isSelfHostable: false, description: 'A powerful office suite.', githubRepo: 'LibreOffice/core' },
  { id: 'thunderbird', name: 'Thunderbird', category: 'Communication', replaces: 'Outlook', isSelfHostable: false, description: 'A free email application that’s easy to set up and customize.', githubRepo: 'mozilla/thunderbird' },
  { id: 'brave', name: 'Brave', category: 'Productivity', replaces: 'Google Chrome', isSelfHostable: false, description: 'Fast, private and secure web browser.', githubRepo: 'brave/brave-browser' },
  { id: 'signal', name: 'Signal', category: 'Communication', replaces: 'WhatsApp', isSelfHostable: false, description: 'Private Messenger.', githubRepo: 'signalapp/Signal-Desktop' },
  { id: 'element', name: 'Element', category: 'Communication', replaces: 'Slack', isSelfHostable: true, description: 'A secure and independent communication platform.', githubRepo: 'element-hq/element-web' },
  { id: 'zulip', name: 'Zulip', category: 'Communication', replaces: 'Slack', isSelfHostable: true, description: 'Open-source team chat that helps teams stay productive.', githubRepo: 'zulip/zulip' },
  { id: 'mastodon', name: 'Mastodon', category: 'Community', replaces: 'Twitter', isSelfHostable: true, description: 'Your self-hosted, globally interconnected microblogging community.', githubRepo: 'mastodon/mastodon' },
  { id: 'pixelfed', name: 'Pixelfed', category: 'Community', replaces: 'Instagram', isSelfHostable: true, description: 'A free and ethical photo sharing platform.', githubRepo: 'pixelfed/pixelfed' },
  { id: 'peertube', name: 'PeerTube', category: 'Media', replaces: 'YouTube', isSelfHostable: true, description: 'ActivityPub-federated video streaming platform.', githubRepo: 'Chocobozzz/PeerTube' },
  { id: 'bookstack', name: 'BookStack', category: 'Productivity', replaces: 'Confluence', isSelfHostable: true, description: 'A platform to create documentation/wiki content built with PHP & Laravel.', githubRepo: 'BookStackApp/BookStack' },
  { id: 'wikijs', name: 'Wiki.js', category: 'Productivity', replaces: 'Confluence', isSelfHostable: true, description: 'The most powerful and extensible open source Wiki software.', githubRepo: 'requarks/wiki' },
  { id: 'joplin', name: 'Joplin', category: 'Productivity', replaces: 'Evernote', isSelfHostable: true, description: 'An open source note taking and to-do application with synchronization capabilities.', githubRepo: 'laurent22/joplin' },
  { id: 'standardnotes', name: 'Standard Notes', category: 'Productivity', replaces: 'Evernote', isSelfHostable: true, description: 'A strictly private notes app.', githubRepo: 'standardnotes/app' },
  { id: 'logseq', name: 'Logseq', category: 'Productivity', replaces: 'Roam Research', isSelfHostable: true, description: 'A privacy-first, open-source knowledge base.', githubRepo: 'logseq/logseq' },
  { id: 'redmine', name: 'Redmine', category: 'Project Management', replaces: 'Jira', isSelfHostable: true, description: 'A flexible project management web application.', githubRepo: 'redmine/redmine' },
  { id: 'erpnext', name: 'ERPNext', category: 'ERP', replaces: 'SAP', isSelfHostable: true, description: 'Free and Open Source Enterprise Resource Planning (ERP).', githubRepo: 'frappe/erpnext' },
  { id: 'invoiceninja', name: 'Invoice Ninja', category: 'ERP', replaces: 'QuickBooks', isSelfHostable: true, description: 'Open-source invoicing and time-tracking.', githubRepo: 'invoiceninja/invoiceninja' },
  { id: 'fireflyiii', name: 'Firefly III', category: 'Finance', replaces: 'Mint', isSelfHostable: true, description: 'A personal finances manager.', githubRepo: 'firefly-iii/firefly-iii' },
  { id: 'pfsense', name: 'pfSense', category: 'Security', replaces: 'Cisco Firepower', isSelfHostable: true, description: 'Open source security and firewall.', githubRepo: 'pfsense/pfsense' },
  { id: 'truenas', name: 'TrueNAS', category: 'Infrastructure', replaces: 'Synology DSM', isSelfHostable: true, description: 'Open Source Storage OS.', githubRepo: 'truenas/middleware' },
  { id: 'syncthing', name: 'Syncthing', category: 'Infrastructure', replaces: 'Resilio Sync', isSelfHostable: true, description: 'Open Source Continuous File Synchronization.', githubRepo: 'syncthing/syncthing' },
  { id: 'rclone', name: 'Rclone', category: 'Infrastructure', replaces: 'GoodSync', isSelfHostable: true, description: 'rsync for cloud storage.', githubRepo: 'rclone/rclone' },
  { id: 'borgbackup', name: 'BorgBackup', category: 'Infrastructure', replaces: 'Acronis', isSelfHostable: true, description: 'Deduplicating archiver with compression and authenticated encryption.', githubRepo: 'borgbackup/borg' },
  { id: 'searx', name: 'Searx', category: 'Search', replaces: 'Google Search', isSelfHostable: true, description: 'Privacy-respecting metasearch engine.', githubRepo: 'searx/searx' },
  { id: 'openstreetmap', name: 'OpenStreetMap', category: 'Navigation', replaces: 'Google Maps', isSelfHostable: false, description: 'The free wiki world map.', githubRepo: 'openstreetmap/openstreetmap-website' },
  { id: 'shotcut', name: 'Shotcut', category: 'Media', replaces: 'Adobe Premiere', isSelfHostable: false, description: 'A free, open source, cross-platform video editor.', githubRepo: 'mltframework/shotcut' },
  { id: 'darktable', name: 'Darktable', category: 'Media', replaces: 'Adobe Lightroom', isSelfHostable: false, description: 'Open source photography workflow application and raw developer.', githubRepo: 'darktable-org/darktable' },
  { id: 'scribus', name: 'Scribus', category: 'Design', replaces: 'Adobe InDesign', isSelfHostable: false, description: 'Open Source Desktop Publishing.', githubRepo: 'scribusproject/scribus' },
  { id: 'lmms', name: 'LMMS', category: 'Media', replaces: 'FL Studio', isSelfHostable: false, description: 'Cross-platform music production software.', githubRepo: 'LMMS/lmms' },
  { id: 'musescore', name: 'MuseScore', category: 'Media', replaces: 'Sibelius', isSelfHostable: false, description: 'Free music composition and notation software.', githubRepo: 'musescore/MuseScore' }
];

async function seed() {
  console.log(`Connecting to Supabase... Seeding ${massiveToolsData.length} MORE tools!`);
  
  const { data, error } = await supabase
    .from('tools')
    .upsert(massiveToolsData, { onConflict: 'id' });

  if (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Mass seeding successful! Added another massive batch to the database.');
  }
}

seed();
