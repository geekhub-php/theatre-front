import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { PerformanceEvent } from 'app/store/schedule/PerformanceEvent';

@Component({
  selector: 'app-list-view-item',
  templateUrl: './list-view-item.component.html',
  styleUrls: [ './list-view-item.component.scss' ]
})
export class ListViewItemComponent implements OnInit {
  @Input() event: PerformanceEvent;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    const idLength = 2;
    this.localeId = this.localeId.slice(0, idLength);
  }

  ngOnInit(): void {
  }

}
