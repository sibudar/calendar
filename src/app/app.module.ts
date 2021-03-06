import { LoginPage } from './../pages/login/login';
import { BookAppointmentPage } from './../pages/book-appointment/book-appointment';
import { LandingPage } from './../pages/landing/landing';
import  localeDe  from '@angular/common/locales/zu';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePipe } from '@angular/common'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-event-date-formatter/custom-event-date-formatter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule , CalendarDateFormatter , CalendarEventTitleFormatter } from 'angular-calendar';
import {  CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view' ; 
import {registerLocaleData} from '@angular/common'; 
import { DayViewPage } from '../pages/day-view/day-view';
import { EvProvider } from '../providers/ev/ev';

import { HttpClientModule} from '@angular/common/http';
import { ServiceProvider } from '../providers/service/service';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DayViewPage,
    LandingPage,
    BookAppointmentPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DayViewPage,
    LandingPage,
    BookAppointmentPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterProvider
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterProvider
    },
    EvProvider,
    DatePipe,
    ServiceProvider

  ]
})
export class AppModule {}
