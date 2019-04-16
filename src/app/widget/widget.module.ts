import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterTestingModule,
  ],
  exports: [WidgetComponent]
})
export class WidgetModule { }
