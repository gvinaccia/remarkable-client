import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { format } from 'url';

let win: BrowserWindow;

app.on('ready', () => {
  win = new BrowserWindow();

  win.loadURL(format({
    protocol: 'file',
    pathname: join(__dirname, 'index.html'),
  }));
});
