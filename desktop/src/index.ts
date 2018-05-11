import { app, BrowserWindow } from 'electron';
import { join, resolve } from 'path';
import { format } from 'url';
import * as fs from 'graceful-fs';
import { Client } from './api/Client';

let win: BrowserWindow;

const configPath = app.getPath('userData');

const secretPath = join(configPath, '.token');

if (!fs.existsSync(secretPath)) {
  process.exit(1);
}

require('electron-reload')(__dirname, {
  awaitWriteFinish: true,
  electron: join(__dirname, '..', 'desktop', 'node_modules', '.bin', 'electron')
});

const secret = fs.readFileSync(secretPath, { encoding: 'utf-8' }).trim();

app.once('ready', async () => {

  // const client = new Client(secret);

  // client.init()
  //  .then(() => client.listItems(), console.error)
  //  .then(items => win.webContents.send('items', items));

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
    pathname: join(__dirname, 'index.html'),
    slashes: true,
  });

  win.loadURL(rendererPath);

});
