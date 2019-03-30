import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { PartnersComponent } from './partners/partners.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';
import { NewsListModule } from '../news-list/news-list.module';

@NgModule({
  declarations: [
    SideMenuComponent,
    SliderComponent,
    PartnersComponent,
    BoardTrusteesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NewsListModule
  ],
  exports: [
    NewsListModule,
    SliderComponent,
    SideMenuComponent
  ]
})
export class HomePageModule { }
