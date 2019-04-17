import { Component, OnInit, Input } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceEvent } from '../core/model/widget/PerformanceEvent';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  listEvents: Array<PerformanceEvent> = [];
  slug: string;
  moment: moment.Moment = moment();

  constructor(private gateway: GatewayService, private router: ActivatedRoute) { }

  ngOnInit() {
    if (this.slug !== null) { this.slug = this.router.snapshot.paramMap.get('slug'); }
    this.gateway.getPerformanceEvents(this.slug).subscribe((res) => {
      this.moment = moment(res.performance_events[0].date_time); // always only one elentemt in array
      this.listEvents = res.performance_events;
    });
  }
}
