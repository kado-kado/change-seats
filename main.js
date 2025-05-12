const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        autoHideMenuBar: true,
        fullscreen: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            nodeIntegration: false,
            inspectable: false
        }
    });

    win.loadFile('index.html');

    win.webContents.on('devtools-opened', () => {
    win.webContents.closeDevTools();
    });

    ipcMain.on('app-close', () => {
        win.close();
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