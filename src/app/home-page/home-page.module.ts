import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { NewsItemComponent } from '../news-item/news-item.component';
import { PerformanceSliderComponent } from './performance-slider/performance-slider.component';

@NgModule({
  declarations: [
    SideMenuComponent,
    NewsItemComponent,
    PerformanceSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    GalleryModule
  ],
  exports: [
    SideMenuComponent,
    NewsItemComponent,
    PerformanceSliderComponent
  ]
})
export class HomePageModule { }
