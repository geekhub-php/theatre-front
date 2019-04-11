import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
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

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  loading = true;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private gateway: GatewayService, private modal: NgbModal) {
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getDates(year: number, month: number) {
    // black magic
    return ['31-03-2019', '04-05-2019'];
  }

  dayClicked({date, events}: { date: Date; events: Array<PerformanceEvent> }): void {
    if (!isSameMonth(date, this.viewDate)) return;

    this.viewDate = date;
    this.activeDayIsOpen = true;
    if (
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  ngOnInit() {
    const [from, to] = this.getDates(2019, 4);
    this.gateway.getSchedulesList(from, to).subscribe((res: ScheduleListResponse) => {
      this.scheduleList = plainToClass(ScheduleListResponse, res).performance_events;
    });
  }


}
