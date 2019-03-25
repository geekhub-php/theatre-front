import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SideMenuComponent,
    SliderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomePageModule { }
