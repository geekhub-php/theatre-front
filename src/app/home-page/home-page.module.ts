import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';

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
    BrowserAnimationsModule,
    GalleryModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent,
    NewsItemComponent,
    PerformanceSliderComponent
  ]
})
export class HomePageModule { }
