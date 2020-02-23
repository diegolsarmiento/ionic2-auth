import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { MyApp } from './app.component';
//Pages
import { indexPage } from '../pages/index/index';
import { welcomePage } from '../pages/welcome/welcome';
import { loginPage } from '../pages/login/login';
import { recoverPage } from '../pages/recover/recover';
import { registrationPage } from '../pages/registration/registration';
import { homePage } from '../pages/home/home';
//Authentication
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { AlturaAuthService } from '../services/alturaAuth/altura.service';
import { AlturaPassword } from '../services/alturaAuth/altura.password';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    indexPage,
    welcomePage,
    loginPage,
    recoverPage,
    registrationPage,
    homePage
  ],
  imports: [
    IonicModule.forRoot(MyApp), BrowserModule, FormsModule, CustomFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    indexPage,
    welcomePage,
    loginPage,
    recoverPage,
    registrationPage,
    homePage
  ],
  providers: [
    Storage,
    AlturaAuthService,
    AlturaPassword,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}