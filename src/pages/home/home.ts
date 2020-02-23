import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { AlturaAuthService } from '../../services/alturaAuth/altura.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class homePage {

  conection: string = "login";
  authorized: Subscription;
  altura_token: string;

  constructor(public navCtrl: NavController,
  			  private storage: Storage,
          public authAltura: AlturaAuthService) {}

  ngOnInit() {
    this.authorized = this.authAltura.navItem$
    .subscribe((val) => {
      if (val) {
        this.altura_token = val;
      }
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.authorized.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('Hello Home Page');
  }

}