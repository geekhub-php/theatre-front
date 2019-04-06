import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  activeSlide = 0;

  constructor() { }

  ngOnInit() {
  }

  setActiveSlide(idx: number) {
    this.activeSlide = idx;
  }
}
