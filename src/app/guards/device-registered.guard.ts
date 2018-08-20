import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IpcService } from '../electron';
import { Messages } from '../shared';
import { map } from 'rxjs/operators';

@Injectable()
export class DeviceRegisteredGuard implements CanActivate {

  constructor(private router: Router, private ipc: IpcService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      return this.ipc.query(Messages.GET_REGISTRATION_STATUS)
        .pipe(map((r: any) => {
          if (r.registered) {
            return true;
          }
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/register']);
          return false;
        }));
  }
}
