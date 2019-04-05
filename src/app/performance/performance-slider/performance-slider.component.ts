import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-performance-slider',
  templateUrl: './performance-slider.component.html',
  styleUrls: ['./performance-slider.component.scss'],
  providers: [NgbCarouselConfig]
})
export class PerformanceSliderComponent {
  showNavigationArrows = true;
  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor() {}
}
