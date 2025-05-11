const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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
            nodeIntegration: false
        }
    });

    win.loadFile('index.html');

    ipcMain.on('app-close', () => {
        win.close();
    });

    ipcMain.on('app-toggle-maximize', () => {
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });
}

app.whenReady().then(() => {
    let result;

    // 「起動する」が選ばれるまでループ
    while (true) {
        result = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['起動するよね？？？？？？？？？', '押しちゃだめだよ！！'],
            title: 'ねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇねぇ',
            message: '開きたいよね！！！！'
        });

        if (result === 0) {
            // 起動する → ウィンドウを作成
            createWindow();
            break;
        }
        // キャンセル → ループ継続（何もせずもう一度出す）
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});