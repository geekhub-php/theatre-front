import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
  donateVisibility: BehaviorSubject<{ active: boolean }>;

  constructor() {
    this.donateVisibility = new BehaviorSubject({ active: false });
  }

  activeDonateMenu() {
    this.donateVisibility.next({ active: true });
  }

  disableDonateMenu() {
    this.donateVisibility.next({ active: false });
  }
}
