import { Component, ViewEncapsulation } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, finalize } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, CalendarWeekViewBeforeRenderEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { colors } from '../utils/colors';
import { addDays, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { ThemePalette } from '@angular/material/core';
import { BookingDTO } from '../Models/booking.model';
import { BookingService } from '../Services/booking.service';
import { SharedService } from '../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EmailManagementService } from '../Services/emailManagement.service';
import { EventColor } from 'calendar-utils';
import { registerLocaleData } from '@angular/common';
import localeCa from '@angular/common/locales/ca';

registerLocaleData(localeCa);

@Component({
  selector: 'app-booking-calendar-child',
  templateUrl: './booking-calendar-child.component.html',
  styleUrls: ['./booking-calendar-child.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class BookingCalendarChildComponent {
  minDate: Date
  minDateTo: Date
  maxDate: Date
  fromDate: FormControl
  fromDateFromTime!: FormControl
  toDate: FormControl
  toDateToTime!: FormControl
  resourceToBook: UntypedFormControl
  bookerName: UntypedFormControl
  idCard: UntypedFormControl
  bookerEMail: UntypedFormControl
  bookingForm: UntypedFormGroup
  acceptTerms: FormControl<any>
  modal: any;
  theBooking: BookingDTO
  bookings: BookingDTO[] = []
  currentLang: string = ""

  public disabled = false
  public showSpinners = true
  public showSeconds = false
  public stepMinute = 1
  public stepSecond = 1
  public enableMeridian = false
  public touchUi = false
  public disableMinute = false
  public showTime = false
  public color: ThemePalette = 'primary'

  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  view: CalendarView = CalendarView.Month

  isDragable: boolean = false
  isbeforeStart: boolean = false
  isafterEnd: boolean = false
  CalendarView = CalendarView
  viewDate: Date = new Date()

  modalData?: {
    action: string;
    event: CalendarEvent;
  }

  /* events: CalendarEvent[] = [] */

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
 
  events: CalendarEvent[] = [
   /*  {
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(), 4),
      title: 'Reserva Pavellón A',
      color: colors.pavellonA,
      allDay: true,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    },
    {
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(), 0),
      title: 'Reserva Pavellón B',
      color: colors.pavellonB,
      allDay: true,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 14),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 16), 1),
      title: 'Reserva Sala GROGA',
      color: colors.yellow,
      allDay: false,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 17),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 18), 1),
      title: 'Reserva sala BLAVA',
      color: colors.blue,
      allDay: false,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 10),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 11), 1),
      title: `<b>SALA VERMELLA</b><br>reserva desde el 21/08/2024  a las 09.30 hasta el 21/08/2024 a las 10.30<br>estado: Pending`,
      color: colors.red,
      allDay: false,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    },
    {
      start: addHours(startOfDay(setDay(new Date(), 3)), 8),
      end: subSeconds(addHours(startOfDay(setDay(new Date(), 3)), 9), 1),
      title: 'Reserva sala BLANCA',
      color: colors.white,
      allDay: false,
      cssClass: 'event-class',
      resizable: {
        beforeStart: this.isbeforeStart,
        afterEnd: this.isafterEnd,
      },
      draggable: this.isDragable,
    }, */
  ];

  constructor (
    private formBuilder: UntypedFormBuilder,
    private bookingService: BookingService,
    private sharedService: SharedService,
    private dateAdapter: DateAdapter<Date>,
    private emailManagementService: EmailManagementService,
    ) {
    /* this.dateAdapter.getFirstDayOfWeek = () => 1
    this.dateAdapter.setLocale = () => 'ca' */
    this.theBooking = new BookingDTO( 0, '', '', '', this.dateAdapter.today(), this.dateAdapter.today(), 'Pending', false);
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()+0 /* número de días a partir de la fecha actual que estarán activados */

    this.minDate = new Date(currentYear, currentMonth, currentDay+1) /* Reservas con una antelación de 1 días */
    this.minDateTo = this.minDate
    this.maxDate = new Date(currentYear + 1, 11, 31)

    this.bookerName = new UntypedFormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(60) ])
    this.idCard = new UntypedFormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    this.bookerEMail = new UntypedFormControl('', [ Validators.required, Validators.email ])
    this.resourceToBook = new UntypedFormControl('', [ Validators.required ])
    this.fromDate = new FormControl<Date | null>(null, [ Validators.required ])
    this.fromDateFromTime = new FormControl('')
    this.toDate = new FormControl<Date | null>(null, [ Validators.required])
    this.toDateToTime = new FormControl('')
    this.acceptTerms = new FormControl(false, [Validators.requiredTrue])

    this.bookingForm = this.formBuilder.group ({
      bookerName: this.bookerName,
      idCard: this.idCard,
      bookerEMail: this.bookerEMail,
      resourceToBook: this.resourceToBook,
      fromDate: this.fromDate,
      fromDateFromTime : this.fromDateFromTime,
      toDate: this.toDate,
      toDateToTime : this.toDateToTime,
      acceptTerms: this.acceptTerms,
    })

    this.bookingForm.valueChanges.subscribe((e) => {
      const currentYearTo = new Date(e.fromDate).getFullYear()
      const currentMonthTo = new Date(e.fromDate).getMonth()
      const currentDayTo = new Date(e.fromDate).getDate()
      this.minDateTo = new Date(currentYearTo, currentMonthTo, currentDayTo)
      if (e.resourceToBook) {
        this.resourceSelected(e.resourceToBook)
      }
    });
  }

  ngOnInit() {
   this.currentLang = localStorage.getItem('preferredLang')
   this.loadBookingList()
  }

  private loadBookingList() {
    let eventItem: CalendarEvent
    let myColor: EventColor
    let myTitle: string = ""
    let startHour: string  
    let endHour: string
    let errorResponse: any
    this.events = []

    this.bookingService.getAllBookings()
    .pipe( )
    .subscribe(
        (bookings: BookingDTO[]) => {
          this.bookings = bookings
          if (this.bookings) {
            this.bookings.map( (event: any) => {
                switch(event.resourceBooked.split("-")[0]) {
                case 'red':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.red
                  }
                  myTitle = `<b>-SALA VERMELLA-</b><br>reserva desde el ${new Date(event.fromDate).toLocaleDateString()}  a las ${event.fromDateFromTime} hasta el ${new Date(event.toDate).toLocaleDateString()} a las ${event.toDateToTime}<br>estado: *${event.state}*`
                  startHour = event.fromDate+" "+event.fromDateFromTime
                  endHour = event.toDate+" "+event.toDateToTime
                  eventItem = {
                    title:  myTitle,
                    color:  myColor,
                    start:  new Date( startHour ),
                    end:    new Date( endHour ),
                    meta: {
                      type: 'info'
                    },
                    allDay: false,
                    cssClass: 'event-class',
                    resizable: {
                      beforeStart: this.isbeforeStart,
                      afterEnd: this.isafterEnd,
                    },
                    draggable: this.isDragable,
                  }
                  break
                case 'blue':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.blue
                  }
                  myTitle = "<b>-SALA BLAVA-</b><br>reserva desde el " + new Date(event.fromDate).toLocaleDateString() + " a las " + event.fromDateFromTime + " hasta el " + new Date(event.toDate).toLocaleDateString() + " a las " + event.toDateToTime + "<br>estado: " + event.state
                  startHour = event.fromDate+" "+event.fromDateFromTime
                  endHour = event.toDate+" "+event.toDateToTime
                  eventItem = {
                    title:  myTitle,
                    color:  myColor,
                    start:  new Date( startHour ),
                    end:    new Date( endHour ),
                    meta: {
                      type: 'info'
                    },
                    allDay: false,
                    cssClass: 'event-class',
                    resizable: {
                      beforeStart: this.isbeforeStart,
                      afterEnd: this.isafterEnd,
                    },
                    draggable: this.isDragable,
                  }                  
                  break
                case 'white':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.white
                  }
                  myTitle = "<b>-SALA BLANCA-</b><br>reserva desde el " + new Date(event.fromDate).toLocaleDateString() + " a las " + event.fromDateFromTime + " hasta el " + new Date(event.toDate).toLocaleDateString() + " a las " + event.toDateToTime + "<br>estado: " + event.state
                  startHour = event.fromDate+" "+event.fromDateFromTime
                  endHour = event.toDate+" "+event.toDateToTime
                  eventItem = {
                    title:  myTitle,
                    color:  myColor,
                    start:  new Date( startHour ),
                    end:    new Date( endHour ),
                    meta: {
                      type: 'info'
                    },
                    allDay: false,
                    cssClass: 'event-class',
                    resizable: {
                      beforeStart: this.isbeforeStart,
                      afterEnd: this.isafterEnd,
                    },
                    draggable: this.isDragable,
                  }                  
                  break
                case 'yellow':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.yellow
                  }
                  myTitle = "<b>-SALA GROGA-</b><br>reserva desde el " + new Date(event.fromDate).toLocaleDateString() + " a las " + event.fromDateFromTime + " hasta el " + new Date(event.toDate).toLocaleDateString() + " a las " + event.toDateToTime + "<br>estado: " + event.state
                  startHour = event.fromDate+" "+event.fromDateFromTime
                  endHour = event.toDate+" "+event.toDateToTime
                  eventItem = {
                    title:  myTitle,
                    color:  myColor,
                    start:  new Date( startHour ),
                    end:    new Date( endHour ),
                    meta: {
                      type: 'info'
                    },
                    allDay: false,
                    cssClass: 'event-class',
                    resizable: {
                      beforeStart: this.isbeforeStart,
                      afterEnd: this.isafterEnd,
                    },
                    draggable: this.isDragable,
                  }                  
                  break
                case 'A':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.pavellonA
                  }
                  myTitle = "<b>-PAVELLÓ A-</b><br>reserva desde el "  + new Date(event.fromDate).toLocaleDateString() + " hasta el " + new Date(event.toDate).toLocaleDateString() + "<br>estado: " + event.state
                  eventItem = {
                    title:  myTitle,
                    color:  myColor,
                    start:  subDays(startOfDay(new Date(event.fromDate)), 0),
                    end:    addDays(new Date(event.toDate), 0),
                    meta: {
                      type: 'info'
                    },
                    allDay: false,
                    cssClass: 'event-class',
                    resizable: {
                      beforeStart: this.isbeforeStart,
                      afterEnd: this.isafterEnd,
                    },
                    draggable: this.isDragable,
                  }
                  break
                case 'B':
                  if (event.state === 'Pending') {
                    myColor = colors.grey
                  } else {
                    myColor = colors.pavellonB
                  }
                  myTitle = "<b>-PAVELLÓ B-</b><br>reserva desde el "  + new Date(event.fromDate).toLocaleDateString() + " hasta el " + new Date(event.toDate).toLocaleDateString() + "<br>estado: " + event.state
                  break
                case 'AB':
                    if (event.state === 'Pending') {
                      myColor = colors.grey
                    } else {
                      myColor = colors.pavellonAB
                    }
                    myTitle = "<b>-PAVELLÓNS A + B-</b><br>reserva desde el "  + new Date(event.fromDate).toLocaleDateString() + " hasta el " + new Date(event.toDate).toLocaleDateString() + "<br>estado: " + event.state
                    break                
                }
            this.events.push(eventItem)
            this.refresh.next() /* Para que en la primera carga del calendario pinte los eventos que hay en la bbdd */
          })
        }
        },
         (error: HttpErrorResponse) => {
           errorResponse = error.error;
           this.sharedService.errorLog(errorResponse)
         }
       );
  }

  public resourceSelected( resource: string ) {
      if (resource.split("-")[1] === 'room') {
        this.showTime = true
      } else if (resource.split("-")[1] === 'pavillion') {
        this.showTime = false
      }
  }

  /* events: CalendarEvent[] = [] */

  activeDayIsOpen: boolean = false;

  refresh = new Subject<void>();

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action }
    document.getElementById("resourceDetail")?.classList.remove("ocultar")
    document.getElementById("resourceDetail")!.innerHTML = event.title
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (segment.date.getHours() > 2) {
            segment.cssClass = "bg-pink"
          }
        })
      })
    })
  }


  /*   validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }

    delete event.cssClass;
    // don't allow dragging or resizing events to different days
    const sameDay = isSameDay(newStart, newEnd);

    if (!sameDay) {
      return false;
    }

    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      return (
        otherEvent !== event &&
        !otherEvent.allDay &&
        ((otherEvent.start < newStart && newStart < otherEvent.end) ||
          (otherEvent.start < newEnd && newStart < otherEvent.end))
      );
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.cssClass = 'invalid-position';
      } else {
        return false;
      }
    }

    return true;
  }; */

