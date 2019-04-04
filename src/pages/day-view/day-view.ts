import { EvProvider } from './../../providers/ev/ev';
import { BookAppointmentPage } from './../book-appointment/book-appointment';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs/Subject';
import { CalendarEventTimesChangedEvent } from 'angular-calendar';
import { addHours } from 'date-fns';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the DayViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day-view',
  templateUrl: 'day-view.html',
})
export class DayViewPage {

  date: Date ; 
  events: CalendarEvent[] = [] ;
  refresh: Subject<any> = new Subject() ;
  isDragging = false;
  view = "month" ;
  locale= "zu" ;
  constructor(public ev: EvProvider ,public modalCtrl: ModalController ,public navCtrl: NavController, public navParams: NavParams , private alrtCtrl: AlertController) {
    let selected: Date = new Date(this.navParams.get("day")) ; 


    this.date = selected ; 

    console.log(this.date) ;
  }

  ionViewDidLoad() {


  }

  handleEvent(clicked,event: CalendarEvent): void {
    let alert = this.alrtCtrl.create({
      title: event.title,
      message: event.vanue,
      buttons: ['OK']
    });
    alert.present();

    console.log(event)
  }

  hourSegmentClicked(event): void {
    console.log('hour', event)
    let newEvent: CalendarEvent = {
      start:addHours(this.date, 1),
      end: addHours(this.date, 1),
      title: 'TEST EVENT',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      status:0
    }

    this.events.push(newEvent);
    this.refresh.next();
  }

   eventTimesChanged({event, newStart, newEnd} : CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;
 
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
 
    setTimeout(() => {
      this.isDragging = false;
    },1000);
  }


  time() {
    console.log('timeClcked')
  }

  ionViewWillEnter() {
    this.events = (this.ev.getEv()) ;
    console.log(this.events) ; 
    this.refresh.next() ;
  }

  book() {
    this.navCtrl.push(BookAppointmentPage , {date: this.date}) ;
  }

}
