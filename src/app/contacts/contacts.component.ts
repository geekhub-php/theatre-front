import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private meta: Meta, private gatewayService: GatewayService) {
    this.gatewayService.updateMeta('Контакти Черкаського драматичного театру імені Т. Г. Шевченка',
      'Директор, Секретар - +38(0472)36-07-20 | Адміністратор - +38(0472)36-07-18 ' +
      '| Каса - +38(0472)36-07-21 | Eлектронна пошта - theatre.cherkasy@gmail.com | Звертайтеся за адресою - м. Черкаси, бул. Шевченка, 234',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
  }

}
