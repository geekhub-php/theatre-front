import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum ESidebar {
  navbar = 'navbar',
  donate = 'donate',
  settings = 'settings'
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  subject: BehaviorSubject<{ isActive: boolean, barName: ESidebar}>;

  constructor() {
    this.subject = new BehaviorSubject({ isActive: false, barName: ESidebar.navbar });
  }

  open(barName: ESidebar) {
    this.subject.next({ isActive: true, barName });
  }

  close(barName: ESidebar) {
    this.subject.next({ isActive: false, barName });
  }
}
