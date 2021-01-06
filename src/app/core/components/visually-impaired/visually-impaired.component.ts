import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export const triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss']
})
export class VisuallyImpairedComponent implements OnInit {
  trigger = triggerVisuallyImpaired;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  reduceFont() {
    const htmlDomEl = this.document.querySelector('html');
    htmlDomEl.setAttribute('style', 'font-size: 14px');
  }

  zoomFont() {
    const htmlDomEl = this.document.querySelector('html');
    htmlDomEl.setAttribute('style', 'font-size: 24px');
  }
}
