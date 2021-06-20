import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { plainToClass } from 'class-transformer';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';

import { GatewayService } from '../../services/gateway.service';
import { Employee } from '../../store/employee/Employee';
import { LoaderService } from '../partials/spinner/loader.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: Employee;
  galleryOptions: Array<NgxGalleryOptions> = [
    {
      image: false,
      thumbnailsRemainingCount: true,
      height: '100px',
      previewCloseOnEsc: true,
      previewAnimation: false
    },
    {
      breakpoint: 770,
      width: '100%',
      thumbnailsColumns: 1,
      imageSize: 'cover'
    }
  ];

  constructor(
    private router: ActivatedRoute,
    private gatewayService: GatewayService,
    private loaderService: LoaderService,
  ) {
  }

  ngOnInit() {
    this.gatewayService.updateCanonicalURL();
    if (this.person) {
      this.person = plainToClass(Employee, this.person);

      return;
    }
    const slug = this.router.snapshot.paramMap.get('personId');
    this.getPerson(slug);
  }

  getPerson(slug) {

    this.loaderService.start('person');

    this.gatewayService.getEmployeeBySlug(slug).subscribe(
      res => {
        this.person = plainToClass(Employee, res);
        this.loaderService.stop('person');
        this.gatewayService.updateMeta(`${this.person.first_name} ${this.person.last_name}`,
          this.person.biography, this.person.avatar.employee_small.url);
        },
      err => this.loaderService.stop('person')
    );
  }

}
