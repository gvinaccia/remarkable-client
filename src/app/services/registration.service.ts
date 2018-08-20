import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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

  registerDevice(code: string): Observable<boolean> {
    const respondTo = Math.random().toString(10);
    this.ipc.send(Messages.REGISTER_DEVICE, { code, respondTo });
    return this.ipc.on$(respondTo).pipe(
      map(r => r.success),
      take(1),
    );
  }
}
