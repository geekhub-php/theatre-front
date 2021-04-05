import { Component, OnInit } from '@angular/core';
import { DevList, TeamLeadsList, QAList } from './dev-list';
import { GatewayService } from '../../services/gateway.service';

@Component({
  selector: 'app-dev-team',
  templateUrl: './dev-team.component.html',
  styleUrls: ['./dev-team.component.scss']
})
export class DevTeamComponent implements OnInit {
  teamLeadsList = TeamLeadsList;
  devList = DevList;
  qaList = QAList;

  constructor(private gatewayService: GatewayService) {
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Команда розробників сайту Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
  }

}
