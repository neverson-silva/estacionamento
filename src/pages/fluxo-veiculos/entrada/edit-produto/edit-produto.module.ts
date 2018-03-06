import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProdutoPage } from './edit-produto';

@NgModule({
  declarations: [
    EditProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProdutoPage),
  ],
})
export class EditProdutoPageModule {}
