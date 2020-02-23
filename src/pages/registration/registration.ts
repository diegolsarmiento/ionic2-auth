import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { homePage } from '../home/home';
import { welcomePage } from '../welcome/welcome';
import { loginPage } from '../login/login';
import { recoverPage } from '../recover/recover';
//Authentication/HTTP
import { AlturaAuthService } from '../../services/alturaAuth/altura.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})

export class registrationPage {

   credentials = {
    username: '',
    password: '',
    password1: '',
    password2: ''
  };

  conection: string = "registration";
  authorized: Subscription;

  //autorized: boolean;
  //conection: string = "registration";

  constructor(public navCtrl: NavController,
              public authAltura: AlturaAuthService) {}

  ngOnInit() {
    this.authorized = this.authAltura.navItem$
    .subscribe((val) => {
      if (val) {
        this.goToHome();
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.authorized.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello Registration Page');
  }

  public goToHome(){
    this.navCtrl.push(homePage);
  }

  public goToWelcome(){
	this.navCtrl.push(welcomePage);
  }

  public goToLogin(){
	this.navCtrl.push(loginPage);
  }

  public goToRecover(){
	this.navCtrl.push(recoverPage);
  }

}
