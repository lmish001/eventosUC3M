import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {User} from '../models/user.model';
import {USER} from '../mock-user';

//Pages
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import {InscriptionsPage} from '../pages/inscriptions/inscriptions';
import {FavoritesPage} from '../pages/favorites/favorites';
import {ConfigNotificationsPage} from '../pages/config-notifications/config-notifications';
//import {NotificationsPage} from '../pages/notifications/notifications';
//import {EventDetailPage} from '../pages/event-detail/event-detail';
import {UserDetailPage} from '../pages/user-detail/user-detail';
import { LoginPage } from '../pages/login/login';
import { AuthentificationService } from '../services/authentification.service';
import { Observable } from 'rxjs/Observable';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  user$: Observable <any[]>;
  pages: Array<{title: string, component: any}>;
  userConfig: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private auth: AuthentificationService) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Mis "Estoy interesado"', component: FavoritesPage },
      { title: 'Inscripciones', component: InscriptionsPage },
      { title: 'Config. notificaciones', component: ConfigNotificationsPage }

    ];

    this.userConfig = [
      { title: 'Mi cuenta', component: UserDetailPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getUser(): void{
    //this.user$ = this.auth.getCurrentUser();
  }
}
