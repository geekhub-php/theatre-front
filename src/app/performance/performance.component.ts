import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/Performance';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  showNavigationArrows = true;
  performance;
  slug: string;
  employees: any;


  images = ['http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg',
    'http://api.theatre.pp.ua/uploads/slider/0001/01/thumb_248_slider_slider.jpeg'];

  /**/

  constructor(
    private gateway: GatewayService,
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getPerformanceBySlug();
    this.getRoles();
  }

  getPerformanceBySlug() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateway.getPerformanceBySlug(slug).subscribe((res) => {
      this.performance = res.body;
      console.log(res.body);
    });
  }

  getRoles() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateway.getRoles(slug).subscribe((res) => {
      console.log(res);
      this.employees = res;
    });
  }


  //  без модели ни куда
  // this.getway.getPerformanceRoles().subscribe((res: PerformanceListResponse) => {
  //   this.roles = res;
  //   console.dir(this.roles);
  // });


}
