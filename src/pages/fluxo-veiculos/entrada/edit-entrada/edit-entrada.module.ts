import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEntradaPage } from './edit-entrada';

@NgModule({
  declarations: [
    EditEntradaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEntradaPage),
  ],
})
export class EditEntradaPageModule {}
