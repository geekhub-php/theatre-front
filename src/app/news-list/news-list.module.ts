import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsItemComponent } from './news-item/news-item.component';
import { NewsListComponent } from './news-list.component';

@NgModule({
  declarations: [
    NewsItemComponent,
    NewsListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NewsListComponent
  ]
})
export class NewsListModule { }
