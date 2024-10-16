import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { UtilsModule } from "./utils/module";
import { FormatBookingPipe } from './Pipe/format-quantity.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule} from '@angular/material/dialog';
import { BookingCalendarChildComponent } from './booking-calendar-child/booking-calendar-child.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { HeaderComponent } from './header/header.component';
import { DissenyFormComponent } from './disseny-form/disseny-form.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { DetailPostComponent } from './posts/detail-post/detail-post.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        FormatBookingPipe,
        BookingCalendarChildComponent,
        DissenyFormComponent,
        HeaderComponent,
        BodyComponent,
        FooterComponent,
        ListPostsComponent,
        DetailPostComponent,
        ConfirmDialogComponent
    ],
  /*   providers: [{provide: DateAdapter, useClass: CustomDateAdapter}], */
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDialogModule,
        DialogModule,
        MatCardModule,
        MatChipsModule,
        MatButtonToggleModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
        UtilsModule,
        BrowserAnimationsModule
    ]
})
export class AppModule { }
