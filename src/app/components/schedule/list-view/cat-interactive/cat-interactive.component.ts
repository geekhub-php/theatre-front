import {
  OnInit,
  OnDestroy,
  ViewChild,
  Component,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TInteractiveCat, TNativeDivElement } from 'app/store/schedule/MonthsSliderItem';
import { screenSize } from '../../months-carousel/months-carousel.service';

@Component({
  selector: 'app-cat-interactive',
  templateUrl: './cat-interactive.component.html',
  styleUrls: [ './cat-interactive.component.scss' ]
})
export class CatInteractiveComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('catLeftEye') catLeftEye: TNativeDivElement;
  @ViewChild('catRightEye') catRightEye: TNativeDivElement;

  catProperty: TInteractiveCat = {
    currentSize: null,
    moveStep: null,
    wideScreen: 1000,
    mediumScreen: 500,
    wideStep: 25,
    mediumStep: 15,
    shortStep: 10
  };

  mouseMove: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @HostListener('window:resize', [ 'event' ]) onResize() {
    const width = window.innerWidth;
    const { wideScreen, mediumScreen, currentSize, wideStep, mediumStep, shortStep } = this.catProperty;

    const setCatProperty = ({ step, size }: { step: number, size: string }) => {
      this.catProperty.moveStep = step;
      this.catProperty.currentSize = size;
    };

    if (width >= wideScreen && currentSize !== screenSize.lg) {
      setCatProperty({ step: wideStep, size: screenSize.lg });
    } else if (width < wideScreen && width >= mediumScreen && currentSize !== screenSize.md) {
      setCatProperty({ step: mediumStep, size: screenSize.md });
    } else if (width < mediumScreen && currentSize !== screenSize.xs) {
      setCatProperty({ step: shortStep, size: screenSize.xs });
    }
  }


  ngOnInit() {
    this.onResize();
  }

  setEyePosition({ moveStep, clientX, clientY }: {
    moveStep: number, clientX?: number, clientY?: number
  }) {
    const half = 0.5;
    const { innerHeight, innerWidth } = window;
    clientX = !!clientX ? clientX : Math.floor(Math.random() * innerWidth);
    clientY = !!clientY ? clientY : Math.floor(Math.random() * innerHeight);
    const relativeX = (clientX) / innerWidth * half;
    const relativeY = (clientY) / innerHeight * half;

    this.catLeftEye.nativeElement.style.left = `${moveStep * relativeX}px`;
    this.catLeftEye.nativeElement.style.top = `${moveStep * relativeY}px`;
    this.catRightEye.nativeElement.style.left = `${moveStep * relativeX}px`;
    this.catRightEye.nativeElement.style.top = `${moveStep * relativeY}px`;
  }

  ngAfterViewInit() {
    this.setEyePosition({ moveStep: this.catProperty.moveStep });
    this.mouseMove = fromEvent(document, 'mousemove').subscribe((e: MouseEvent) => {
      const { moveStep } = this.catProperty;
      const { clientX, clientY } = e;
      this.setEyePosition({ moveStep, clientX, clientY });
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.mouseMove) {
      this.mouseMove.unsubscribe();
    }
  }
}
