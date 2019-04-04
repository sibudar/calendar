import { EvProvider } from './../../providers/ev/ev';
import { LandingPage } from './../landing/landing';
import { ServiceProvider } from './../../providers/service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string ;
  password: string ;
  constructor(public ev: EvProvider ,public service: ServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    
    this.service.login(this.email,this.password).subscribe( data => {
      console.log(data) ;
      this.ev.setUser(data[0])
      this.navCtrl.push(LandingPage) ;
    })
  }

  
}
