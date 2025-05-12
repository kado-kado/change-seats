const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeApp: () => ipcRenderer.send('app-close'),
    exportExcel: () => ipcRenderer.invoke('export-excel', seats2D)
});