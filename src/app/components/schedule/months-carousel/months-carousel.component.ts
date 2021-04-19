import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from "@ngu/carousel";

@Component({
  selector: 'app-months-carousel',
  templateUrl: './months-carousel.component.html',
  styleUrls: ['./months-carousel.component.scss']
})
export class MonthsCarouselComponent implements OnInit {
  images = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Черевень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень'
  ];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    9: [],
    10: [],
    11: [],
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 5, sm: 5, md: 5, lg: 5, xl:5, all:0 },
    slide: 1,
    speed: 250,
    point: {
      visible: true,
    },
    load: 2,
      velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    loop: true,
  };
  constructor() {}

  ngOnInit() {
    this.carouselTileItems.forEach(el => {
      this.carouselTileLoad(el);
    });
  }

  public carouselTileLoad(j) {
    // console.log(this.carouselTiles[j]);
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTiles[j].push(
          this.images[Math.floor(Math.random() * this.images.length)]
        );
      }
    }
  }

}
