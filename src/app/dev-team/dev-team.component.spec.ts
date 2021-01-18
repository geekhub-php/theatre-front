import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { DevTeamComponent } from './dev-team.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DevTeamComponent', () => {
  let component: DevTeamComponent;
  let fixture: ComponentFixture<DevTeamComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTeamComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpClientTestingModule);
    fixture = TestBed.createComponent(DevTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
