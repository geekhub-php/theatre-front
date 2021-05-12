import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private meta: Meta,
    private titleService: Title,
  ) {}

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
