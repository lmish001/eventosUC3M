import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigNotificationsPage } from './config-notifications';

@NgModule({
  declarations: [
    ConfigNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigNotificationsPage),
  ],
})
export class ConfigNotificationsPageModule {}
