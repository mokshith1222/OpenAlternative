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
  'twentyhq/twenty'
];

async function testDecode() {
  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/readme`);
      if (res.ok) {
        const json = await res.json();
        try {
          const decoded = decodeURIComponent(escape(atob(json.content)));
          console.log(`[DECODE OK] ${repo}`);
        } catch (e) {
          try {
            const decoded = atob(json.content);
            console.log(`[DECODE FALLBACK OK] ${repo}`);
          } catch (e2) {
            console.log(`[DECODE FAILED COMPLETE] ${repo} - ${e2.message}`);
          }
        }
      }
    } catch (e) {
      console.log(`[ERROR] ${repo}`);
    }
  }
}

testDecode();
