import {Component, OnInit} from '@angular/core';
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {YaEvent} from "angular8-yandex-maps";
import {Router} from "@angular/router";

@Component({
  selector: 'app-placemark-photo-list',
  templateUrl: './placemark-photo-list.component.html',
  styleUrls: ['./placemark-photo-list.component.css']
})
export class PlacemarkPhotoListComponent implements OnInit {

  placemarks: PlacemarkPhotoModel[];

  constructor(private service: PlacemarkPhotoService, private router: Router) {
    this.placemarks = [];
  }

  ngOnInit(): void {
    this.list();
  }

  getPlacemarks() {
    console.log(this.placemarks);
    return this.placemarks;
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
    this.service.getAll().subscribe((placemarks) => this.placemarks = placemarks);
  }

  showPlacemark(event: YaEvent) {

  }
}
