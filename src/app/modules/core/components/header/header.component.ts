import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

import { LangService } from '../../../../services/lang.service';
import { VisuallyImpairedService } from '../../../../services/visually-impaired.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  collapse = false;
  isCollapsed = false;
  search_text = 'Enter your search key word/words';


  trigger = this.visuallyImpairedService.triggerVisuallyImpaired;

  get langRedirectUrl() {
    return this.langService.getLangRedirectUrl();
  }

  constructor(
    private router: Router,
    private langService: LangService,
    private visuallyImpairedService: VisuallyImpairedService
  ) {
    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  toggleMenu(): void {
    this.collapse = !this.collapse;
  }

  collapseMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  searchSubmit(): void {
    this.isCollapsed = !this.isCollapsed;
    /*input value will be sent upon "click"*/
  }

  clearSubmit(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
