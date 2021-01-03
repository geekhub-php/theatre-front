import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const triggerVisuallyImpaired: BehaviorSubject<Boolean> = new BehaviorSubject(false);

@Component({
  selector: 'app-visually-impaired',
  templateUrl: './visually-impaired.component.html',
  styleUrls: ['./visually-impaired.component.scss']
})
export class VisuallyImpairedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
