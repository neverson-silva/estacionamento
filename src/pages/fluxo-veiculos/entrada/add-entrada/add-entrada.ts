import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, 
         ActionSheetController, LoadingController } from 'ionic-angular';
import { EntradaProvider, Veiculo } from './../../../../providers/fluxo-veiculos/entrada/entrada';
import { Camera } from '@ionic-native/camera';


// import { ProdutoProvider, Veiculo } from '../../providers/produto/produto'
import { ThrowStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-add-entrada',
  templateUrl: 'add-entrada.html',
})
export class AddEntradaPage {
  model: Veiculo;
  srcImage: string;
  OCRAD: any;
  
  data: string = new Date().toISOString();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private entradaProvider: EntradaProvider,
              private camera: Camera) {
      this.model=new Veiculo();
  }
  grava() {
    //let dia = new Date(this.data).toLocaleDateString('zh-Hans-CN');
    //this.model.dataEntrada = dia
    this.entradaProvider.insert(this.model)
        .then(() => {
          this.toast.create(
            {
              message:'Entrada de veículo registrada',
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

  mostrarAcoes() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Escolher da Galeria',
          handler: () => {
            this.getPicture(0); // 0 == Galeria
          }
        },
        {
          text: 'Tirar Foto',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    // Verificar valores em :
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: 0,
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false, //Não salva a foto tirada na galeria
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERRO -> ${JSON.stringify(err)}`);
    });
  }

  /** 
   * Analisar conteúdo da foto utilizando a bibliotec ocrad.js disponível em :
   * https://github.com/antimatter15/ocrad.js/tree/master/ocrad-0.25
  */
  analisar() {
    let loader = this.loadingCtrl.create({
     content: 'Aguarde...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      this.model.placa = text;
      alert(this.model.placa);
      console.log(this.model.placa);
    });
  }

  /** 
   * Reinicar captura de foto
  */
  reiniciar() {
    this.srcImage = '';
    this.mostrarAcoes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProdutoPage');
  }
}

