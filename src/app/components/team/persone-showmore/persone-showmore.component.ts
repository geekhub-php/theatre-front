import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GatewayService } from 'app/services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { Employee } from 'app/store/employee/Employee';

@Component({
  selector: 'app-persone-showmore',
  templateUrl: './persone-showmore.component.html',
  styleUrls: ['./persone-showmore.component.scss']
})
export class PersoneShowmoreComponent implements OnInit {
  employees: Array<Employee> = [];
  title: string;

  constructor(
    private gateway: GatewayService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private httpGatewayService: GatewayService,
  ) {
    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/uk/assets/images/persons.jpg');
  }

  ngOnInit() {
    this.loaderService.start('persons-showmore');

    const slug = this.route.snapshot.params.slug;

    this.httpGatewayService.getEmployeesGroup(slug).subscribe((Group) => {
      this.title = Group.title;
    });

    this.httpGatewayService.getEmployeesListByGroup(slug).subscribe((persons) => {
      this.employees = this.employees.concat(persons.employees);
      this.loaderService.stop('persons-showmore');
    });

    this.gateway.updateCanonicalURL();
  }
}
