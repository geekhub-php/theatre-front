import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochComponent } from './epoch.component';

describe('FestivalsComponent', () => {
  let component: EpochComponent;
  let fixture: ComponentFixture<EpochComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpochComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
