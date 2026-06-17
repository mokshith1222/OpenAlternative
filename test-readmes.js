const repos = [
  'AppFlowy-IO/AppFlowy',
  'toeverything/AFFiNE',
  'mattermost/mattermost',
  'RocketChat/Rocket.Chat',
  'makeplane/plane',
  'opf/openproject',
  'GNOME/gimp',
  'KDE/krita',
  'KDE/kdenlive',
  'openreplay/openreplay',
  'calcom/cal.com',
  'plausible/analytics',
  'formbricks/formbricks',
  'bramw/baserow',
  'twentyhq/twenty'
];

async function checkRepos() {
  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/readme`);
      if (res.ok) {
        console.log(`[OK] ${repo}`);
      } else {
        const json = await res.json();
        console.log(`[FAILED] ${repo} - ${res.status} - ${json.message}`);
      }
    } catch (e) {
      console.log(`[ERROR] ${repo} - ${e.message}`);
    }
  }
}

checkRepos();
