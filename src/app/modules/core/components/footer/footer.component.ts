import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {

  scrollAnimation = null;

  constructor() {}

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
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const temp = 10;
      if (currentScroll > 0) {
        that.scrollAnimation = window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / temp));
      }
    })();
  }
}
