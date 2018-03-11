import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database' 

@Injectable()
export class ProdutoProvider {

  constructor(private dbProvider : DatabaseProvider) {
    console.log('Hello ProdutoProvider Provider');
  }

  public insert(veic: Veiculo) {
      return this.dbProvider.getDB()
      .then(
          (db: SQLiteObject) => {
            let sql = 'INSERT INTO entradaVeiculos(placa, dataEntrada, horaEntrada) VALUES (?,?,?)';
            let dados = [veic.placa, veic.dataEntrada, veic.horaEntrada];
            return db.executeSql(sql, dados)
                      .catch((e) => console.error(e));      
          }
      )
      .catch((e) => console.error(e));      
  }

  public update(produto: Produto) {
    return this.dbProvider.getDB()
    .then(
        (db: SQLiteObject) => {
          let sql = 'UPDATE produtos set nome=?, tipo=?, valor=? where id=?';
          let dados = [produto.nome, produto.tipo, produto.valor, produto.id];
          return db.executeSql(sql, dados)
                    .catch((e) => console.error(e));      
        }
    )
    .catch((e) => console.error(e));      
  }

  public delete(id: number) {
    return this.dbProvider.getDB()
    .then(
        (db: SQLiteObject) => {
          let sql = 'DELETE from produtos where id=?';
          let dados = [id];
          return db.executeSql(sql, dados)
                    .catch((e) => console.error(e));      
        }
    )
    .catch((e) => console.error(e));      
  }

  public getAll(texto: string = null, dataEntrada: string){
    return this.dbProvider.getDB()
    .then( 
      (db : SQLiteObject) =>{
        let sql = 'SELECT p.* FROM entradaVeiculos p';
        var dados: any[]=[];

        if (texto) {
          sql += ' WHERE p.placa like ? and dataEntrada like ? Order By p.horaEntrada DESC';
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
}

export class Veiculo {
  id: number;
  placa: string;
  dataEntrada: string;
  horaEntrada: string;
  dataSaida: string;
  horaSaida: string;
  valor: number;
}

export class Produto {
  id: number;
  nome: string;
  tipo: string;
  valor: number;
}
