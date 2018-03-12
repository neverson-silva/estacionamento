import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';
//import { ToastController } from 'ionic-angular';
/*
  Generated class for the EntradaVeiculosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaidaProvider {

  constructor(private dbProvider : DatabaseProvider) {
    console.log('Hello EntradaVeiculosProvider Provider');
  }

  /**
   * Registrar entrada de um novo veículo
   */
  public insert(veic: Veiculo) {
    return this.dbProvider.getDB()
      .then(
          (db: SQLiteObject) => {
            let sql = "INSERT INTO fluxoVeiculos(placa, dataEntrada) VALUES (?, datetime('now'))";
            let dados = [veic.placa];
            return db.executeSql(sql, dados)
                      // .then(() => {
                      //   let toast = this.toastCtrl.create({
                      //     message: 'Entrada registrada com sucesso.',
                      //     duration: 2000
                      //   });
                      //   toast.present();
                      // })
                      .catch((e) => console.error(e));
          }
      )
      .catch((e) => console.error(e));
  }

  // public update(veic: Veiculo) {
  //   return this.dbProvider.getDB()
  //   .then(
  //       (db: SQLiteObject) => {
  //         let sql = 'UPDATE produtos set nome=?, tipo=?, valor=? where id=?';
  //         let dados = [veic.nome, veic.tipo, veic.valor, veic.id];
  //         return db.executeSql(sql, dados)
  //                   .catch((e) => console.error(e));
  //       }
  //   )
  //   .catch((e) => console.error(e));
  // }

  /**
   * Recuperar todas as entradas registradas
   * @param texto
   * @param dataEntrada
   */
  public getAll(texto: string = null, dataEntrada: string){
    return this.dbProvider.getDB()
    .then(
      (db : SQLiteObject) =>{
        let sql = "SELECT id, placa, strftime('%d/%m/%Y', dataEntrada) as dataEntrada FROM fluxoVeiculos";
        var dados: any[]=[];

        if (texto) {
          sql += " WHERE placa like ? and dataEntrada like 	strftime('%d-%m-%Y', ?) Order By dataEntrada DESC";
          dados.push('%'+texto+'%');
          dados.push('%'+dataEntrada+'%');
        }

        return db.executeSql(sql,dados)
          .then(
            (dados :any) => {
              if (dados.rows.length > 0) {
                 let produtos : any[]=[];
                 for (var i=0; i < dados.rows.length; i++) {
                   var produto = dados.rows.item(i);
                   produtos.push(produto);
                 }
                 return produtos;
              } else {
                return [];
              }
            }
          )
          .catch((e) => console.error(e));
        }
    )
    .catch((e) => console.error(e));
  }

  public delete(id: number) {
    return this.dbProvider.getDB()
    .then(
        (db: SQLiteObject) => {
          let sql = 'DELETE from fluxoVeiculos where id=?';
          let dados = [id];
          return db.executeSql(sql, dados)
                    .catch((e) => console.error(e));
        }
    )
    .catch((e) => console.error(e));
  }

}
export class Veiculo {
  id: number;
  placa: string;
  dataEntrada: string;
  dataSaida: string;
  valor: number;
}
export class Entrada {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
}
