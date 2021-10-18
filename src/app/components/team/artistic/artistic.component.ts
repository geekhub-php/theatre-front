import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Employee } from 'app/store/employee/Employee';
import { GatewayService } from 'app/services/gateway.service';

@Component({
  selector: 'app-artistic',
  templateUrl: './artistic.component.html',
  styleUrls: ['./artistic.component.scss'],
})
export class ArtisticComponent implements OnInit {
  artCoreEmployees: Array<Employee> = [];
  artProductionEmployees: Array<Employee> = [];
  isArtCoreLoading = true;
  isArtProductionLoading = true;

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
    this.httpGatewayService.getEmployeesListByGroupe('art-core').subscribe((persons) => {
      this.artCoreEmployees = this.artCoreEmployees.concat(persons.employees);
      this.isArtCoreLoading = false;
    });

    this.httpGatewayService.getEmployeesListByGroupe('art-production').subscribe((persons) => {
      this.artProductionEmployees = this.artProductionEmployees.concat(persons.employees);
      this.isArtProductionLoading = false;
    });

    this.gateway.updateCanonicalURL();
  }
}
