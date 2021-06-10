import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';

@Component({
  selector: 'app-list-view-mobile-item',
  templateUrl: './list-view-mobile-item.component.html',
  styleUrls: ['./list-view-mobile-item.component.scss']
})
export class ListViewMobileItemComponent implements OnInit {
  @Input() event: PerformanceEvent;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);
  }

  ngOnInit(): void {
  }

}
