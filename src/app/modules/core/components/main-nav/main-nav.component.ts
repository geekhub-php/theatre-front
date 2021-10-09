import { Component, HostListener, OnInit } from '@angular/core';
import { Breakpoints } from 'app/constants';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})

export class MainNavComponent implements OnInit {
  showWideNav: boolean;
  showSmallNav: boolean;

  constructor() { }

  ngOnInit() {
    this.getWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowSize();
  }

  getWindowSize() {
    const screenWidth = window.innerWidth;
    const wideScreen = Breakpoints.lg_min;
    const mediumScreen = Breakpoints.md_min;

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
