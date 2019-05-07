import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Черкаський драматичний театр імені Т. Г. Шевченка';

  constructor(private meta: Meta,
              private titleService: Title) {
    this.setTitle(this.title);

    this.meta.addTag({property: 'og:url', content: 'http://theatre-shevchenko.ck.ua'});
    this.meta.addTag({property: 'og:type', content: 'website'});
    this.meta.addTag({property: 'og:title', content: this.title});
    this.meta.addTag({property: 'og:description', content: 'Черкаський академічний музично-драматичний театр імені Тараса Григоровича Шевченка'});
    this.meta.addTag({property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/img/logo.png'});
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
