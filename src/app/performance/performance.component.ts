import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/service/gateway.service';
import { Performance } from '../core/model/performance/Performance';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../core/model/Role';
import { LoaderService } from '../shared/spinner/loader.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performance: Performance;
  slug: string;
  roles: Array<Role>;

  /**/
  constructor(private gateway: GatewayService,
              private router: ActivatedRoute,
              private loaderService: LoaderService,
              private meta: Meta) {
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');
    this.getPerformanceBySlug(slug);
    this.getRoles();
  }

  getPerformanceBySlug(slug: string) {
    this.gateway.getPerformanceBySlug(slug).subscribe((res) => {
      this.performance = res.body;
      this.loaderService.stop('performance-page');
    }, err => this.loaderService.stop('performance-page'));
    this.loaderService.start('performance-page');
  }

  getRoles() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.gateway.getRoles(slug).subscribe((res) => {
      this.roles = res;
    });
  }

}
