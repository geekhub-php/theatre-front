import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [WidgetComponent]
})
export class WidgetModule { }
