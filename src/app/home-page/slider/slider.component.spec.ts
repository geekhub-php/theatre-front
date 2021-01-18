import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SliderComponent } from './slider.component';
import { HttpClientModule } from '@angular/common/http';
import { GatewayService } from '../../core/services/gateway.service';
import { of } from 'rxjs';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;

  const mockScheduleListResponse = {
    performance_events: [{
      id: 1,
      year: 2020,
      month: 5,
      day: 3,
      date_time: null,
      time: null,
      venue: null,
      buy_ticket_link: null,
      performance: null,
    }]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [GatewayService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get performance list with id', () => {
    const gatewayService = TestBed.get(GatewayService);
    const spyGetPerformanceEventList = spyOn(gatewayService, 'getPerformanceEventList')
      .and.returnValue(of(mockScheduleListResponse));

    component.ngOnInit();
    expect(spyGetPerformanceEventList).toHaveBeenCalled();

    expect(component.sliderList).toEqual(mockScheduleListResponse['performance_events']);
    expect(component.slideId).toEqual(mockScheduleListResponse['performance_events'][0].id);
  });
});
