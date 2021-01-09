import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface IVisuallyImpaired {
  fontSize: '14px' | '24px';
  colorSchema: 'string' | null;
}

const DEFAULT_FONT_SIZE = '14px';

@Injectable({
  providedIn: 'root'
})
export class VisuallyImpairedService {
  triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  localStorageVI: IVisuallyImpaired = {
    colorSchema: null,
    fontSize: DEFAULT_FONT_SIZE,
  };

  htmlDomEl: HTMLElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.htmlDomEl = this.document.querySelector('html');
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const visuallyImpaired: IVisuallyImpaired = JSON.parse(localStorage.getItem('visually-impaired'));

    visuallyImpaired && visuallyImpaired.fontSize
      ? this.htmlDomEl.setAttribute('style', `font-size: ${visuallyImpaired.fontSize}`)
      : this.htmlDomEl.setAttribute('style', `font-size: ${this.localStorageVI.fontSize}`);
  }

  setZoomFont() {
    this.localStorageVI.fontSize = '24px';

    this.htmlDomEl.setAttribute('style', `font-size: ${this.localStorageVI.fontSize}`);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setReduceFont() {
    this.localStorageVI.fontSize = '14px';

    this.htmlDomEl.setAttribute('style', `font-size: ${this.localStorageVI.fontSize}`);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  resetSettings() {
    this.htmlDomEl.setAttribute('style', `font-size: ${DEFAULT_FONT_SIZE}`);
    localStorage.removeItem('visually-impaired');
  }
}
