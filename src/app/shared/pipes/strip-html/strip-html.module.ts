import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripHtmlPipe } from './stripHtml.pipe';
import { StripNbspPipe } from '../strip-nbsp/strip-nbsp.pipe';

@NgModule({
  declarations: [
    StripHtmlPipe,
    StripNbspPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripHtmlPipe,
    StripNbspPipe
  ]
})
export class StripHtmlModule { }
