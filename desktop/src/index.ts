import { app, BrowserWindow, ipcMain, IpcMessageEvent } from 'electron';
import { join, resolve } from 'path';
import { format } from 'url';
import * as fs from 'graceful-fs';

import { Client } from './api/Client';
import { Storage } from './storage/Storage';
import { Messages } from './shared';

let win: BrowserWindow;

const configPath = app.getPath('userData');

const secretPath = join(configPath, '.token');

if (!fs.existsSync(secretPath)) {
  process.exit(1);
}

require('electron-reload')(__dirname, {
  awaitWriteFinish: true,
  electron: app.getPath('exe'),
});

const secret = fs.readFileSync(secretPath, { encoding: 'utf-8' }).trim();

app.once('ready', async () => {

  const storagePath = join(configPath, 'storage');

  if (! fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath);
  }

  const client = new Client(secret);
  const storage = new Storage(storagePath);

  win = new BrowserWindow({
    show: false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      preload: resolve(join(__dirname, 'preload.js'))
    }
  });

  win.on('show', () => win.webContents.toggleDevTools());
  win.on('ready-to-show', () => win.show());

  const rendererPath = format({
    protocol: 'file',
    pathname: join(__dirname, '..', '..', 'index.html'),
    slashes: true,
  });

  win.loadURL(rendererPath);

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

});
