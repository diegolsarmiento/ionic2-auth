import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { homePage } from '../home/home';
import { welcomePage } from '../welcome/welcome';
import { recoverPage } from '../recover/recover';
import { registrationPage } from '../registration/registration';
//Authentication/HTTP
import { AlturaAuthService } from '../../services/alturaAuth/altura.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class loginPage {

  credentials = {
    username: '',
    password: '',
    password1: '',
    password2: ''
  };

 
  conection: string = "login";
  authorized: Subscription;

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
    console.log('Hello Login Page');
  }

  //href type function
  public goToHome(){
    this.navCtrl.push(homePage);
  }

  public goToWelcome(){
    this.navCtrl.push(welcomePage);
  }

  public goToRecover(){
    this.navCtrl.push(recoverPage);
  }

  public goToRegistration(){
    this.navCtrl.push(registrationPage);
  }

}