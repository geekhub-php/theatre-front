import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface IVisuallyImpaired {
  fontSize: '14px' | '24px';
  colorSchema: 'inverse' | 'sepia' | 'none';
}

const DEFAULT_FONT_SIZE = '14px';

@Injectable({
  providedIn: 'root'
})
export class VisuallyImpairedService {
  triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  localStorageVI: IVisuallyImpaired = {
    colorSchema: 'none',
    fontSize: DEFAULT_FONT_SIZE,
  };

  htmlDomEl: HTMLElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.htmlDomEl = this.document.querySelector('html');
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    const visuallyImpaired: IVisuallyImpaired = JSON.parse(localStorage.getItem('visually-impaired'));

    this.localStorageVI.colorSchema = visuallyImpaired && visuallyImpaired.colorSchema ? visuallyImpaired.colorSchema : 'none';
    this.localStorageVI.fontSize = visuallyImpaired && visuallyImpaired.fontSize ? visuallyImpaired.fontSize : DEFAULT_FONT_SIZE;

    visuallyImpaired && visuallyImpaired.fontSize
      ? this.setStylesOnElement({ fontSize: `${visuallyImpaired.fontSize}`} , this.htmlDomEl)
      : this.setStylesOnElement({ fontSize: `${this.localStorageVI.fontSize}`} , this.htmlDomEl);

    if (visuallyImpaired && visuallyImpaired.colorSchema === 'inverse') {
      this.setStylesOnElement({ filter: 'invert(100%)'} , this.htmlDomEl);
    }
  }

  setZoomFont() {
    this.localStorageVI.fontSize = '24px';

    this.setStylesOnElement({ fontSize: this.localStorageVI.fontSize} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setReduceFont() {
    this.localStorageVI.fontSize = '14px';

    this.setStylesOnElement({ fontSize: this.localStorageVI.fontSize} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  inverseColors() {
    this.localStorageVI.colorSchema = 'inverse';

    this.setStylesOnElement({ filter: 'invert(100%)'} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setSepia() {
    this.localStorageVI.colorSchema = 'sepia';

    this.setStylesOnElement({ filter: 'sepia(100%)'} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  resetSettings() {
    this.setStylesOnElement({ fontSize: `${DEFAULT_FONT_SIZE}`, filter: 'none'}, this.htmlDomEl);
    localStorage.removeItem('visually-impaired');
  }

  setStylesOnElement(styles, element) {
    Object.assign(element.style, styles);
  }
}
