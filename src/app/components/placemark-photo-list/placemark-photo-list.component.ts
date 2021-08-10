import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";
import {Subscription} from "rxjs";
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {YaEvent} from "angular8-yandex-maps";
import {v4} from "uuid";

@Component({
  selector: 'app-placemark-photo-list',
  templateUrl: './placemark-photo-list.component.html',
  styleUrls: ['./placemark-photo-list.component.css']
})
export class PlacemarkPhotoListComponent implements OnInit, OnDestroy {

  placemarks: PlacemarkPhotoModel[];
  sub?: Subscription;

  constructor(private service: PlacemarkPhotoService) {
    this.placemarks = [];
  }

  ngOnInit(): void {
    this.sub = this.service.getAll().subscribe(placemarks => this.placemarks = placemarks);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getPlacemarks() {
    return this.placemarks;
  }

  addPlacemark(event: YaEvent) {
    const coords = event.event.get('coords');
    const latitude = coords[0];
    const longitude = coords[1];
    const title = v4().toString();
    const mPlacemark = new PlacemarkPhotoModel(title, latitude, longitude);
    this.service.create(JSON.stringify(mPlacemark));
  }
}
