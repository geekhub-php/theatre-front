import { Inject, Injectable, LOCALE_ID } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LangService {
  redirectLang: string;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);

    const langList = ['en', 'uk'];
    this.redirectLang = langList.find((l) => l !== this.localeId);
  }

  getLangRedirectUrl() {
    return window.location.href.replace(`/${this.localeId}/`, `/${this.redirectLang}/`);
  }
}
