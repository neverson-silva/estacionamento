/**
 * Ionic Core
 */
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

/**
 * Ionic Native
 */
import { Toast } from '@ionic-native/toast';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

/**
 * Paginas
 */
import { HomePage } from '../pages/home/home';
import { AddEntradaPage } from '../pages/fluxo-veiculos/entrada/add-entrada/add-entrada';
import { EditProdutoPage } from '../pages/fluxo-veiculos/entrada/edit-produto/edit-produto';

/**
 * Providers
 */
import { EntradaProvider } from '../providers/entrada/entrada';
import { SaidaProvider } from '../providers/saida/saida';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddEntradaPage,
    EditProdutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
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
    Toast,
    EntradaProvider,
    SaidaProvider,
    Camera
  ]
})
export class AppModule {}
