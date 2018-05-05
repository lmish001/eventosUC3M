import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisEventosPage } from './mis-eventos';

@NgModule({
  declarations: [
    MisEventosPage,
  ],
  imports: [
    IonicPageModule.forChild(MisEventosPage),
  ],
})
export class MisEventosPageModule {}
