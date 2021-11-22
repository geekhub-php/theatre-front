import { Component, HostListener, Inject } from '@angular/core';
import { WindowRefService } from 'app/services/window-ref.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {

  scrollAnimation = null;

  constructor(@Inject(DOCUMENT) private doc, private windowRef: WindowRefService) {}

  @HostListener('document:wheel')
  onWheel() {
    cancelAnimationFrame(this.scrollAnimation);
  }

  @HostListener('document:touchmove')
  onTouchMove() {
    cancelAnimationFrame(this.scrollAnimation);
  }

  scrollToTop() {
    const that = this;
    //   tslint:disable-next-line:only-arrow-functions
    (function smoothScroll() {
      const currentScroll = that.doc.documentElement.scrollTop || that.doc.body.scrollTop;
      const temp = 10;
      if (currentScroll > 0 && that.windowRef.isPlatformBrowser) {
        that.scrollAnimation = that.windowRef.nativeWindow.requestAnimationFrame(smoothScroll);
        that.windowRef.nativeWindow.scrollTo(0, currentScroll - (currentScroll / temp));
      }
    })();
  }
}
