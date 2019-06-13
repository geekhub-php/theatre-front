import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  collapse = true;

  get langRedirectUrl() {
    const langList = ['en', 'uk'];
    const otherLang = langList.find((l) => l !== this.localeId);

    const urlLength = environment.siteUrl.length;
    const currentUrl = window.location.href;

    // tslint:disable-next-line:no-magic-numbers
    return `${currentUrl.substr(0, urlLength - 1)}/${otherLang}/${currentUrl.substr(urlLength + 3)}`;
  }

  constructor(private router: Router,
              @Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);

    router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.collapse = true);
  }

  ngOnInit() {
  }

  toogleMenu() {
    this.collapse = !this.collapse;
  }
}
