import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {InscriptionsPage} from '../pages/inscriptions/inscriptions';
import {FavoritesPage} from '../pages/favorites/favorites';
import {NotificationsPage} from '../pages/notifications/notifications';
import {EventDetailPage} from '../pages/event-detail/event-detail';
import {UserDetailPage} from '../pages/user-detail/user-detail';
import {ConfigNotificationsPage} from '../pages/config-notifications/config-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Services
import {EventService} from '../services/event.service';
import {NotificationService} from '../services/notification.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
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
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
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
    NotificationService
  ]
})
export class AppModule {}
