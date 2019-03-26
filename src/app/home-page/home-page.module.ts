import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SliderComponent } from './slider/slider.component';
import { NewsListComponent } from '../news-list/news-list.component';
import { PartnersComponent } from './partners/partners.component';
import { BoardTrusteesComponent } from './board-trustees/board-trustees.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SideMenuComponent,
    SliderComponent,
    NewsListComponent,
    PartnersComponent,
    BoardTrusteesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class HomePageModule { }
