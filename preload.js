const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    closeApp: () => ipcRenderer.send('app-close'),
    toggleMaximize: () => ipcRenderer.send('app-toggle-maximize')
});