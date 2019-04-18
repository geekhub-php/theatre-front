import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
    RouterModule,
    NewsListModule,
    RouterTestingModule
  ],
  exports: [
    SliderComponent,
    SideMenuComponent,
    NewsItemComponent
  ]
})
export class HomePageModule { }
