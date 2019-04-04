
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { CalendarEvent } from 'calendar-utils';

/*
  Generated class for the EvProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvProvider {
  ev: CalendarEvent[] = [];
  user: any ;

  constructor(public events:Events) {
    console.log('Hello EvProvider Provider');
  }

  setEv(events){
    this.events.publish("events" , events);
  this.ev = events ;
  }

  getEv(){
    return this.ev ;
  }

  setUser(user) {
    this.events.publish('user' , user) ;
    this.user = user
  }


  getUser() {
    return this.user ;
  }
  pushEvent(event){
    this.ev.push(event) ;
    this.events.publish("events" , this.ev);
  }

}
