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
    notice.querySelector('button').addEventListener('click', () => window.api.openUpdatePage(status.url));
    window.setTimeout(() => notice.remove(), 5000);
}

if (window.api && window.api.onUpdateStatus) {
    window.api.onUpdateStatus(showUpdateNotice);
}
