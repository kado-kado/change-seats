const CURRENT_VERSION = '4.1.0';
const RELEASES_API = 'https://api.github.com/repos/kado-kado/change-seats/releases/latest';

function normalizeVersion(version) {
    return String(version || '')
        .trim()
        .replace(/^v\.?/i, '')
        .split('.')
        .map(part => Number.parseInt(part, 10) || 0);
}

function compareVersions(current, latest) {
    const a = normalizeVersion(current);
    const b = normalizeVersion(latest);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const difference = (b[i] || 0) - (a[i] || 0);
        if (difference !== 0) return difference;
    }
    return 0;
}

function formatVersion(version) {
    const normalized = String(version || '').trim().replace(/^v\.?/i, '');
    return normalized ? `v.${normalized}` : '';
}

function showUpdateNotice(status) {
    if (!status.available) return;

    let notice = document.getElementById('update-notice');
    if (!notice) {
        notice = document.createElement('aside');
        notice.id = 'update-notice';
        notice.style.cssText = 'position:fixed;right:24px;bottom:24px;z-index:1000;max-width:320px;padding:16px 18px;border:1px solid #d7dbe1;border-radius:8px;background:#fff;color:#1f2933;box-shadow:0 8px 24px rgba(31,41,51,.12)';
        document.body.appendChild(notice);
    }

    notice.innerHTML = `<strong>更新があります</strong><br><small>現在: ${formatVersion(status.currentVersion)} / 最新: ${formatVersion(status.latestVersion)}</small><br><button type="button">更新ページを開く</button>`;
    notice.querySelector('button').addEventListener('click', () => window.open(status.url, '_blank', 'noopener,noreferrer'));
    window.setTimeout(() => notice.remove(), 5000);
}

async function checkForUpdates() {
    try {
        const response = await fetch(RELEASES_API, { headers: { Accept: 'application/vnd.github+json' } });
        if (!response.ok) return;
        const release = await response.json();
        showUpdateNotice({
            available: compareVersions(CURRENT_VERSION, release.tag_name) < 0,
            currentVersion: CURRENT_VERSION,
            latestVersion: release.tag_name || '',
            url: release.html_url || 'https://github.com/kado-kado/change-seats/releases/latest'
        });
    } catch (error) {
        console.error('更新情報の確認に失敗しました:', error);
    }
}

window.addEventListener('load', checkForUpdates);
