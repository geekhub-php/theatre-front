import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  visibilityActors = false;
  visibilityPerformance = true;
  visibilityPress = true;

  actors() {
    this.visibilityActors = false;
    this.visibilityPerformance = true;
    this.visibilityPress = true;
  }

  performance() {
    this.visibilityActors = true;
    this.visibilityPerformance = false;
    this.visibilityPress = true;
  }

  press() {
    this.visibilityActors = true;
    this.visibilityPerformance = true;
    this.visibilityPress = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
