import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cal-popup',
  templateUrl: './cal-popup.component.html',
  styleUrls: ['./cal-popup.component.scss']
})
export class CalPopupComponent {
  @Input() date_time: string;
  @Input() title: string;
  @Input() time: string;
  @Input() venue: string;
  @Input() url: string;
  @Input() img_title: string;
  @Input() duration: string;

  constructor() {
  }
}
