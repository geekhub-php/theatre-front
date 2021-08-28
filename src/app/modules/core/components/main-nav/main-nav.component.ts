import { Component, HostListener, OnInit } from '@angular/core';
import { LangService } from '../../../../services/lang.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  showWideNav: boolean;
  showSmallNav: boolean;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(private langService: LangService) {
  }

  ngOnInit() {
    this.getWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowSize();
  }

  getWindowSize() {
    const screenWidth = window.innerWidth;
    const wideScreen = 1200;
    const mediumScreen = 768;

    if (screenWidth > wideScreen) {
      this.showWideNav = true;
      this.showSmallNav = false;
    } else if (screenWidth > mediumScreen) {
      this.showWideNav = false;
      this.showSmallNav = true;
    } else {
      this.showWideNav = false;
      this.showSmallNav = false;
    }
  }
}
