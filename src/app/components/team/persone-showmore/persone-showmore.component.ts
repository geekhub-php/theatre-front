import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';
import { Employee } from '../../../store/employee/Employee';

@Component({
  selector: 'app-persone-showmore',
  templateUrl: './persone-showmore.component.html',
  styleUrls: ['./persone-showmore.component.scss']
})
export class PersoneShowmoreComponent implements OnInit {
  employees: Array<Employee> = [];
  titleArr = [];
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

    let slug = this.route.snapshot.params.slug;

    if (!slug) {
      slug = 'epoch';
    }

    this.httpGatewayService.getEmployeesGroupes(slug).subscribe((groupeTitle) => {
      this.titleArr = this.titleArr.concat(groupeTitle);
      this.getTitle(this.titleArr, slug);
      this.loaderService.stop('load-team');
    });

    this.httpGatewayService.getEmployeesListByGroupe(slug).subscribe((persons) => {
      this.employees = this.employees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.gateway.updateCanonicalURL();
  }

  getTitle(arr, slug) {
    this.title = arr.filter(group => group.slug === slug);
  }

}
