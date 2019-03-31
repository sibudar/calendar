
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the EvProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EvProvider {
  ev: any;

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

}
