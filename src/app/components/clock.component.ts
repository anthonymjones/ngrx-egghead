import { Component, Input } from '@angular/core';

@Component({
  selector: 'clock',
  template: '<h3>{{time}}</h3>'
})
export class ClockComponent {
  @Input() time;

}
