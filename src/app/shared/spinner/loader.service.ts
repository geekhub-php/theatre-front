import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  subject: BehaviorSubject<{load: boolean, name: string}>;
  constructor() {
    this.subject = new BehaviorSubject({load: false, name: 'main'});
  }

  start(name: string) {
    console.log('LoaderService.start: '+name);
    this.subject.next({load: true, name});
  }

  stop(name: string) {
    this.subject.next({load: false, name});
  }
}
