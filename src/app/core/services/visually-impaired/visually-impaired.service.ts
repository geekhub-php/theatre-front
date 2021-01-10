import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface IVisuallyImpaired {
  fontSize: '14px' | '24px';
  colorSchema: 'invert' | 'sepia' | 'none';
}

const DEFAULT_FONT_SIZE = '14px';

@Injectable({
  providedIn: 'root'
})
export class VisuallyImpairedService {
  triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  localStorageVI: IVisuallyImpaired = { colorSchema: 'none', fontSize: DEFAULT_FONT_SIZE };

  private readonly htmlDomEl: HTMLElement;
  private visuallyImpaired: IVisuallyImpaired;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.htmlDomEl = this.document.querySelector('html');
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    this.visuallyImpaired = JSON.parse(localStorage.getItem('visually-impaired'));
    this.localStorageVI = this.visuallyImpaired ? this.visuallyImpaired : this.localStorageVI;

    this.visuallyImpaired && this.visuallyImpaired.fontSize
      ? this.setStylesOnElement({ fontSize: `${this.visuallyImpaired.fontSize}`} , this.htmlDomEl)
      : this.setStylesOnElement({ fontSize: `${this.localStorageVI.fontSize}`} , this.htmlDomEl);

    switch (this.visuallyImpaired && this.visuallyImpaired.colorSchema) {
      case 'invert':
        this.setStylesOnElement({ filter: 'invert(100%)'} , this.htmlDomEl);
        break;
      case 'sepia':
        this.setStylesOnElement({ filter: 'sepia(100%)'} , this.htmlDomEl);
        break;
      default:
        this.setStylesOnElement({ filter: `none`} , this.htmlDomEl);
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
    this.localStorageVI.colorSchema = 'invert';

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

  setStylesOnElement(styles: Object, element: HTMLElement) {
    Object.assign(element.style, styles);
  }
}
