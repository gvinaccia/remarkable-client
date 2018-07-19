import { Injectable } from '@angular/core';
import { IpcService } from '../electron';
import { Messages } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private ipc: IpcService) { }

  requestCode() {
    this.ipc.send(Messages.OPEN_REMARKABLE_SITE);
  }

  registerDevice(code: string) {
    this.ipc.send(Messages.REGISTER_DEVICE, code);
  }
}
