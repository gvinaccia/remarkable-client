import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { RegistrationService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.sass'],
})
export class RegisterDeviceComponent implements OnInit, AfterViewInit {

  @HostBinding('class.fill-parent')
  fillParent = true;

  code = '';

  constructor(
    private svc: RegistrationService,
    private router: Router,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  openSite() {
    this.svc.requestCode();
  }

  register() {
    this.svc.registerDevice(this.code).subscribe(registered => {
      if (registered) {
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigateByUrl('/');
      }
    });
  }
}
