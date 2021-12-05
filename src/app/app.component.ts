import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SidebarService } from './services/sidebar.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { WindowRefService } from './services/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  isSidebarActive = false;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private titleService: Title,
    private windowRef: WindowRefService,
    private sidebarService: SidebarService,
    private deviceService: DeviceDetectorService
  ) {
    this.sidebarService.subject.subscribe(({ isActive }) => {
      this.isSidebarActive = isActive && deviceService.getDeviceInfo().deviceType !== 'desktop';
    });
  }

  ngOnInit() {
    this.windowRef.isPlatformBrowser && this.setFavicon();
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  setFavicon() {
    const { nativeWindow } = this.windowRef;
    const faviconTag  = this.doc.getElementById('favicon') as HTMLLinkElement;
    const isDark = nativeWindow.matchMedia && nativeWindow.matchMedia('(prefers-color-scheme: dark)').matches;

    faviconTag.href = isDark ? 'favicon_white.svg' : 'favicon_black.svg';
  }
}
