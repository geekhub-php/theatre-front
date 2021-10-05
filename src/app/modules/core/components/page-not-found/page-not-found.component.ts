import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/images/animations/theatre_404.json',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
