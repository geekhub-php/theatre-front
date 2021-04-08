import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DonateComponent } from './donate.component';

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpClientTestingModule);
    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
