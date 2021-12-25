import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private httpGatewayService: GatewayService,
  ) {
  }

  ngOnInit() {
    this.httpGatewayService.updateCanonicalURL();
  }
}
