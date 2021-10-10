import { Component, Input } from '@angular/core';
import { LangService, Locales } from 'app/services/lang.service';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent {
  @Input() event: PerformanceEvent;
  localeId: Locales = Locales.en;

  constructor(private langService: LangService) {
    this.langService.localeId$.subscribe(localeId => {
      this.localeId = localeId;
    });
  }
}
