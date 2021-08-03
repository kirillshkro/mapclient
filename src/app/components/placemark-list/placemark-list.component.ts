import {Component, OnInit} from '@angular/core';
import {PlacemarkService} from "../../service/placemark.service";
import {PlacemarkModel} from "../../models/placemark.model";
import {YaEvent} from "angular8-yandex-maps";

@Component({
  selector: 'app-placemark-list',
  templateUrl: './placemark-list.component.html',
  styleUrls: ['./placemark-list.component.css']
})
export class PlacemarkListComponent implements OnInit {
  placemarks: PlacemarkModel[];
  private index: number;
  constructor(private service: PlacemarkService) {
    this.placemarks = [];
    this.index = 0;
  }

  ngOnInit(): void {
    this.list();
  }

  private readonly URL_FETCH = "http://localhost:8000/placemarks/";

  async addPlacemark(event: YaEvent) {
    const coords = event.event.get('coords');
    let latitude: number = coords[0].toPrecision(6);
    let longitude: number = coords[1].toPrecision(6);
    let title = this.URL_FETCH + this.index.toString();
    const mPlacemark = new PlacemarkModel(title, latitude, longitude);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const response = await fetch(this.URL_FETCH, {
      method: "POST",
      headers: header,
      body: JSON.stringify(mPlacemark),
      cache: "no-cache"
    });
    let parsed = response.json();
    console.log(parsed);
    this.index++;
  }

  removePlacemark(event: YaEvent) {
    let placemark = event.target as ymaps.Placemark;
    let title = placemark.properties.get('iconContent') as unknown as string;
    this.service.findByTitle(title).subscribe(() =>
    fetch(title,
      {
        method: 'DELETE',
        cache: "no-cache"
      }).
    then(resp => resp.json())
    );
    console.log('placemark = ', placemark);
  }

  getPlacemarks() {
    console.log(this.placemarks);
    return this.placemarks;
  }

  list(): void {
    this.service.getAll().
    subscribe(
      data => {
        this.placemarks = data;
        this.index = this.placemarks.length + 1;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
