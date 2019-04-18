import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsItemComponent } from '../news-item/news-item.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    SliderComponent,
    NewsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent
  ]
})
export class HomePageModule {
}
