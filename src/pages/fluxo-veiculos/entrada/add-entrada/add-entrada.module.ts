import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEntradaPage } from './add-entrada';

@NgModule({
  declarations: [
    AddEntradaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEntradaPage),
  ],
})
export class AddEntradaPageModule {}
