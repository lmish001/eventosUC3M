import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Pages
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { InscriptionsPage } from '../pages/inscriptions/inscriptions';
import { FavoritesPage } from '../pages/favorites/favorites';
import { NotificationsPage } from '../pages/notifications/notifications';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { UserDetailPage } from '../pages/user-detail/user-detail';
import { ConfigNotificationsPage } from '../pages/config-notifications/config-notifications';

//Services
import { EventService } from '../services/event.service';
import { NotificationService } from '../services/notification.service';
import { AuthenticationService } from '../services/authentication.service';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InscriptionsPage,
    FavoritesPage,
    NotificationsPage,
    EventDetailPage,
    UserDetailPage,
    ConfigNotificationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuth
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    InscriptionsPage,
    FavoritesPage,
    NotificationsPage,
    EventDetailPage,
    UserDetailPage,
    ConfigNotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    NotificationService,
    AuthenticationService
  ]
})
export class AppModule {}
