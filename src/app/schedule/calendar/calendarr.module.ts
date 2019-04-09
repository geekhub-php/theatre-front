import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { ScheduleComponent } from '../schedule.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [ CalendarComponent ],
  exports: [ CalendarComponent ],
  imports: [ CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA]
})
export class CalendarrModule { }
