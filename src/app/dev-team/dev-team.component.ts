import { Component, OnInit } from '@angular/core';
import { DevList, TeamLeadsList, QAList } from './dev-list';

@Component({
  selector: 'app-dev-team',
  templateUrl: './dev-team.component.html',
  styleUrls: ['./dev-team.component.scss']
})
export class DevTeamComponent implements OnInit {

  teamLeadsList = TeamLeadsList;
  devList = DevList;
  qaList = QAList;

  constructor() { }

  ngOnInit() {
  }

}
