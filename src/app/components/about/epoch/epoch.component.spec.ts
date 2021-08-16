import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EpochComponent } from './epoch.component';

describe('EpochComponent', () => {
  let component: EpochComponent;
  let fixture: ComponentFixture<EpochComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpochComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
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
