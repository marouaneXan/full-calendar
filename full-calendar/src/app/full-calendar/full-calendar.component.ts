import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarService } from '../services/full-calendar.service';


@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {

  constructor(private fullCalendarService: FullCalendarService) { }

  ngOnInit(): void {
    this.getEvents()
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: []
  };

  getEvents() {
    this.fullCalendarService.getEvents().subscribe(
      (events: any) => {
        const transformedEvents = events.map((event: any) => {
          if (event.date) {
            const dateParts = event.date.split("-");
            const isoDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            return {
              ...event,
              start: isoDate,
            };
          }
          return event;
        });
        console.log(transformedEvents);
        this.calendarOptions = {
          ...this.calendarOptions,
          eventSources: [
            {
              events: transformedEvents,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }






}
