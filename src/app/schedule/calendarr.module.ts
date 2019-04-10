import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ CommonModule,
    FormsModule,
    NgbModalModule,
    CalendarModule
  ],

  declarations: [ CalendarComponent ],
  exports: [ CalendarComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA]
})
export class CalendarrModule { }
