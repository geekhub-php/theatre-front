import { Component, TemplateRef, ViewChild } from '@angular/core';
import { addDays, addHours, endOfDay, endOfMonth,
  isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarView, CalendarEvent } from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }
};

@Component({
  selector: 'mwl-demo-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor() { }



}
