import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
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
  loading = true;

  constructor(private gateway: GatewayService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.slug = this.router.snapshot.paramMap.get('slug');

    this.gateway.getPerformanceEvents(this.slug).subscribe((res) => {
      this.listEvents = res.performance_events;
      this.loading = false;
    });
  }
}
