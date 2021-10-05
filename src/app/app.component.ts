import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SidebarService } from './services/sidebar.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  isSidebarActive = false;

  constructor(
    private meta: Meta,
    private titleService: Title,
    private sidebarService: SidebarService,
    private deviceService: DeviceDetectorService
  ) {
    this.sidebarService.subject.subscribe(({ isActive }) => {
      this.isSidebarActive = isActive && deviceService.getDeviceInfo().deviceType !== 'desktop';
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
