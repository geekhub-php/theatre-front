import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({name: 'og:url', content: 'http://theatre-shevchenko.ck.ua'});
    this.meta.addTag({name: 'og:type', content: 'website'});
    this.meta.addTag({name: 'og:title', content: 'Черкаський драматичний театр імені Т. Г. Шевченка'});
    this.meta.addTag({name: 'og:description', content: 'Черкаський академічний музично-драматичний театр імені Тараса Григоровича Шевченка'});
    this.meta.addTag({
      name: 'og:image',
      content: 'https://scontent.fdnk2-1.fna.fbcdn.net/v/t1.0-0/c0.0.369.369a/p370x247/12122823_1672362166338620_1793269158110847143_n.jpg'
    });
  }
  title = 'app';
}
