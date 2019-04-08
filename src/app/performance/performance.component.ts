import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;
   images = ['http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg',
     'http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg'];
  constructor() {
  }

  ngOnInit() {
    console.dir ('http://api.theatre.pp.ua/performances/dorogha-do-sontsia.json?locale=uk');
  }

}
