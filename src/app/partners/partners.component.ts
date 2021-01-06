import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  constructor(private gatewayService: GatewayService) { }

  ngOnInit() {
  }
}
