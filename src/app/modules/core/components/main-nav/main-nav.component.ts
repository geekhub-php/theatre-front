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
  onResize(event) {
    if (event.target.innerWidth > 1200) {
      this.showWideNav = true;
      this.showSmallNav = false;
    } else if (event.target.innerWidth > 768) {
      this.showWideNav = false;
      this.showSmallNav = true;
    } else {
      this.showWideNav = false;
      this.showSmallNav = false;
    }
  }

  getWindowSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1200) {
      this.showWideNav = true;
      this.showSmallNav = false;
    } else if (screenWidth > 768) {
      this.showWideNav = false;
      this.showSmallNav = true;
    } else {
      this.showWideNav = false;
      this.showSmallNav = false;
    }
  }
}
