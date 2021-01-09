import { Component, OnInit } from '@angular/core';
import { DevList, TeamLeadsList, QAList } from './dev-list';
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

  constructor(private gateway: GatewayService) { }

  ngOnInit() {
    this.gateway.updateCanonicalURL();
  }

}
