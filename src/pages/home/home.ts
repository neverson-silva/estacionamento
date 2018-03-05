import { Component } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { AddProdutoPage } from '../add-produto/add-produto';
import { EditProdutoPage } from '../edit-produto/edit-produto';

import { ProdutoProvider, Produto } from '../../providers/produto/produto'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  produtos:any[] = [];
  searchText: string = null;
  dataBusca: string = new Date().toISOString();

  model: Produto;

  constructor(public navCtrl: NavController, 
                private produtoProvider: ProdutoProvider, private toast: ToastController) {
    this.model=new Produto();
  }

  ionViewDidEnter(){
    this.getAllProdutos();
  }

  getAllProdutos() {
    let dia = new Date(this.dataBusca).toLocaleDateString('zh-Hans-CN');
      this.produtoProvider.getAll(this.searchText, dia)
      .then(
        (resultado: any[]) => {
          this.produtos = resultado;
        }
      )
      .catch((e) => console.error(e))
  }

  filtraProdutos(ev: any) {
    this.getAllProdutos();
  }

  buscaEntrada(ev: any) {
    this.getAllProdutos();
  }

  addProduto() {
    this.navCtrl.push(AddProdutoPage);
  }

  editProduto() {
    this.navCtrl.push(EditProdutoPage);
  }

  deleteProduto(id: number) {
    this.produtoProvider.delete(id)
    .then(() => {
      this.toast.create(
        {
          message: 'Produto Excluído',
          duration: 3000,
          position: 'botton'
        }
      ).present();
      this.getAllProdutos();
    })
    .catch((e) => {
      this.toast.create(
      {
        message:'Erro ao incluir produto ' + e,
        duration: 3000,
        position:'botton'
       }
      ).present();
    })
  }

}
