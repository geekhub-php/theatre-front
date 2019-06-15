import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { NewsItemComponent } from '../news-item/news-item.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    SliderComponent,
    NewsItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent,
    NewsItemComponent
  ]
})
export class HomePageModule { }
