import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../core/service/gateway.service';
import { Employee } from '../core/model/Employee';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person: Employee;
  gallery: Array<NgxGalleryImage> = [];
  galleryOptions: Array<NgxGalleryOptions>;

  constructor(
    private router: ActivatedRoute,
    private gatewayService: GatewayService
  ) { }

  ngOnInit() {
    this.getPerson();

    this.galleryOptions = [
      {
        image: false,
        thumbnailsRemainingCount: true,
        height: '100px',
        previewCloseOnClick: true,
        previewCloseOnEsc: true
      },
      {
        breakpoint: 500,
        width: '100%',
        thumbnailsColumns: 2,
        imageSize: 'cover'
      }
    ];
  }

  getPerson() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gatewayService.getEmployeeBySlug(slug).subscribe((res) => {
      this.person = res.body;
      this.gallery = res.body.gallery.map(({images}) => {
        return {
          small: images.performance_small.url,
          medium: images.reference.url,
          big: images.performance_big.url
        };
      });
    });
  }
}
