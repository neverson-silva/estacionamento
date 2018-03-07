import { Component } from '@angular/core';
import { NavController, Toast, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AddEntradaPage } from './../fluxo-veiculos/entrada/add-entrada/add-entrada';
import { EditEntradaPage } from '../fluxo-veiculos/entrada/edit-entrada/edit-entrada';
//import { ProdutoProvider, Produto } from '../../providers/produto/produto'
import { EntradaProvider, Entrada } from './../../providers/fluxo-veiculos/entrada/entrada';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entradas:any[] = [];
  searchText: string = null;
  dataBusca: string = new Date().toISOString();

  model: Entrada;

  constructor(public navCtrl: NavController, 
                private entradaProvider: EntradaProvider, private toast: ToastController,
                private alerta: AlertController) {
    this.model = new Entrada();
  }

  ionViewDidEnter(){
    this.getAllProdutos();
  }

  getAllProdutos() {
      let dia = new Date(this.dataBusca).toISOString().substring(0, 10);
      this.entradaProvider.getAll(dia, this.searchText)
      .then(
        (resultado: any[]) => {
          this.entradas = resultado;
          console.log(dia);
        }
      )
      .catch((e) => console.error(e))
  }

  filtraProdutos(ev: any) {
    this.getAllProdutos();
  }

  buscaEntradas(ev: any) {
    this.getAllProdutos();
  }

  addProduto() {
    this.navCtrl.push(AddEntradaPage);
  }

  editProduto() {
    this.navCtrl.push(EditEntradaPage);
  }

  deleteProduto(id: number) {
    this.alerta.create({
      title: 'Excluir Entrada?',
      message: 'Você tem certeza que deseja excluir o registro desta entrada?',
      buttons: [
        {
          text: 'Cancelar',
          handler:() =>{
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.entradaProvider.delete(id)
              .then(() => {
                this.toast.create(
                  {
                    message: 'Entrada Excluída',
                    duration: 3000,
                    position: 'botton'
                  }
                ).present();
                this.getAllProdutos();
              })
              .catch((e) => {
                this.toast.create(
                {
                  message:'Erro ao registrar entrada ' + e,
                  duration: 3000,
                  position:'botton'
                }
                ).present();
              })
          }
        }
      ]
    }).present();
    
  }

}
