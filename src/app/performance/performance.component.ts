import { Component, OnInit } from '@angular/core';
import { GatewayService } from '../core/services/gateway.service';
import { Performance } from '../core/model/performance/Performance';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../core/model/Role';
import { LoaderService } from '../shared/spinner/loader.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performance: Performance;
  slug: string;
  roles: Array<Role>;

  constructor(private gateway: GatewayService,
              private router: ActivatedRoute,
              private loaderService: LoaderService) { }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');
    this.getPerformanceBySlug(slug);
    this.getRoles();
    this.gateway.updateCanonicalURL();
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
