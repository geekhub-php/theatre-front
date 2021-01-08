import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { GatewayService } from '../core/services/gateway.service';
import { Employee } from '../core/model/employee/Employee';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Employee;
  galleryOptions: Array<NgxGalleryOptions>;

  constructor(
    private router: ActivatedRoute,
    private gatewayService: GatewayService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.getPerson(slug);
    this.galleryOptions = [
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
    this.gatewayService.updateCanonicalURL();
  }

  getPerson(slug) {
    this.loaderService.start('person');
    this.gatewayService.getEmployeeBySlug(slug).subscribe(
      res => {
        this.person = plainToClass(Employee, res);
        this.loaderService.stop('person');
      },
      err => this.loaderService.stop('person')
    );
  }
}
