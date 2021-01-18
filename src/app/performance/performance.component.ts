import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderService } from '../shared/spinner/loader.service';

import { GatewayService } from '../core/services/gateway.service';
import { Performance } from '../core/model/performance/Performance';
import { Role } from '../core/model/Role';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performance: Performance;
  slug: string;
  roles: Array<Role>;

  activeId: string;

  constructor(private gateway: GatewayService,
              private router: ActivatedRoute,
              private loaderService: LoaderService) {
    this.activeId = 'actors';
  }

  ngOnInit() {
    const slug = this.router.snapshot.paramMap.get('slug');
    this.loaderService.start('performance-page');

    forkJoin([
      this.gateway.getPerformanceBySlug(slug),
      this.gateway.getPerformanceRoles(slug)
    ]).subscribe(([performance, roles]) => {
      this.performance = performance.body;
      this.roles = roles;

      this.gateway.updateMeta(this.performance.title,
        this.performance.description,
        this.performance.mainPicture.performance_big.url);

      this.activeId = this.roles.length ? 'actors' : 'performance';

      this.loaderService.stop('performance-page');
    }, err => this.loaderService.stop('performance-page'));

    this.gateway.updateCanonicalURL();
  }
}
