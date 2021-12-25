import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSelectComponent } from './month-select.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MonthSelectComponent', () => {
  let component: MonthSelectComponent;
  let fixture: ComponentFixture<MonthSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MonthSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
