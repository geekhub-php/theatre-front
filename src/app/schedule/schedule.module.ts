import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { CalendarService } from './calendar.service';
import { SpinnerModule } from '../shared/spinner/spinner.module';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [
    CalendarService,
  ],
  declarations: [
    ScheduleComponent,
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    RouterModule
  ],
  exports: [
    ScheduleComponent,
  ]
})
export class ScheduleModule { }
