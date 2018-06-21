import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as settings from 'electron-settings';
import { join, resolve } from 'path';
import { format } from 'url';
import * as fs from 'graceful-fs';

import { Client } from './api/Client';
import { Storage } from './storage/Storage';
import { Messages } from './shared';

let win: BrowserWindow;

const inProduction =  (app as any).isPackaged;
const inDevelopment = !inProduction;

const configPath = app.getPath('userData');

if (inDevelopment) {
  require('electron-reload')(join(__dirname, '..', '..'), {
    awaitWriteFinish: true,
    electron: app.getPath('exe'),
  });
}

const shouldQuit = app.makeSingleInstance(() => {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

if (shouldQuit) {
  app.quit();
}

app.once('ready', async () => {

  // gestione finestra
  const winState = <{ bounds: any }>settings.get('window.main.state', {
    bounds: {
      height: 600,
      width: 800,
      x: undefined,
      y: undefined
    }
  });






  const storagePath = join(configPath, 'storage');

  if (! fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  if (inProduction) {
    // noinspection JSIgnoredPromiseFromCall
    autoUpdater.checkForUpdatesAndNotify();
  }

  const secret = settings.get('auth.token') as string;

  const client = new Client(secret);
  const storage = new Storage(storagePath);

  win = new BrowserWindow({
    ...winState.bounds,
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      preload: resolve(join(__dirname, 'preload.js'))
    }
  });

  if (inDevelopment) {
    win.on('show', () => win.webContents.toggleDevTools());
  }
  win.on('ready-to-show', () => win.show());
  win.on('close', () => {
    settings.set('window.main.state', {
      bounds: win.getBounds() as any,
    });
  });

  ipcMain.on(Messages.GET_REGISTRATION_STATUS, (e: IpcMessageEvent, m: any) => {
    e.sender.send(m.respondTo, { registered: false });
  });

  ipcMain.on(Messages.LOAD_ITEMS, (e: IpcMessageEvent) => {
    client.init()
      .then(() => client.listItems(), console.error)
      .then(items => {
        e.sender.send(Messages.ITEMS, items);
        return items;
      })
      .then(items => {
        storage.sync(items)
          .then(() => {
            e.sender.send(Messages.ITEMS_DOWNLOADED);
          });
      });
  });

  ipcMain.on(Messages.GET_FULL_ITEM, (e: IpcMessageEvent, itemId: string) => {
    storage.getItem(itemId).then(r => e.sender.send(Messages.ITEM_FULL, r));
  });

  // show the window
  const rendererPath = format({
    protocol: 'file',
    pathname: join(__dirname, '..', '..', 'index.html'),
    slashes: true,
  });

  win.loadURL(rendererPath);
});
