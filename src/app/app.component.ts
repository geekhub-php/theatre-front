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

    this.meta.addTags([
      {property: 'og:title', content: this.title},
      {property: 'og:image', content: 'http://theatre-shevchenko.ck.ua/img/logo.png'},
      {property: 'og:url', content: 'http://theatre-shevchenko.ck.ua'},
      {property: 'og:type', content: 'website'},
      {property: 'og:description', content: 'Черкаський академічний музично-драматичний театр імені Тараса Григоровича Шевченка'}
      ]);
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
