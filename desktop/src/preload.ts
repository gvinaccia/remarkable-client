const { ipcRenderer } = require('electron');

process.once('loaded', () => {
  (global as any).ipc = ipcRenderer;
});
