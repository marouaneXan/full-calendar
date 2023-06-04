import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days:any = [];
  events: any[] = [];
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  newEventDescription = '';

  constructor() {}

  ngOnInit() {
    this.generateDays(this.currentYear, this.currentMonth);
  }

  generateDays(year: number, month: number) {
    this.days = [];
    let date = new Date(year, month, 1);
    const today = new Date();

    while (date.getDay() !== 0) {
      date.setDate(date.getDate() - 1);
      this.days.unshift({ date: new Date(date), isOtherMonth: true, isToday: this.isToday(date, today), events: this.getEventsForDay(date) });
    }

    date = new Date(year, month, 1);

    while (date.getMonth() === month) {
      this.days.push({ date: new Date(date), isOtherMonth: false, isToday: this.isToday(date, today), events: this.getEventsForDay(date) });
      date.setDate(date.getDate() + 1);
    }

    while (date.getDay() !== 0) {
      this.days.push({ date: new Date(date), isOtherMonth: true, isToday: this.isToday(date, today), events: this.getEventsForDay(date) });
      date.setDate(date.getDate() + 1);
    }
  }

  getEventsForDay(date: Date): Event[] {
    return this.events.filter(event =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  }

  isToday(date:any, today:any) {
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateDays(this.currentYear, this.currentMonth);
  }

  addEvent(date: Date) {
    this.events.push({ date, description: this.newEventDescription });
    this.newEventDescription = '';
    this.generateDays(this.currentYear, this.currentMonth);
  }
}
