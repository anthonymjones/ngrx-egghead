import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { SECOND, HOUR, ADVANCE, RECALL } from './reducers/reducers';

@Component({
  selector: 'ngrxe-root',
  template: `
    <input #inputNum type="number" value="0">
    <button (click)="click$.next(inputNum.value)">Update</button>
    <clock [time]="time | async | date:'hh:mm:ss a on EEEE, MMMM dd, yyyy'"></clock>

    <div (click)="person$.next(person)" *ngFor="let person of people | async">
      {{person.name}} is in {{person.time | date:'hh:mm:ss a'}}
    </div>
    <button (click)="recall$.next()">Recall</button>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  click$ = new Subject()
    .map((value: string) => ({ type: HOUR, payload: parseInt(value) }));

  person$ = new Subject()
    .map((value) => ({ payload: value, type: ADVANCE }));

  recall$ = new Subject();

  seconds$ = Observable
    .interval(1000)
    .mapTo({ type: SECOND, payload: 1 });

  time;
  people;

  constructor(store: Store<any>) {
    this.time = store.select('clock');
    this.people = store.select('people');

    Observable.merge(
      this.click$,
      this.seconds$,
      this.person$,
      this.recall$
        .withLatestFrom(this.time, (_, y) => y)
        .map((time) => ({ type: RECALL, payload: time }))
    )
      .subscribe(store.dispatch.bind(store));
  }

}
