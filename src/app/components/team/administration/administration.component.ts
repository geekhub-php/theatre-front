import { Component, OnInit } from '@angular/core';

import { Employee } from 'app/store/employee/Employee';
import { GatewayService } from 'app/services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  directorEmployees: Array<Employee> = [];
  deputiesEmployees: Array<Employee> = [];
  adminAccountingEmployees: Array<Employee> = [];
  isDirectorLoading = true;
  isDeputiesLoading = true;
  isAdminAccountingLoading = true;

  constructor(
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private httpGatewayService: GatewayService
  ) {
    this.gateway.updateMeta(
      'Черкаський драматичний театр імені Т. Г. Шевченка',
      'Історія Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png'
    );
  }

  ngOnInit(): void {
    this.loaderService.start('administration');

    this.httpGatewayService.getEmployeesListByGroupe('director').subscribe((persons) => {
      this.directorEmployees = this.directorEmployees.concat(persons.employees);
      this.isDirectorLoading = false;
      this.loaderService.stop('administration');
    });

    this.httpGatewayService.getEmployeesListByGroupe('deputies').subscribe((persons) => {
      this.deputiesEmployees = this.deputiesEmployees.concat(persons.employees);
      this.isDeputiesLoading = false;
      this.loaderService.stop('administration');
    });

    this.httpGatewayService.getEmployeesListByGroupe('administrative-accounting').subscribe((persons) => {
      this.adminAccountingEmployees = this.adminAccountingEmployees.concat(persons.employees);
      this.isAdminAccountingLoading = false;
      this.loaderService.stop('administration');
    });

    this.gateway.updateCanonicalURL();
  }
}
