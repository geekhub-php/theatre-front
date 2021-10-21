import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Employee } from 'app/store/employee/Employee';
import { GatewayService } from 'app/services/gateway.service';

@Component({
  selector: 'app-creative',
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss'],
})

export class CreativeComponent implements OnInit {
  actorsEmployees: Array<Employee> = [];
  balletEmployees: Array<Employee> = [];
  orchestraEmployees: Array<Employee> = [];
  isActorLoading = true;
  isBalletLoading = true;
  isOrchestraLoading = true;

  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private httpGatewayService: GatewayService,
  ) {
    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/uk/assets/images/persons.jpg');
  }

  ngOnInit(): void {
    this.httpGatewayService.getEmployeesListByGroupe('actors').subscribe((persons) => {
      this.actorsEmployees = this.actorsEmployees.concat(persons.employees);
      this.isActorLoading = false;
    });

    this.httpGatewayService.getEmployeesListByGroupe('ballet').subscribe((persons) => {
      this.balletEmployees = this.balletEmployees.concat(persons.employees);
      this.isBalletLoading = false;
    });

    this.httpGatewayService.getEmployeesListByGroupe('orchestra').subscribe((persons) => {
      this.orchestraEmployees = this.orchestraEmployees.concat(persons.employees);
      this.isOrchestraLoading = false;
    });
    this.gateway.updateCanonicalURL();
  }
}
