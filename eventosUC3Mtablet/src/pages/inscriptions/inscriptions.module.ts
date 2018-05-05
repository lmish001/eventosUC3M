import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscriptionsPage } from './inscriptions';

@NgModule({
  declarations: [
    InscriptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InscriptionsPage),
  ],
})
export class InscriptionsPageModule {}
