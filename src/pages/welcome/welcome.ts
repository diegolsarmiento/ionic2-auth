import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { registrationPage } from '../registration/registration';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})

export class welcomePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Welcome Page');
  }

  goToLogin(){
	this.navCtrl.push(loginPage);
  }

  goToRegistration(){
	this.navCtrl.push(registrationPage);
  }

}
