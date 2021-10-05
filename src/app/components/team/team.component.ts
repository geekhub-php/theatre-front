import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';
import { LoaderService } from '../partials/spinner/loader.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private httpGatewayService: GatewayService,
    private loaderService: LoaderService,
  ) {

  }

  ngOnInit() {
    this.httpGatewayService.updateCanonicalURL();
  }
}
