import { EvProvider } from './../../providers/ev/ev';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { CalendarEvent } from 'calendar-utils';
import { addHours, startOfDay } from 'date-fns';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


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

  menu: string = 'upcoming';
  upcoming: CalendarEvent[] = [] ;
  pending: CalendarEvent[] = [] ;

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
      status: false
    },
    {
      id: 2 ,
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
      status: true
    }
  ];
  groceries: string[];

  constructor(public e: Events ,public navCtrl: NavController, public navParams: NavParams,private alrtCtrl: AlertController , private toastCtrl: ToastController) {
      this.pending = this.events.filter( event => event.status === false ) ;
      this.upcoming = this.events.filter( event => event.status === true ) ;


      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }
  
  ionViewWillEnter(){
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

            if(this.menu === 'upcoming'){
              this.upcoming = this.upcoming.filter( event => event.id !== id) ;
              this.events = this.events.filter( event => event.id !== id) ;
            this.presentToast()
            }else{
              this.pending = this.pending.filter( event => event.id !== id) ;
              this.events = this.events.filter( event => event.id !== id) ;
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
    
    console.log('dfghjkl')
    this.navCtrl.push(HomePage , {events: this.events}).then(()=>{
      this.e.publish('event' , 'this.events') ;
    })
  }



}
