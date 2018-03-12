import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';;

@Injectable()
export class EntradaProvider {
  private API_URL = 'https://polar-earth-95771.herokuapp.com/estacionados';

  constructor(private http: Http, private toast: ToastController) {}

  getAll(){
    return new Promise((resolve, reject) => {
      let url = this.API_URL + '.json';
      this.http.get(url)
        .subscribe((resultado: any) => {
          resolve(resultado.json());
        },
        (error) => {
          this.toast.create({
            message: "Por favor conecte-se a internet e tente novamente",
            position: 'bottom',
            duration: 2500
          }).present();
          reject(error.json());
        });
    });
  }
  insert(ev: any){
    let url = this.API_URL;
    return new Promise((resolve, reject) => {
      this.http.post(url, ev)
      .subscribe((resultado: any) => {
        resolve(resultado.json());
      }, 
      (error) => {
        reject(error.json());
      })
    })
  }
  delete(id: number){
    let url = this.API_URL + '/' + id;
    return new Promise((resolve, reject) => {
      this.http.delete(url)
        .subscribe((response: any) => {
          resolve(response);
        },
        (error) => {
          let erro: any = {
            erro: 'Não foi possível excluir este registro no momento.'
          }
          reject(erro);
        })
    })
  }
}
export class Veiculo {
    id: number;
    placa: string;
    entrada: string;
    saida: string;
    valor: number;
}
