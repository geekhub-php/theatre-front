import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private gateway: GatewayService) {}

  ngOnInit() {
    this.gateway.createLinkForCanonicalURL();
  }
}
