import { BrowserWindow } from 'electron';
import { join, resolve } from 'path';

import { inDevelopment, settings } from './utils';

export class WindowManager {

  private mainWin!: BrowserWindow;

  getMainWindow(): BrowserWindow {
    if (!this.mainWin) {
      this.mainWin = this.createMainWindow();
    }
    return this.mainWin;
  }

  private createMainWindow() {
    // gestione finestra
    const winState = <{ bounds: any }>settings.get('window.main.state', {
      bounds: {
        height: 600,
        width: 800,
        x: undefined,
        y: undefined
      }
    });

    const win = new BrowserWindow({
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

    return win;
  }

}
