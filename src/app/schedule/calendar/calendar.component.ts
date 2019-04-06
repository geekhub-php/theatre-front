import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnInit} from '@angular/core';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { GatewayService } from '../../core/service/gateway.service';
import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';
import { ScheduleListResponse } from '../../core/model/schedule/ScheduleListResponse';



@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  scheduleList: Array<PerformanceEvent>;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Performance title and time',
      allDay: true
    },
    {
      start: startOfDay(new Date()),
      title: 'Performance title and time',
    },
    {
      start: subDays(endOfMonth(new Date()), 2),
      end: addDays(endOfMonth(new Date()), 2),
      title: 'Performance title and time',
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 1),
      end: new Date(),
      title: '',
    }
  ];

  activeDayIsOpen: boolean = false;

  constructor(private gateway: GatewayService, private modal: NgbModal) {
  }


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  ngOnInit() {
    const [from, to] = this.getDates(2019, 4);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = res.performance_events;

      console.log(res);
      console.log(new ScheduleListResponse());

    });
  }

  getDates(year: number, month: number) {
    // black magic
    return ['31-03-2019', '04-05-2019'];
  }
}
