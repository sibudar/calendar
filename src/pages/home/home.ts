import { EvProvider } from './../../providers/ev/ev';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { DayViewPage } from '../day-view/day-view';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  viewDate: Date= new Date() ;
  view = "month" ;
  locale= "zu" ;
  isDragging = false ;
  dayClick = false ;

  refresh: Subject<any> = new Subject() ;

  events: CalendarEvent[] = [] ;
  

  constructor(private e: Events , public ev: EvProvider ,public navParams: NavParams ,public navCtrl: NavController , private alrtCtrl: AlertController ) {
      this.events = this.navParams.get("events");
      e.subscribe('events', (d)=>{
        console.log(d)
      })
      
  }

  handleEvent(event: CalendarEvent): void {
    let alert = this.alrtCtrl.create({
      title: event.title,
      message: event.start + ' to ' + event.end,
      buttons: ['OK']
    });
    alert.present();
  }

  hourSegmentClicked(event): void {
    // let newEvent: CalendarEvent = {
    //   start: event.date,
    //   end: addHours(event.date, 1),
    //   title: 'TEST EVENT',
    //   cssClass: 'custom-event',
    //   color: {
    //     primary: '#488aff',
    //     secondary: '#bbd0f5'
    //   },
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }

    // this.events.push(newEvent);
    // this.refresh.next();
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

  dayClicked(event) {

    
    this.navCtrl.push(DayViewPage, {day: event.date , event: this.events})
   

  }

  ionViewWillEnter() {
    this.events = (this.ev.getEv()) ;
    console.log(this.events) ; 
    this.refresh.next() ;
  }


}
