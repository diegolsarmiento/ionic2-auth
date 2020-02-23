import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { welcomePage } from '../welcome/welcome';
import { loginPage } from '../login/login';
import { registrationPage } from '../registration/registration';
//Authentication/HTTP
import { AlturaPassword } from '../../services/alturaAuth/altura.password';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html'
})

export class recoverPage {

  credentials = {
    uid: '',
    token: '',
    new_password1: '',
    new_password2: '',
    email: ''
  };
 
  conection: string = "reset";
  authorized: Subscription;

  constructor(public navCtrl: NavController,
              public authPassword: AlturaPassword) {}


  ngOnInit() {
    this.authorized = this.authPassword.navItem$
    .subscribe((val) => {
      if (val) {
        this.goToLogin();
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.authorized.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello Recover Page');
  }

  public goToWelcome(){
	this.navCtrl.push(welcomePage);
  }

  public goToLogin(){
	this.navCtrl.push(loginPage);
  }

  public goToRegistration(){
	this.navCtrl.push(registrationPage);
  }

}
