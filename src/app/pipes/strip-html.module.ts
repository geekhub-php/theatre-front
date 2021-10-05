import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from './stripHtml.pipe';
import { PerformanceDurationPipe } from './performance-duration.pipe';

@NgModule({
  declarations: [
    StripHtmlPipe,
    PerformanceDurationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripHtmlPipe,
    PerformanceDurationPipe
  ]
})
export class StripHtmlModule { }
