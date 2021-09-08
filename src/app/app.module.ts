import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import {AngularYandexMapsModule, YA_CONFIG} from "angular8-yandex-maps";
import {PlacemarkPhotoListComponent} from './components/placemark-photo-list/placemark-photo-list.component';
import {RouterModule, Routes} from "@angular/router";
import {AddPlacemarkPhotoComponent} from './components/add-placemark-photo/add-placemark-photo.component';
import {PlacemarkPhotoService} from "./service/placemark-photo.service";

const routes: Routes = [
  {path: '', redirectTo: 'photos', pathMatch: 'full'},
  {path: 'photos', component: PlacemarkPhotoListComponent},
  {path: 'add', component: AddPlacemarkPhotoComponent}
]

registerLocaleData(localeRu, 'ru', localeRuExtra);

@NgModule({
  declarations: [
    AppComponent,
    PlacemarkPhotoListComponent,
    AddPlacemarkPhotoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularYandexMapsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PlacemarkPhotoService,
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
