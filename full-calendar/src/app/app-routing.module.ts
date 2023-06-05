import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';

const routes: Routes = [
  {path:'calendar1',component:CalendarComponent},
  {path:'calendar2',component:FullCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
