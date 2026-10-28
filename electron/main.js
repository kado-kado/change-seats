const { app, BrowserWindow, ipcMain, shell } = require('electron');
const https = require('https');
const path = require('path');

let win;

const GITHUB_RELEASES_API = 'https://api.github.com/repos/kado-kado/change-seats/releases/latest';

function normalizeVersion(version) {
    return String(version || '')
        .trim()
        .replace(/^v\.?/i, '')
        .split('.')
        .map(part => Number.parseInt(part, 10) || 0);
}

function compareVersions(current, latest) {
    const currentParts = normalizeVersion(current);
    const latestParts = normalizeVersion(latest);
    for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
        const difference = (latestParts[i] || 0) - (currentParts[i] || 0);
        if (difference !== 0) return difference;
    }
    return 0;
}

function checkForUpdates() {
    const request = https.get(GITHUB_RELEASES_API, {
        headers: { 'User-Agent': 'change-seats-update-check' }
    }, response => {
        let body = '';
        response.on('data', chunk => { body += chunk; });
        response.on('end', () => {
            if (response.statusCode !== 200) return;
            try {
                const release = JSON.parse(body);
                const latestVersion = release.tag_name || '';
                const available = compareVersions(app.getVersion(), latestVersion) < 0;
                if (win && !win.isDestroyed()) {
                    win.webContents.send('update-status', {
                        available,
                        currentVersion: app.getVersion(),
                        latestVersion,
                        url: release.html_url || 'https://github.com/kado-kado/change-seats/releases/latest'
                    });
                }
            } catch (error) {
                console.error('更新情報の確認に失敗しました:', error);
            }
        });
    });
    request.on('error', error => console.error('更新情報の確認に失敗しました:', error));
}

function createWindow() {
    win = new BrowserWindow({
        width: 1300,
        height: 700,
        frame: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            inspectable: false,
            icon: path.join(__dirname, 'icon/icon.png')
        }
    });

    win.loadFile('index.html');
    win.webContents.on('did-finish-load', checkForUpdates);

    ipcMain.on('app-close', () => {
        win.close();
    });
    ipcMain.on('open-update-page', (_event, url) => {
        if (typeof url === 'string' && /^https:\/\/github\.com\//.test(url)) shell.openExternal(url);
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});