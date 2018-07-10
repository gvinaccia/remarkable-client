import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import { format } from 'url';
import * as fs from 'graceful-fs';

import { Application } from './Application';
import { inDevelopment, inProduction } from './utils';

let application: Application;

if (inDevelopment) {
  require('electron-reload')(join(__dirname, '..', '..'), {
    awaitWriteFinish: true,
    electron: app.getPath('exe'),
  });
}

const shouldQuit = app.makeSingleInstance(() => {
  if (application) {
    application.restoreMainWindow();
  }
});

if (shouldQuit) {
  app.quit();
}

app.once('ready', async () => {

  if (inProduction) {
    // noinspection JSIgnoredPromiseFromCall
    autoUpdater.checkForUpdatesAndNotify();
  }

  const configPath = app.getPath('userData');
  const storagePath = join(configPath, 'storage');

  if (! fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  application = new Application(storagePath);

  const rendererPath = format({
    protocol: 'file',
    pathname: join(__dirname, '..', '..', 'index.html'),
    slashes: true,
  });

  application.start(rendererPath);

});
