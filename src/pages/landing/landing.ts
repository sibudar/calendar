import { ServiceProvider } from './../../providers/service/service';
import { Subject } from 'rxjs/Subject';

import { EvProvider } from './../../providers/ev/ev';
import { HomePage } from './../home/home';
import { Component, Type } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, Content } from 'ionic-angular';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  httpOptions = { headers: new HttpHeaders({ 'ContentType': 'application/json' }) };
  headers = new HttpHeaders({ 'Content-Type': 'application/x-www-from-ur-urlencoded' });
  httpOption = { headers: this.headers };


  menu: string = 'upcoming';
  upcoming: CalendarEvent[] = [];
  pending: CalendarEvent[] = [];

  events: CalendarEvent[] = [
    {
      id: 1,
      start: addHours(startOfDay(new Date()), 7),
      end: addHours(startOfDay(new Date()), 9),
      title: 'First Event',
      vanue: 'home',
      event: 'Home Talk',
      cssClass: 'custom-event',
      allDay: true,
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: false,
      status: 0
    },
    {
      id: 2,
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 12),
      title: 'Second Event',
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
      status: 1
    }
  ];
  groceries: string[];
  user: any;

  
  constructor(public service: ServiceProvider ,public datepipe: DatePipe ,public http: HttpClient, public e: Events, public ev: EvProvider, public navCtrl: NavController, public navParams: NavParams, private alrtCtrl: AlertController, private toastCtrl: ToastController) {
    this.pending = this.events.filter(event => event.status === 0);
    this.upcoming = this.events.filter(event => event.status === 1);

     this.user = (this.ev.getUser()) ;
   
    

    this.service.getApp(this.user.id).subscribe((res: any) => {
      
      let ev: CalendarEvent[] = [];
      ev = res ;

      
      ev.map( event => {
        event.color = {
          primary: '#488aff',
          secondary: '#bbd0f5'
        } ; 

        event.resizable = {
          beforeStart: true,
          afterEnd: true
        }


        event.draggable = false ;

        event.start =new Date( event.start ) ;
        event.end =new Date( event.end ) ;

        
       
        
      })
     
      this.events = ev ;

      
      console.log(this.events)
      this.pending = this.events.filter(event => event.status === 0);
      this.upcoming = this.events.filter(event => event.status === 1);
      this.ev.setEv(this.upcoming);
      console.log("pending" , this.pending)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  ionViewWillEnter() {
    console.log('am here')
  }

  showConfirm(event) {
    const confirm = this.alrtCtrl.create({
      title: event.title,
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Cancel Event',
          handler: () => {
            console.log('Disagree clicked');
            this.doubleComfirm(event.id);
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  doubleComfirm(id) {
    const confirm = this.alrtCtrl.create({

      message: 'Are you sure you want to cancel this appointment',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {

            if (this.menu === 'upcoming') {
              this.upcoming = this.upcoming.filter(event => event.id !== id);
              this.events = this.events.filter(event => event.id !== id);
              this.presentToast()
            } else {
              this.pending = this.pending.filter(event => event.id !== id);
              this.events = this.events.filter(event => event.id !== id);
              this.presentToast()
            }

          }
        }
      ]
    });
    confirm.present();
  }


  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Event deleted successfully',
      duration: 3000
    });
    toast.present();
  }


  openCalendar() {

   
    this.navCtrl.push(HomePage, { events: this.events }).then(() => {
      // this.e.publish('event' , 'this.events') ;
    })
  }


  dateToCal(date) {

    return this.datepipe.transform(date , 'EEEE MMMM d y h:mm:ss a zzzz')

  }


  showPending(event) {
    
    const confirm = this.alrtCtrl.create({
      title: event.title,
      message: event.description,
      buttons: [
        {
          text: 'Reject',
          handler: () => {
           
     
          }
        },
        {
          text: 'Accept',
          handler: () => {

            this.service.approve(this.user.id , event.id).subscribe( d => console.log(d)) ;

            event.status = 1 ; 
            this.upcoming.push(event) ; 
            this.ev.pushEvent(event)
            console.log(this.upcoming);
          }
        }
      ]
    });
    confirm.present();
  }


}
