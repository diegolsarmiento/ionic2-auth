import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
//Pages
import { indexPage } from '../pages/index/index';
import { welcomePage } from '../pages/welcome/welcome';
import { loginPage } from '../pages/login/login';
import { recoverPage } from '../pages/recover/recover';
import { registrationPage } from '../pages/registration/registration';
import { homePage } from '../pages/home/home';
//Auth Service
import { AlturaAuthService } from '../services/alturaAuth/altura.service';
import { AlturaPassword } from '../services/alturaAuth/altura.password';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make indexPage the root (or first) page
  rootPage: any = indexPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private authAltura: AlturaAuthService,
    private authPassword: AlturaPassword
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Index', component: indexPage },
      { title: 'Bienvenid@', component: welcomePage },
      { title: 'Ingreso', component: loginPage },
      { title: 'Registro', component: registrationPage },
      { title: 'Recuperar', component: recoverPage },
      { title: 'Home', component: homePage }
    ];
  }

  initializeApp() {
      this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}