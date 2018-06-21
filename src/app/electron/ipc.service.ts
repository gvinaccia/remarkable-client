import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class IpcService {

  private ipc;

  constructor(private zone: NgZone) {
    const ipc = (window as any).ipc;

    if (! ipc) {
      throw new Error('ipc service not found');
    }

    this.ipc = ipc;
  }

  send(channel: string, ...args: any[]): void {
    // noinspection TsLint
    console.debug(`IPC SEND: ${channel} `, args);
    this.ipc.send(channel, ...args);
  }

  query<T>(channel: string, payload = { }): Observable<T> {
    return Observable.create(subscriber => {
      const respondTo = channel + '_' + Math.random();
      this.ipc.once(respondTo, (sender, response) => {
        subscriber.next(response);
        subscriber.complete();
      });
      this.send(channel, { ...payload, respondTo });
    });
  }

  public on(channel: string, listener: Function): void {
    this.ipc.on(channel, (...args) => {
      this.zone.run(() => listener(...args));
    });
  }

  public on$(channel: string): Observable<any> {
    return Observable.create(observer => {
      this.on(channel, (sender, ...args) => {
        observer.next(...args);
      });
    });
  }

}
