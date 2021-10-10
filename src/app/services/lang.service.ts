import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export enum Locales {
  en = 'en',
  uk = 'uk'
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  readonly canonicalUrl = environment.canonicalUrl;
  localeId: Locales;
  localeId$: BehaviorSubject<Locales> = new BehaviorSubject<Locales>(Locales.en);

  constructor(@Inject(LOCALE_ID) private rawLocaleId: string, private router: Router) {
    const idLength = 2;
    const newLocale = this.rawLocaleId.slice(0, idLength);

    if (newLocale === Locales.en || newLocale === Locales.uk) {
      this.localeId$.next(newLocale);
    }
  }

  getLangRedirectUrl(newLocale: Locales) {
    return `${this.canonicalUrl}${newLocale}${this.router.url}`;
  }
}
