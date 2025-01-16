import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mwl-utils-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.scss'],
})

export class CalendarHeaderComponent {

  @Input() view!: CalendarView

  @Input() viewDate!: Date

  @Input() locale: string = "ca"

  @Output() viewChange = new EventEmitter<CalendarView>()

  @Output() viewDateChange = new EventEmitter<Date>()

  CalendarView = CalendarView
  currentLang: string

  constructor( private translate: TranslateService ) {
    console.log("current-lang-calendar-header-component: ", this.translate.currentLang )
    this.currentLang = localStorage.getItem("preferredLang")
  }

  ngOnInit() {
    console.log ("Locale es: ", this.locale)
  }
  
}
