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
require('electron-reload')(__dirname);
const secret = fs.readFileSync(secretPath, { encoding: 'utf-8' }).trim();

app.once('ready', async () => {

  // const client = new Client(secret);

  // client.init()
  //  .then(() => client.listItems(), console.error)
  //  .then(items => win.webContents.send('items', items));

  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      preload: resolve(join(__dirname, 'preload.js'))
    }
  });

  win.on('show', () => win.webContents.toggleDevTools());

  win.loadURL(format({
    protocol: 'file',
    pathname: join(__dirname, 'index.html'),
  }));

  win.show();

});
