import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../core/service/gateway.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  listEvents: Array<any> = [];

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.gateway.getPerformanceEvents().subscribe(res => {
      this.listEvents = res.performance_events;
    });
  }
}
