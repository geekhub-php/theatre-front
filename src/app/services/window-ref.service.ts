import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser as isPlatformBrowserFunc } from '@angular/common';

const _window = () => window;

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor(@Inject(PLATFORM_ID) private platformId) { }

  get nativeWindow() {
    return _window();
  }

  get isPlatformBrowser() {
    return isPlatformBrowserFunc(this.platformId);
  }
}
