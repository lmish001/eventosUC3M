import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController, Events, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireStorage } from 'angularfire2/storage';
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
import { MisEventosPage } from '../pages/mis-eventos/mis-eventos';



@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  user$: Observable <any[]>;
  user: User;
  loggedInVal: boolean = false;
  userArray: User[];
  logoutError: string;
  pages: Array<{title: string, component: any}>;
  userConfig: Array<{title: string, component: any}>;
  private menu: MenuController;
  private platform;
  private app;

  constructor(platform: Platform, menu: MenuController, app: App, public statusBar: StatusBar, public splashScreen: SplashScreen, private authService: AuthentificationService, public events: Events) {
    this.menu = menu;
    this.platform = platform;
    this.app = app;
    this.initializeApp();

    events.subscribe('user:login', () => {
      this.loggedIn();
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Mis "Estoy interesado"', component: FavoritesPage },
      { title: 'Mis Inscripciones', component: InscriptionsPage },
      { title: 'Publicar evento', component: MisEventosPage },
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

    this.authService.auth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
          this.loggedIn();
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );
 
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  loggedIn(): void{
    this.menu.close();
    console.log("logged in");
    this.user$ = this.authService.getCurrentUser().snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
      /*
      Estas líneas retornan un array de  objetos con el id del registro y su contenido
      {
        "key":"value",
        contact.name,
        contact.organization,
       ...
      }
      */
      changes => {
      return changes.map(c=> ({
      key: c.payload.key, ...c.payload.val()
      }));
      }); ;
      this.user$.forEach(value=>this.currentUser(value));
  }

  currentUser(value:any) {
    for (let v of value) {
      if (!this.userArray) this.userArray = [v];
      else { this.userArray.push(v);}
     
    }
    this.user = this.userArray[0];
    this.loggedInVal = true;
  }

  logout() {
    this.menu.close();

    this.authService.logout();
    this.nav.setRoot(LoginPage);

  }
}
