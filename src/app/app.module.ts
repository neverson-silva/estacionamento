import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AddEntradaPage } from '../pages/fluxo-veiculos/entrada/add-entrada/add-entrada';
import { EditProdutoPage } from '../pages/fluxo-veiculos/entrada/edit-produto/edit-produto';
import { DatabaseProvider } from '../providers/database/database';
import { ProdutoProvider } from '../providers/produto/produto';
import { EntradaProvider } from '../providers/fluxo-veiculos/entrada/entrada';
import { SaidaProvider } from '../providers/fluxo-veiculos/saida/saida';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEntradaPage,
    EditProdutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddEntradaPage,
    EditProdutoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DatabaseProvider,
    ProdutoProvider,
    EntradaProvider,
    SaidaProvider,
    Camera
  ]
})
export class AppModule {}
