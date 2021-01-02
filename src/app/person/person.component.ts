import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { GatewayService } from '../core/services/gateway.service';
import { Employee } from '../core/model/employee/Employee';
import { LoaderService } from '../shared/spinner/loader.service';
import { Meta } from '@angular/platform-browser';

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
    private loaderService: LoaderService,
    private meta: Meta
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
    this.gatewayService.createLinkForCanonicalURL();
  }

  getPerson(slug) {
    this.loaderService.start('person');
    this.gatewayService.getEmployeeBySlug(slug).subscribe(
      res => {
        this.person = plainToClass(Employee, res);
        this.loaderService.stop('person');
        this.updateMeta();
      },
      err => this.loaderService.stop('person')
    );
  }

  updateMeta() {
    this.meta.updateTag({property: 'og:title', content: `${this.person.first_name} ${this.person.last_name}`});
    this.meta.updateTag({property: 'og:description', content: this.person.biography});
    this.meta.updateTag({property: 'og:image', content: this.person.avatar.employee_small.url});
  }
}
