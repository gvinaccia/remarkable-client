import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../../services';

@Component({
  selector: 'app-register-device',
  templateUrl: './register-device.component.html',
  styleUrls: ['./register-device.component.sass'],
})
export class RegisterDeviceComponent implements OnInit, AfterViewInit {

  @ViewChild('webview')
  webview: ElementRef;

  @HostBinding('class.fill-parent') fillParent = true;

  code = '';

  constructor(private svc: RegistrationService) { }

  ngOnInit() { }

  ngAfterViewInit() { }

  openSite() {
    this.svc.requestCode();
  }

  register() {
    this.svc.registerDevice(this.code);
  }
}
