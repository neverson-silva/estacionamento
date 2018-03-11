import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, LoadingController, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AddEntradaPage } from './../fluxo-veiculos/entrada/add-entrada/add-entrada';
import { EntradaProvider, Veiculo} from '../../providers/entrada/entrada';

//import { EditProdutoPage } from './../fluxo-veiculos/entrada/edit-produto/edit-produto';

//import { ProdutoProvider, Produto } from '../../providers/produto/produto'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  entradas: any;
  veiculos: Veiculo[];// = [];

  itemsInfiniteScroll: any[];

  pagina: number;
  porPagina: number = 10;
  totalEntradas: number = 0;
  totalPagina: number;
  verToolbar:boolean = false;
  header: any;

  searchText: string = null;
  dataBusca: string = new Date().toISOString();

  @ViewChild(Content) content: Content;



  constructor(public navCtrl: NavController,
              private entradaProvider: EntradaProvider, private toast: ToastController,
              private alerta: AlertController, private load: LoadingController) {
                this.header = {
                  title: true,
                  menu: true,
                  busca: false
                };
                //this.inicializaItemsBusca();

  }

  ionViewDidEnter(){
    this.veiculos = [];
    this.entradas = [];
    this.itemsInfiniteScroll = [];
    this.pagina = 1;
    this.getAllEntradas();
  }

  showToolbar(){
    this.header.title = !this.header.title;
    this.header.menu = !this.header.menu;
    this.header.busca = !this.header.busca;
  }

 getAllEntradas(){
    let load = this.load.create({
      content: 'Carregando...',
      spinner: 'bubbles'
    });
    load.present();

      this.entradaProvider.getAll()
      .then((resultados: any) => {
        this.entradas = resultados;
        this.porPagina = 10;
        // this.totalEntradas = this.entradas.length;
        this.totalPagina = this.porPagina;
        //Buscando registros somente da data atual
        this.buscaEntradas();

        load.dismiss();
      })
      .catch((error) => {
        load.dismiss();
        this.toast.create({
          message: 'Erro ao listar contas ' + error.error,
          position: 'bottom',
          duration: 2500
        });
      })

  }

  /**
   * Filtra resultados digitado na searchbar
   * @param event 
   */
  filtraEntradas(event: any) {

    let  resultadoBusca: any[];
    let valor = event.target.value; 
    if (valor && valor.trim() != '') {      
      resultadoBusca = this.resultadoBusca(valor);
      console.log(resultadoBusca);
      if(resultadoBusca.length == 0 || resultadoBusca == null){
        this.buscaEntradas();
        resultadoBusca = this.resultadoBusca(valor);
      }
      this.veiculos = [];
      this.veiculos = resultadoBusca;    
    } else {
      this.buscaEntradas();
    }    
  }

  /**
   * Fitra os registro de entradas pela data
   * 
   * @param ev 
   */
  buscaEntradas(ev: any = null) {
    this.itemsInfiniteScroll = [];
    this.veiculos = [];
    let dia = this.dataBusca.substr(0,10);  
    for(var i = 0; i < this.entradas.length ; i++){ 
      let diaEntrada = new Date(this.entradas[i].entrada).toISOString().substr(0,10);   
      if(dia == diaEntrada){
        let entrada: any = {          
          id: this.entradas[i].id,
          placa: this.entradas[i].placa,
          entrada: new Date(this.entradas[i].entrada),
          saida: new Date(this.entradas[i].saida),
          valor: this.entradas[i].valor
        }
        this.itemsInfiniteScroll.push(entrada);
      }         
    }
    //Paginando os items encontrados
      for(let it = 0; it < this.porPagina; it++){
        if(this.itemsInfiniteScroll[it] != undefined){
          let veiculo = this.itemsInfiniteScroll[it];
          this.veiculos.push(veiculo);
        }       
    }
    this.totalEntradas = this.itemsInfiniteScroll.length;
  
  }

  /**
   * Mostra mais resultados ao rolar a tela caso haja
   * @param infiniteScroll 
   */
  doInfinite(infiniteScroll){
    this.totalPagina = this.pagina * this.porPagina;
    setTimeout(() => {
      let result = this.itemsInfiniteScroll.slice(this.pagina * this.porPagina);
      for(let i = 1; i <= this.porPagina; i++){
        if (result[i] != undefined) {
          let veiculo = this.itemsInfiniteScroll[i];
          this.veiculos.push(veiculo);
        }
      }
      this.pagina += 1;
      infiniteScroll.complete();
    }, 500);
  }

  /**
   * Excluir registro da entrada
   * @param entrada 
   */
  deleteRegistro(entrada: any) {
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
            this.entradaProvider.delete(entrada.id)
              .then(() => {
                //Removendo o registro após ter excluído da base de dados
                let index = this.entradas.indexOf(entrada);
                this.entradas.splice(index, 1);
                this.buscaEntradas();
                this.toast.create(
                  {
                    message: 'Entrada Excluída',
                    duration: 3000,
                    position: 'botton'
                  }
                ).present();
              })
              .catch((e) => {
                this.toast.create(
                {
                  message:'Erro ao excluir dados entrada ' + e.erro,
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


  openPage(page: string){
    //Devido a provavelmente algum bug não é possui passar a classe da página como string diretamente
    let push: any;
    switch(page){
      case 'add-entrada':
        push = AddEntradaPage;
    }
    this.navCtrl.push(push);
  }

  // addProduto() {
  //   this.navCtrl.push(AddEntradaPage);
  // }

  // editProduto() {
  //   this.navCtrl.push(EditProdutoPage);
  // }
  resultadoBusca(search){
    let resultadoBusca: any[];
    if(this.veiculos.length < this.itemsInfiniteScroll.length){
      resultadoBusca = this.veiculos;
    } else {
      resultadoBusca = this.itemsInfiniteScroll ;
    } 

    resultadoBusca = resultadoBusca.filter((item) => {
      return (item.placa.indexOf(search) > -1);
    })
    return resultadoBusca;
  }
}
