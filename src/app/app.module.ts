import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock.component';

import { clock, people } from './reducers/reducers';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ clock, people })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
