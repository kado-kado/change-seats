const { app, BrowserWindow, ipcMain, dialog} = require('electron');
ExcelJS = require('exceljs');
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
            inspectable: false
        }
    });

    win.loadFile('index.html');

    win.webContents.on('devtools-opened', () => {
    });

    ipcMain.on('app-close', () => {
        win.close();
    });
    ipcMain.handle('export-excel', async (event, seatsData) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Seats');

    worksheet.columns = [
        { header: 'Number', key: 'number', width: 10 },
        { header: 'Name', key: 'name', width: 30 },
    ];

    seatsData.forEach(seat => {
        worksheet.addRow({ number: seat.number, name: seat.name });
    });

    const filePath = path.join(app.getPath('desktop'), 'seats.xlsx');
    await workbook.xlsx.writeFile(filePath);

    dialog.showMessageBox(win, {
        type: 'info',
        title: 'Export Successful',
        message: `File saved at: ${filePath}`,
    });

        return filePath;
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