import { Component, LOCALE_ID, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TheaterGroup } from 'schema-dts';
import { TheatreGroupEn } from './core/model/schema/TheatreGroupEn';
import { TheatreGroupUk } from './core/model/schema/TheatreGroupUk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schema: TheaterGroup;
  constructor(private meta: Meta,
              private titleService: Title,
              @Inject(LOCALE_ID) public locale: string) {
      this.schema = 'en-US' === locale ? TheatreGroupEn.map() : TheatreGroupUk.map();
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
