import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { Employee } from '../../../store/employee/Employee';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent implements OnInit {
  directorEmployees: Array<Employee> = [];
  deputiesEmployees: Array<Employee> = [];
  adminAccountingEmployees: Array<Employee> = [];

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

    // this.httpGatewayService.getEmployeesGroupes().subscribe((persons) => {
    //   this.loaderService.stop('load-team');
    // });

    this.httpGatewayService.getEmployeesListByGroupe('director').subscribe((persons) => {
      this.directorEmployees = this.directorEmployees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.httpGatewayService.getEmployeesListByGroupe('deputies').subscribe((persons) => {
      this.deputiesEmployees = this.deputiesEmployees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.httpGatewayService.getEmployeesListByGroupe('administrative-accounting').subscribe((persons) => {
      this.adminAccountingEmployees = this.adminAccountingEmployees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.gateway.updateCanonicalURL();
  }

}
