import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LangService {
  readonly canonicalUrl = environment.canonicalUrl;
  redirectLang: string;

  constructor(@Inject(LOCALE_ID) private localeId: string,
              private router: Router) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);

    const langList = ['en', 'uk'];
    this.redirectLang = langList.find((l) => l !== this.localeId);
  }

  getLangRedirectUrl() {
    return `${this.canonicalUrl}${this.redirectLang}${this.router.url}`;
  }
}
