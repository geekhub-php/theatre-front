import { Component, Inject, Input, LOCALE_ID } from '@angular/core';
import { PerformanceEvent } from '../../../../store/schedule/PerformanceEvent';

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent {
  @Input() event: PerformanceEvent;

  constructor(@Inject(LOCALE_ID) private localeId: string) {}
}
