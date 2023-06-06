import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarService } from '../services/full-calendar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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

  calendarOptions: any = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [],
    eventClick: this.handleEventClick.bind(this),
  };
  eventForm = new FormGroup({
    title: new FormControl<string | null>(null, [Validators.required]),
    start: new FormControl<Date | null>(null, [Validators.required])
  })

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

  handleEventClick(clickInfo: any) {
    console.log(clickInfo.event._def);
  }

  addEvent(eventForm: FormGroup) {
    this.fullCalendarService.addEvent(eventForm.value).subscribe(
      () => {
        alert('Event added successfully :)')
        this.eventForm.reset()
        this.getEvents()
      },
      err => {
        console.log(err);
      }
    )
  }






}
