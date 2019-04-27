import { NgModule } from '@angular/core';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { CalendarService } from './calendar.service';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { StripHtmlModule } from '../shared/pipes/strip-html/strip-html.module';

@NgModule({
  providers: [
    CalendarService,
  ],
  declarations: [
    ScheduleComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    SpinnerModule,
    RouterModule,
    NgbPopoverModule,
    StripHtmlModule
  ],
  exports: [
    ScheduleComponent,
  ]
})
export class ScheduleModule { }
