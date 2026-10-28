const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeApp: () => ipcRenderer.send('app-close'),
    exportExcel: () => ipcRenderer.invoke('export-excel', seats2D),
    onUpdateStatus: callback => ipcRenderer.on('update-status', (_event, status) => callback(status)),
    openUpdatePage: url => ipcRenderer.send('open-update-page', url)
});