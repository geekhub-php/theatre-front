/* tslint:disable */
import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    expect(service).toBeTruthy();
  });
  it('check dates for May 2019, wide', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    service.setDate(new Date(2019, 4, 20));

    const weeks = service.weeks;
    const firstDay = weeks.shift().shift();
    const lastDay = weeks.pop().pop();

    expect(firstDay.getDate()).toBe(29);
    expect(firstDay.getMonth()).toBe(3);
    expect(lastDay.getDate()).toBe(2);
    expect(lastDay.getMonth()).toBe(5);
  });
  it('check dates for Jun 2019, wide', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    service.setDate(new Date(2019, 5, 20));

    const weeks = service.weeks;
    const firstDay = weeks.shift().shift();
    const lastDay = weeks.pop().pop();

    expect(firstDay.getDate()).toBe(27);
    expect(firstDay.getMonth()).toBe(4);
    expect(lastDay.getDate()).toBe(30);
    expect(lastDay.getMonth()).toBe(5);
  });
  it('check dates for Jul 2019, wide', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    service.setDate(new Date(2019, 6, 20));

    const weeks = service.weeks;
    const firstDay = weeks.shift().shift();
    const lastDay = weeks.pop().pop();

    expect(firstDay.getDate()).toBe(1);
    expect(firstDay.getMonth()).toBe(6);
    expect(lastDay.getDate()).toBe(4);
    expect(lastDay.getMonth()).toBe(7);
  });
});
