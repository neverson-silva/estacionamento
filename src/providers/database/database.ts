import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  // Pegar o banco ou criar se nao existe
  public getDB() {
    return this.sqlite.create(
      {
        name: 'estacionamento.db',
        location: 'default'
      }
    );
  }

  // criar a estrutura do banco
  public createDatabase() {
      return this.getDB()
          .then(
            (db: SQLiteObject) => {
              // criar as tabelas
              this.createTables(db);
              // criar dados default para teste
              this.insereDadosDefault(db);
            }
          )
          .catch(e => console.log(e));
  }

  //criar as tabelas
  public createTables(db: SQLiteObject) {
      db.sqlBatch(
        [
          // [
          //  'CREATE TABLE IF NOT EXISTS produtos (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, tipo TEXT, valor REAL)'
          // ],
          [
            //'CREATE TABLE entradaVeiculos (id Integer primary key AUTOINCREMENT NOT NULL, placa text not NULL, dataEntrada text not null, horaEntrada text not null, dataSaida text, horaSaida text, valor real)'
            'CREATE TABLE fluxoVeiculos (id Integer primary key AUTOINCREMENT NOT NULL, placa text not NULL, dataEntrada text not null, dataSaida text, valor real)'
          ]
        ]
      ).then(
        () => console.log("Tabelas Criadas")
      ).catch(
        e => console.error ("Erro ao criar tabelas", e)
      )
  }

  public insereDadosDefault(db: SQLiteObject) {
   // db.executeSql('SELECT COUNT(id) as qtd from entradaVeiculos',{})
    db.executeSql('SELECT COUNT(id) as qtd from fluxoVeiculos',{})
      .then((data:any) => {
          if (data.rows.item(0).qtd == 0) {
              db.sqlBatch(
                // [
                //   ['INSERT INTO entradaVeiculos(placa, dataEntrada, horaEntrada, dataSaida, horaSaida, valor) VALUES (?,?,?,?,?,?)',['AXP-0021','2018/03/02','10:20:00', '2018/03/02', '11:20:00', '6,00']],
                //   ['INSERT INTO entradaVeiculos(placa, dataEntrada, horaEntrada, dataSaida, horaSaida, valor) VALUES (?,?,?,?,?,?)',['AHN-0076','2018/03/03','10:20:00', '2018/03/03', '11:20:00', '6,00']],
                //   ['INSERT INTO entradaVeiculos(placa, dataEntrada, horaEntrada, dataSaida, horaSaida, valor) VALUES (?,?,?,?,?,?)',['AIU-1100','2018/03/03','09:20:00', '2018/03/03', '10:20:00', '6,00']],
                //   ['INSERT INTO entradaVeiculos(placa, dataEntrada, horaEntrada, dataSaida, horaSaida, valor) VALUES (?,?,?,?,?,?)',['APT-5420','2018/03/03','07:20:00', '2018/03/03', '08:20:00', '6,00']],
                // ]
                [
                  ['INSERT INTO fluxoVeiculos(placa, dataEntrada, dataSaida, valor) VALUES (?,?,?,?)',['AXP-0021','2018-03-02 10:20:00', '2018-03-02 11:20:00', '6,00']],
                  ['INSERT INTO fluxoVeiculos(placa, dataEntrada, dataSaida, valor) VALUES (?,?,?,?)',['AHN-0076','2018-03-02 10:20:00', '2018-03-03 11:20:00', '6,00']],
                  ['INSERT INTO fluxoVeiculos(placa, dataEntrada, dataSaida, valor) VALUES (?,?,?,?)',['AIU-1100','2018-03-03 09:20:00', '2018-03-03 10:20:00', '6,00']],
                  ['INSERT INTO fluxoVeiculos(placa, dataEntrada, dataSaida, valor) VALUES (?,?,?,?)',['APT-5420','2018-03-03 07:20:00', '2018-03-03 08:20:00', '6,00']],
                ]
              ).then(
                () => console.log("Dados incluidos")
              ).catch(
                e => console.error ("Erro ao incluir dados", e)
              )
                }
      }
      ).catch(
        e => console.error ("Erro ao criar tabelas", e)
      )
}

}
