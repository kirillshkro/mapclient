import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PlacemarkService} from "./service/placemark.service";

import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { PlacemarkListComponent } from './components/placemark-list/placemark-list.component';
import {AngularYandexMapsModule, YA_CONFIG, YaConfig} from "angular8-yandex-maps";

registerLocaleData(localeRu, 'ru', localeRuExtra);

@NgModule({
  declarations: [
    AppComponent,
    PlacemarkListComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularYandexMapsModule
    ],
  providers: [
    PlacemarkService,
    {
      provide: YA_CONFIG,
      useValue: {
        apiKey: '21368508-3ff1-46d9-baa6-9326a78777eb',
        lang: 'ru_RU'
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
