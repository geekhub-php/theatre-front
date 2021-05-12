import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { LoaderService } from '../partials/spinner/loader.service';
import { GatewayService } from '../../services/gateway.service';
import { NewsItem } from '../../store/news/NewsItem';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewChecked {
  limit = '3';
  listPost: Array<NewsItem> = [];
  readonly canonicalUrl = environment.canonicalUrl;

  constructor(private gatewayService: GatewayService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.start('home');
    this.gatewayService.getNews(this.limit, 1).subscribe((res: { posts }) => {
        this.listPost = res.posts;
        this.loaderService.stop('home');
      },
      err => this.loaderService.stop('home')
    );
    this.gatewayService.updateCanonicalURL();
  }

  ngAfterViewChecked() {
    this.gatewayService.updateMeta('Черкаський драматичний театр імені Т. Г. Шевченка',
      'Черкаський академічний музично-драматичний театр імені Тараса Григоровича Шевченка',
      'http://theatre-shevchenko.ck.ua/assets/images/logo.png');
  }
}
