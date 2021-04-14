import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GatewayService } from '../../../services/gateway.service';
import { History } from '../../../store/history/History';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit {
  history: History;

  constructor(
    private route: ActivatedRoute,
    private gateway: GatewayService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    // console.log('abot more component________'); // del
    const slug = this.route.snapshot.params.slug;
    this.loaderService.start('about-more');
    this.gateway
      .getHistoryBySlug(slug)
      .subscribe(
        (res) => {
          this.history = res;
          this.loaderService.stop('about-more');
          this.gateway.updateMeta(this.history.title,
            this.history.text,
            this.history.mainPicture.history_small.url);
          },
        err => this.loaderService.stop('about-more')
      );
    this.gateway.updateCanonicalURL();
  }
}
