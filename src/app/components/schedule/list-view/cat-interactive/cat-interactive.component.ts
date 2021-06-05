import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { TNativeDivElement } from 'app/store/schedule/MonthsSliderItem';

@Component({
  selector: 'app-cat-interactive',
  templateUrl: './cat-interactive.component.html',
  styleUrls: [ './cat-interactive.component.scss' ]
})
export class CatInteractiveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('catLeftEye') catLeftEye: TNativeDivElement;
  @ViewChild('catRightEye') catRightEye: TNativeDivElement;

  mouseMove: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    const moveStep = 25;
    const half = 2;
    const moveCoefficient = 0.65;

    this.mouseMove = fromEvent(document, 'mousemove').subscribe((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerHeight, innerWidth } = window;
      const relativeX = (clientX - innerWidth / half) / innerWidth / half;
      const relativeY = (clientY - innerHeight) / innerHeight * moveCoefficient;

      this.catLeftEye.nativeElement.style.left = `${moveStep * relativeX}px`;
      this.catLeftEye.nativeElement.style.top = `${moveStep * relativeY}px`;

      this.catRightEye.nativeElement.style.left = `${moveStep * relativeX}px`;
      this.catRightEye.nativeElement.style.top = `${moveStep * relativeY}px`;
    });
    this.cdr.detectChanges()
  }

  ngOnDestroy() {
    if (this.mouseMove) {
      this.mouseMove.unsubscribe();
    }
  }

}
