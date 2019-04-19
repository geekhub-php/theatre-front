import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GatewayService } from '../../core/service/gateway.service';
import { History } from '../../core/model/history/History';
import { LoaderService } from '../../shared/spinner/loader.service';

@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit {
  history: History;

  constructor(private route: ActivatedRoute, private gateway: GatewayService, private loaderService: LoaderService) { }

  ngOnInit() {
    const slug = this.route.snapshot.params.slug;
    this.loaderService.start('about-more');
    this.gateway.getHistoryBySlug(slug).subscribe(
      (res) => {
        this.history = res;
        this.loaderService.stop('about-more');
      },
      err => this.loaderService.stop('about-more')
    );
    this.loaderService.start('about-more');
  }
}
