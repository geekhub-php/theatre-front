import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForAdultsComponent } from './for-adults.component';

describe('ForAdultsComponent', () => {
  let component: ForAdultsComponent;
  let fixture: ComponentFixture<ForAdultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForAdultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForAdultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
