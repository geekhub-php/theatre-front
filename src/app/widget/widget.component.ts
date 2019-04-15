import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { PerformanceEvent } from '../core/model/widget/PerformanceEvent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  listEvents: Array<PerformanceEvent> = [];
  slug: string;

  constructor(private gateway: GatewayService, private router: ActivatedRoute) { }

  ngOnInit() {
    if (this.slug !== null) { this.slug = this.router.snapshot.paramMap.get('slug') } 
    this.gateway.getPerformanceEvents(this.slug).subscribe(res => {
      this.listEvents = res.performance_events;
    });
  }
}
