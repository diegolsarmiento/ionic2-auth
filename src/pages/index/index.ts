import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { welcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-index',
  templateUrl: 'index.html'
})

export class indexPage {

  page: any = welcomePage;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Index Page');
  }

  goToWelcome(){
	this.navCtrl.push(welcomePage);
  }

}
