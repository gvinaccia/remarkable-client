import { app, BrowserWindow } from 'electron';
import { join, resolve } from 'path';
import { format } from 'url';
import * as fs from 'graceful-fs';

let win: BrowserWindow;

const configPath = app.getPath('userData');

const secretPath = join(configPath, '.token');

if (!fs.existsSync(secretPath)) {
  process.exit(1);
}

const secret = fs.readFileSync(secretPath, 'utf-8');

console.log(secret);

app.on('ready', () => {

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
});
