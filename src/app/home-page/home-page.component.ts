import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
