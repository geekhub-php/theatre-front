import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatInteractiveComponent } from './cat-interactive.component';

describe('CatInteractiveComponent', () => {
  let component: CatInteractiveComponent;
  let fixture: ComponentFixture<CatInteractiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatInteractiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatInteractiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
