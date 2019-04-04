import { EvProvider } from './../../providers/ev/ev';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { DatePipe } from '@angular/common'

/**
 * Generated class for the BookAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-appointment',
  templateUrl: 'book-appointment.html',
})
export class BookAppointmentPage {

  appoint: CalendarEvent ;
 
  day: string;
  startDate: string ;
  startTime: string ;
  endDate: string;
  endTime: string;
  title: string ;
  desc: string ; 
  vanue: string ;
  
  constructor(public datepipe: DatePipe ,public ev: EvProvider ,public navCtrl: NavController, public navParams: NavParams) {
    let selected: Date = new Date(this.navParams.get("date")) ; 
    this.startDate = this.datepipe.transform(selected, 'yyyy-MM-dd');
    this.endDate = this.datepipe.transform(selected, 'yyyy-MM-dd');

  
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookAppointmentPage');
  }



  goBack() {
    this.navCtrl.pop();
}

addEvent(){



 let fullStartDate = new Date(this.dateToCal(this.startDate + " " + this.startTime) );
 let fullEndDate = new Date(this.dateToCal(this.endDate + " " + this.endTime) );

  this.appoint =    {
    id: 3,
    start: addHours(startOfDay(fullStartDate), this.convertTime(this.startTime)),
    end:  addHours(startOfDay(fullEndDate), this.convertTime(this.endTime)) ,
    title: this.title,
    vanue: this.vanue,
    event: this.desc ,
    cssClass: 'custom-event',
    allDay: false,
    color: {
      primary: '#488aff',
      secondary: '#bbd0f5'
    },
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true,
    status: 0
  };
  this.ev.pushEvent(this.appoint);

}



  dateToCal(date) {

    return this.datepipe.transform(date , 'EEEE MMMM d y h:mm:ss a zzzz')

  }


  convertTime(time) {
    return parseInt(time.substring(0 , 2)) ; 
  }


}
