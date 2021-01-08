import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-board-trustees',
  templateUrl: './board-trustees.component.html',
  styleUrls: ['./board-trustees.component.scss']
})
export class BoardTrusteesComponent implements OnInit {

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.gateway.updateCanonicalURL();
  }

}
