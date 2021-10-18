import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsSliderComponent } from './persons-slider.component';

describe('PersonsSliderComponent', () => {
  let component: PersonsSliderComponent;
  let fixture: ComponentFixture<PersonsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
