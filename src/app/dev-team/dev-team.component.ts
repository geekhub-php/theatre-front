import { Component, OnInit } from '@angular/core';
import { DevList, TeamLeadsList, QAList } from './dev-list';
import { Meta } from '@angular/platform-browser';
import { GatewayService } from '../core/services/gateway.service';

@Component({
  selector: 'app-dev-team',
  templateUrl: './dev-team.component.html',
  styleUrls: ['./dev-team.component.scss']
})
export class DevTeamComponent implements OnInit {

  teamLeadsList = TeamLeadsList;
  devList = DevList;
  qaList = QAList;

  constructor(private meta: Meta, private gatewayService: GatewayService) {
    this.meta.updateTag({ property: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Команда розробників сайту Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка'
    });
    this.meta.updateTag({property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/assets/images/logo.png'});
  }

  ngOnInit() {
  }
}
