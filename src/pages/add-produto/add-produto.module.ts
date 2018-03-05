import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProdutoPage } from './add-produto';

@NgModule({
  declarations: [
    AddProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProdutoPage),
  ],
})
export class AddProdutoPageModule {}
