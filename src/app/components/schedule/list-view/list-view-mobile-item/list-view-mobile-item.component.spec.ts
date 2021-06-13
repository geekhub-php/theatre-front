import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewMobileItemComponent } from './list-view-mobile-item.component';


describe('ListViewMobileItemComponent', () => {
  let component: ListViewMobileItemComponent;
  let fixture: ComponentFixture<ListViewMobileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewMobileItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewMobileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
