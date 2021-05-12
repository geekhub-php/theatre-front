import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../partials/spinner/loader.service';
import { GatewayService } from '../../../services/gateway.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../../store/employee/Employee';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'app-artistic',
  templateUrl: './artistic.component.html',
  styleUrls: ['./artistic.component.scss'],
})
export class ArtisticComponent implements OnInit, AfterContentChecked {
  artCoreEmployees: Array<Employee> = [];
  artProductionEmployees: Array<Employee> = [];

  carouselTile: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6, all: 0 },
    gridBreakpoints: {
      sm: 1100,
      md: 1500,
      lg: 1800,
      xl: 2200,
    },
    slide: 1,
    speed: 250,
    point: {
      visible: true
    },
    loop: false,
    load: 2,
    velocity: 0,
    touch: false,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService,
    private httpGatewayService: GatewayService,
    private _cdr: ChangeDetectorRef
  ) {
    this.gateway.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Персоналії Черкаського академічного музично-драматичного театру імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/uk/assets/images/persons.jpg');
  }

  ngOnInit(): void {
    this.loaderService.start('artistic');

    this.httpGatewayService.getEmployeesListByGroupe('art-core').subscribe((persons) => {
      this.artCoreEmployees = this.artCoreEmployees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.httpGatewayService.getEmployeesListByGroupe('art-production').subscribe((persons) => {
      this.artProductionEmployees = this.artProductionEmployees.concat(persons.employees);
      this.loaderService.stop('load-team');
    });

    this.gateway.updateCanonicalURL();
    this.ngAfterContentChecked();
  }

  ngAfterContentChecked(): void {
    // if (this.myCarousel) {
    //   this.myCarousel.activePoint = 4;
    // }
    // if (this.myCarousel2) {
    //   this.myCarousel2.activePoint = 4;
    // }
    this._cdr.detectChanges();
  }
}
