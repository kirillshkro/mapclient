import {Component, OnInit} from '@angular/core';
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {YaEvent} from "angular8-yandex-maps";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-placemark-photo-list',
  templateUrl: './placemark-photo-list.component.html',
  styleUrls: ['./placemark-photo-list.component.css']
})
export class PlacemarkPhotoListComponent implements OnInit {

  placemarks: PlacemarkPhotoModel[];
  placemarks$ = this.service.getAll().pipe(tap(data => this.placemarks = data));
  currentPlacemark: PlacemarkPhotoModel = {
    id: undefined,
    title: '',
    latitude: 0.0,
    longitude: 0.0,
    image: undefined,
    width_photo: 0,
    height_photo: 0
  };

  constructor(private service: PlacemarkPhotoService, private router: Router) {
    this.placemarks = [];
  }

  ngOnInit(): void {
    this.list();
  }

  addPlacemark(event: YaEvent) {
    const coords = event.event.get('coords');
    const latitude = coords[0].toPrecision(6) as number;
    const longitude = coords[1].toPrecision(6) as number;
    this.router.navigate(['add'], {queryParams: {lat: latitude, long: longitude}}).then(result => {
      console.log(result);
    });
    return this.placemarks;
  }

  private list(): void {
    this.placemarks$ = this.service.getAll().pipe(tap((data) => this.placemarks = data));
  }

  showPlacemark(event: YaEvent) {
    const placemark = (event.target as ymaps.Placemark);
    const URL = "http://localhost:8000/placemarks/";
    placemark.options.set('balloonCloseButton', 'false');
    const title = placemark.properties.get('iconContent') as unknown as string;
    const findPlacemark = this.service.findByTitle(title);
    findPlacemark.subscribe(data => {
      this.currentPlacemark = data[0];
      placemark.options.set('balloonCloseButton', 'false');
      const hyperHtml = `<a href="${URL}${this.currentPlacemark.id}/">${title}</a>
        <br>Широта: ${this.currentPlacemark.latitude}<br/>
        Долгота: ${this.currentPlacemark.longitude}<br/><img src="${this.currentPlacemark.image}" alt="Картинка"/>`;
      placemark.properties.set('balloonContent', hyperHtml);
    });
  }


  deletePlacemark() {
    this.service.remove(this.currentPlacemark.id).subscribe(
      () => {
      },
      error => {
        console.log(error)
      },
      () => this.service.getAll().pipe(() => this.placemarks$ = this.service.getAll())
    );
  }
}
