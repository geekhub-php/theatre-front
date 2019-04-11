import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';

import { CalendarComponent } from './calendar/calendar.component';
import { ScheduleComponent } from './schedule.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule
  ],
  declarations: [
    CalendarComponent,
    ScheduleComponent
  ],
  exports: [ CalendarComponent ],
})
export class ScheduleModule { }
