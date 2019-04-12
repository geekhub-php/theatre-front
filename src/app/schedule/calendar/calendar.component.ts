import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { addDays, endOfDay, endOfMonth, isSameDay, isSameMonth, subDays } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { GatewayService } from '../../core/service/gateway.service';
import { ScheduleListResponse } from '../../core/model/schedule/ScheduleListResponse';
import { plainToClass } from 'class-transformer';
import { PerformanceEvent } from '../../core/model/schedule/PerformanceEvent';

@Component({
  selector: 'mwl-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  scheduleList: Array<PerformanceEvent>;

  events = this.scheduleList;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = false;

  loading = true;

  year = 2019;
  month = 4;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private gateway: GatewayService, private modal: NgbModal) {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  static getDates(year: number, month: number) {
    return ['31-03-2019', '31-12-2019'];
  }

  dayClicked({date, events}: { date: Date; events: Array<PerformanceEvent> }): void {
   if(isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0 ? this.activeDayIsOpen = false :
        this.activeDayIsOpen = true
    }
  }


      /*f (!isSameMonth(date, this.viewDate)) return;
     this.viewDate = date;
     this.activeDayIsOpen = !(
       (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true)||
       events.length === 0
     );
     this.activeDayIsOpen = true;
   }*/

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  ngOnInit() {
    const [from, to] = CalendarComponent.getDates(this.year, this.month);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = plainToClass(ScheduleListResponse, res).performance_events;
    });
  }
}
