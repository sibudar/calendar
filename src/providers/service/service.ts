import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }

  login(name,pass) {
   return  this.http.post(`http://localhost:9001/login?email=${name}&password=${pass}`, {}) ;
  }

  getApp(id) {
    return  this.http.get('http://localhost:9001/?id=' + id) ;
  }

  approve(uid , aid) {
    return  this.http.get(`http://localhost:9001/update?uid=${uid}&aid=${aid}` ) ;
  }
 
}
