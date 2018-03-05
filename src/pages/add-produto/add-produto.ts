import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ProdutoProvider, Veiculo } from '../../providers/produto/produto'
import { ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-add-produto',
  templateUrl: 'add-produto.html',
})
export class AddProdutoPage {
  model: Veiculo;

  data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              private produtoProvider: ProdutoProvider) {
      this.model=new Veiculo();
  }

  grava() {
    let dia = new Date(this.data).toLocaleDateString('zh-Hans-CN');
    this.model.dataEntrada = dia
    this.produtoProvider.insert(this.model)
        .then(() => {
          this.toast.create(
            {
              message:'Entrada Gravada',
              duration: 3000,
              position:'botton'
             }
            ).present();
            this.navCtrl.pop();
         }
        )
        .catch((e) => {
           this.toast.create(
           {
             message:'Erro ao gravar entrada',
             duration: 3000,
             position:'botton'
            }
           ).present();
        })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProdutoPage');
  }

}