/*   addEvent(event:any): void {
    this.events = [
      ...this.events,
      {
        title: event,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
    this.updateBooking.emit(this.events);
  } */

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onSubmit():void {
    let resourceColor: any
    if (this.resourceToBook) {
      resourceColor = "colors."+ this.resourceToBook.value.split("-")[0]
    }
    /* this.events = [
      ...this.events,
      {
        title: this.resourceToBook.value+"<br>...PENDING CONFIRMATION !!!",
        start: startOfDay(this.fromDate.value),
        end: endOfDay(this.toDate.value),
        color: colors.grey,
        draggable: this.isDragable,
        resizable: {
          beforeStart: this.isDragable,
          afterEnd: this.isafterEnd,
        },
      },
    ]; */

    let errorResponse: any
    let responseOK: boolean = false
    this.theBooking = this.bookingForm.value
    this.theBooking.fromDate.setDate(this.theBooking.fromDate.getDate()+1)
    this.theBooking.toDate.setDate(this.theBooking.toDate.getDate()+1)
    this.bookingService.createBooking(this.theBooking)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'postFeedback',
              responseOK,
              errorResponse
            );
            if (responseOK) {
              this.emailManagementService.sendCustomerEmail(this.theBooking)
              .subscribe((sendMailResult:any) => {
              },
              (error: HttpErrorResponse) => {
                errorResponse = error;
                this.sharedService.errorLog(errorResponse);
              })
            }
          })
        )
        .subscribe(
          () => {
            responseOK = true;
            this.resourceToBook.reset()
            this.fromDate.reset()
            this.fromDateFromTime.reset()
            this.toDate.reset()
            this.toDateToTime.reset()
            this.bookerName.reset()
            this.bookerEMail.reset()
            this.idCard.reset()
            this.loadBookingList()
          },
          (error: HttpErrorResponse) => {
            errorResponse = error
            this.sharedService.errorLog(errorResponse)
          }
        );
  }

  weekEndFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
    const day = date?.getDay()
    return day !== 0 && day !== 6
    //0 means sunday
    //6 means saturday
  }

  bookingDatesFrom: Date[] = [new Date(2024, 10, 26), new Date(2024, 10, 25), new Date(2024, 10, 29), new Date(2024, 10, 28)]
  bookingDatesTo:   Date[] = [new Date(2024, 11, 26), new Date(2024, 11, 25), new Date(2024, 10, 29), new Date(2024, 10, 28)]

  /* bookingDatesFrom: Date[] = []
  bookingDatesTo:   Date[] = [] */
  onResourceChange(resourceItem:any) {
    this.bookingService.getBookingByResource(resourceItem.value)
      .subscribe((itemResource:BookingDTO[]) => {
        if (itemResource) {
          itemResource.forEach((resourceItem:any) => {
            if (resourceItem.resourceBooked === 'A-pavillion') {
              resourceItem.fromDate.getMonth -1
              resourceItem.toDate.getMonth -1
              this.bookingDatesFrom.push(new Date (resourceItem.fromDate) )
              this.bookingDatesTo.push(new Date (resourceItem.toDate) )
            } else {
              console.log ("Room booked dates and times: ", resourceItem.resourceBooked, resourceItem.fromDate, resourceItem.fromDateFromTime, resourceItem.toDate, resourceItem.toDateToTime)
            }
            console.log ("booked dates: ", this.bookingDatesFrom, this.bookingDatesTo) 
          })
        } else {
          console.log (`no bookings for item ${resourceItem.value}`)
        }
      })
  }

  disableTimeFrom(fromTime:any) {
    console.log ("from Time: ", fromTime.value)
  }
  
  BookedDaysFilterFrom: (d: Date | null) => boolean = 
  (d: Date | null) => {
    if (!d) return false;
    const time = d.getTime();
    return !this.bookingDatesFrom.some(date => date.getTime() === time);
  }

  BookedDaysFilterTo: (d: Date | null) => boolean = 
  (d: Date | null) => {
    if (!d) return false;
    const time = d.getTime();
    return !this.bookingDatesTo.some(date => date.getTime() === time);
  }

}

