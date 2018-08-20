import { app, ipcMain } from 'electron';
import * as electronSettings from 'electron-settings';

export const inProduction =  (app as any).isPackaged;
export const inDevelopment = !inProduction;

export const settings = electronSettings;

export const connect = (channel: string, handler: any) => {
  ipcMain.on(channel, handler);
};

export { IpcMessageEvent } from 'electron';

export interface HasResponseChannel {
  respondTo: string;
}

export interface RegistrationCodeMessage extends HasResponseChannel {
  code: string;
}
