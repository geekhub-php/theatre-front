import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsListComponent } from './news-list.component';
import { NewsItemComponent } from './news-item/news-item.component';

@NgModule({
  declarations: [NewsItemComponent],
  imports: [
    CommonModule
  ]
})
export class NewsListModule { }
