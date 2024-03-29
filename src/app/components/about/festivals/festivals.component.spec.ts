import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FestivalsComponent } from './festivals.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FestivalsComponent', () => {
  let component: FestivalsComponent;
  let fixture: ComponentFixture<FestivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalsComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
