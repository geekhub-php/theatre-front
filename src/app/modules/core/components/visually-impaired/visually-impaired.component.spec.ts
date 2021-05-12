import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuallyImpairedComponent } from './visually-impaired.component';

describe('VisuallyImpairedComponent', () => {
  let component: VisuallyImpairedComponent;
  let fixture: ComponentFixture<VisuallyImpairedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisuallyImpairedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuallyImpairedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
