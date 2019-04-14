import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { NewsListModule } from '../news-list/news-list.module';

@NgModule({
  declarations: [
    SideMenuComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NewsListModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent
  ]
})
export class HomePageModule { }
