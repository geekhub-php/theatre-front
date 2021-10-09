import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

import { Breakpoints } from 'app/constants';
import { LangService, Locales } from 'app/services/lang.service';
import { ESidebar, SidebarService } from 'app/services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})

export class HeaderComponent implements OnInit {
  wideScreen;
  textValue = '';
  collapse = false;
  isCollapsed = false;
  localeId: Locales = Locales.en;
  search_text = 'Enter your search key word/words';

  get ukLangUrl() {
    return this.langService.getLangRedirectUrl(Locales.uk);
  }

  get enLangUrl() {
    return this.langService.getLangRedirectUrl(Locales.uk);
  }

  constructor(
    private router: Router,
    private langService: LangService,
    private sidebarService: SidebarService,
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);

    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });
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
