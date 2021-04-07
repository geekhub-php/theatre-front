import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { PerformanceSliderComponent } from './performance-slider/performance-slider.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    SliderComponent,
    NewsItemComponent,
    PerformanceSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    IvyCarouselModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent,
    NewsItemComponent,
    PerformanceSliderComponent
  ]
})
export class HomePageModule { }
