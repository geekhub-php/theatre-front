import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../../services/gateway.service';
import { LoaderService } from '../../partials/spinner/loader.service';

@Component({
  selector: 'app-persone-showmore',
  templateUrl: './persone-showmore.component.html',
  styleUrls: ['./persone-showmore.component.scss']
})
export class PersoneShowmoreComponent implements OnInit {
  employees = [];

  constructor(
    private gateway: GatewayService,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {  }

  ngOnInit() {
    const slug = this.route.snapshot.params.slug;
    this.loaderService.start('persons-showmore');
    this.gateway
      .getHistoryBySlug(slug)// get employees by group
      .subscribe(
        (res) => {

        },
        err => this.loaderService.stop('about-more')
      );
    this.gateway.updateCanonicalURL();

    this.loaderService.start('persons-showmore');
    this.gateway.updateCanonicalURL();
  }
}
