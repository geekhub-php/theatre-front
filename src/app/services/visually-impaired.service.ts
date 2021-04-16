import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface IVisuallyImpaired {
  fontSize: '18px' | '24px';
  colorSchema: 'invert' | 'sepia' | 'black-white' | 'white-black' | 'none';
}

const DEFAULT_FONT_SIZE = '18px';

@Injectable({
  providedIn: 'root'
})
export class VisuallyImpairedService {
  triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  localStorageVI: IVisuallyImpaired = { colorSchema: 'none', fontSize: DEFAULT_FONT_SIZE };

  private readonly htmlDomEl: HTMLElement;
  private visuallyImpaired: IVisuallyImpaired;

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
    this.htmlDomEl = this.document.querySelector('html');
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (!isPlatformBrowser(this.platformId)) return;

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
      case 'black-white':
        this.htmlDomEl.classList.add('theme-black-white');
        break;
      case 'white-black':
        this.htmlDomEl.classList.add('theme-white-black');
        break;
      default:
        this.setStylesOnElement({ filter: `none`} , this.htmlDomEl);
    }
  }

  setZoomFont() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.localStorageVI.fontSize = '18px';

    this.setStylesOnElement({ fontSize: this.localStorageVI.fontSize} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setReduceFont() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.localStorageVI.fontSize = '24px';

    this.setStylesOnElement({ fontSize: this.localStorageVI.fontSize} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  inverseColors() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.removeClassList();
    this.localStorageVI.colorSchema = 'invert';
    this.setStylesOnElement({ filter: 'invert(100%)'} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setSepia() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.removeClassList();
    this.localStorageVI.colorSchema = 'sepia';
    this.setStylesOnElement({ filter: 'sepia(100%)'} , this.htmlDomEl);
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setBlackWhite() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.removeClassList();
    this.localStorageVI.colorSchema = 'black-white';
    this.htmlDomEl.classList.add('theme-black-white');
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  setWhiteBlack() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.removeClassList();
    this.localStorageVI.colorSchema = 'white-black';
    this.htmlDomEl.classList.add('theme-white-black');
    localStorage.setItem('visually-impaired', JSON.stringify(this.localStorageVI));
  }

  resetSettings() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.setStylesOnElement({ fontSize: `${DEFAULT_FONT_SIZE}`, filter: 'none'}, this.htmlDomEl);
    this.removeClassList();
    localStorage.removeItem('visually-impaired');
  }

  removeClassList() {
    this.htmlDomEl.classList.remove('theme-white-black');
    this.htmlDomEl.classList.remove('theme-black-white');
  }

  setStylesOnElement(styles: Object, element: HTMLElement) {
    Object.assign(element.style, styles);
  }
}
