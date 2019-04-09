import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from './stripHtml.pipe';

@NgModule({
  declarations: [
    StripHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripHtmlPipe
  ]
})
export class StripHtmlModule { }
