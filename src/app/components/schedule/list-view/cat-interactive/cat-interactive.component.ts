import {
  Inject,
  OnDestroy,
  ViewChild,
  Component,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subscription } from 'rxjs';
import { TInteractiveCat, TNativeDivElement } from 'app/store/schedule/MonthsSliderItem';

@Component({
  selector: 'app-cat-interactive',
  templateUrl: './cat-interactive.component.html',
  styleUrls: [ './cat-interactive.component.scss' ]
})
export class CatInteractiveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('catLeftEye') catLeftEye: TNativeDivElement;
  @ViewChild('catRightEye') catRightEye: TNativeDivElement;

  catProperty: TInteractiveCat = {
    currentSize: null,
    moveStep: null,
    md: 999,
    xs: 499,
    wideStep: 25,
    mediumStep: 15,
    shortStep: 10
  };

  mouseMove: Subscription;

  constructor(private cdr: ChangeDetectorRef, @Inject(DOCUMENT) private doc: Document) {
  }

  setCatProperty({ innerWidth }: Window) {
    const { md, xs, wideStep, mediumStep, shortStep } = this.catProperty;

    this.catProperty.moveStep = innerWidth <= xs ? shortStep : innerWidth <= md ? mediumStep : wideStep;
  }

  setEyePosition({ clientX, clientY, view }: MouseEvent) {
    const half = 0.5;
    const { innerWidth, innerHeight } = view;

    const relativeX = (clientX) / innerWidth * half;
    const relativeY = (clientY) / innerHeight * half;

    this.catLeftEye.nativeElement.style.left = `${this.catProperty.moveStep * relativeX}px`;
    this.catLeftEye.nativeElement.style.top = `${this.catProperty.moveStep * relativeY}px`;
    this.catRightEye.nativeElement.style.left = `${this.catProperty.moveStep * relativeX}px`;
    this.catRightEye.nativeElement.style.top = `${this.catProperty.moveStep * relativeY}px`;
  }

  ngAfterViewInit() {
    this.mouseMove = fromEvent(this.doc, 'mousemove').subscribe((e: MouseEvent) => {
      this.setCatProperty(e.view);
      this.setEyePosition(e);
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.mouseMove) {
      this.mouseMove.unsubscribe();
    }
  }
}
