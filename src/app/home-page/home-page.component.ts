import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter(true);
  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
  }

  start(name) {
    this.loaderService.start(name);
  }

  stop(name: string) {
    this.loaderService.stop(name);
  }
}
