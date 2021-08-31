import { Component, HostListener, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationStart, Router } from '@angular/router';
import { LangService } from '../../../../services/lang.service';
import { VisuallyImpairedService } from '../../../../services/visually-impaired.service';
import { DonateService } from '../../../../components/donate/donate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  collapse = false;
  isCollapsed = false;
  search_text = 'Enter your search key word/words';
  textValue = '';
  wideScreen;
  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private router: Router,
    private langService: LangService,
    private visuallyImpairedService: VisuallyImpairedService,
    private donateService: DonateService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  ngOnInit(): void {
    this.getWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getWindowSize();
  }

  getWindowSize() {
    const screenWidth = window.innerWidth;
    const wideScreen = 1200;

    this.wideScreen = screenWidth > wideScreen;
  }

  toggleMenu(): void {
    this.collapse = !this.collapse;
  }

  collapseMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  sendRequestOnIconClick(): void {
    /*console.log(this.textValue);*/
    this.textValue = '';
  }

  sendRequestOnEnter() {
/*    console.log(this.textValue);*/
    this.textValue = '';
  }

  clearSubmit(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
