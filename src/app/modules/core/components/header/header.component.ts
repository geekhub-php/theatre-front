import { Component, HostListener, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { Breakpoints } from 'app/constants';
import { LangService } from 'app/services/lang.service';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';
import { VisuallyImpairedService } from 'app/services/visually-impaired.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})

export class HeaderComponent implements OnInit {
  collapse = false;
  isCollapsed = false;
  search_text = 'Enter your search key word/words';
  textValue = '';
  wideScreen;
  isEn = false;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private router: Router,
    private langService: LangService,
    private visuallyImpairedService: VisuallyImpairedService,
    private sidebarService: SidebarService,
    @Inject(LOCALE_ID) private localeId: string
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);

    const idLength = 2;
    this.isEn = this.localeId.slice(0, idLength) === 'en';
  }

  ngOnInit(): void {
    this.getWindowSize();
  }

  @HostListener('window:resize', [ '$event' ])
  onResize() {
    this.getWindowSize();
  }

  getWindowSize() {
    const screenWidth = window.innerWidth;
    const wideScreen = Breakpoints.lg_min;

    this.wideScreen = screenWidth > wideScreen;
  }

  collapseMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  sendRequestOnIconClick(): void {
    this.textValue = '';
  }

  sendRequestOnEnter(): void {
    this.textValue = '';
  }

  clearSubmit(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openDonate(): void {
    this.sidebarService.open(ESidebar.donate);
  }

  openSettings(): void {
    this.sidebarService.open(ESidebar.settings);
  }

  openNavbar(): void {
    this.sidebarService.open(ESidebar.navbar);
  }
}
