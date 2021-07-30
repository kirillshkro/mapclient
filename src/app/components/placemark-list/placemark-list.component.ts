import {Component, Injectable, Input, OnInit} from '@angular/core';
import {PlacemarkService} from "../../service/placemark.service";
import {PlacemarkModel} from "../../models/placemark.model";
import {YaEvent, YaReadyEvent} from "angular8-yandex-maps";
import {async, asyncScheduler} from "rxjs";

@Component({
  selector: 'app-placemark-list',
  templateUrl: './placemark-list.component.html',
  styleUrls: ['./placemark-list.component.css']
})
export class PlacemarkListComponent implements OnInit {
  map?: ymaps.Map;
  index = 0;
  private placemarks: PlacemarkModel[];
  constructor(private service: PlacemarkService) {
    this.placemarks = [];
  }

  ngOnInit(): void {
    this.list();
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>) {
    this.map = event.target;
  }

  addPlacemark(event: YaEvent) {
    const coords = event.event.get('coords');
    let latitude: number = coords[0].toPrecision(6);
    let longitude: number = coords[1].toPrecision(6);
    let colorCode = Math.round(Math.random()*0xFFF).toString(16);
    let color = colorCode.toString();
    let title = "Mark-" + this.index.toString();
    const mPlacemark = new PlacemarkModel(title, latitude, longitude, color);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    fetch("http://localhost:8000/placemarks/", {
      method: "POST",
      headers: header,
      body: JSON.stringify(mPlacemark),
      cache: "no-cache"
    }).then(r => r.json()).
    then((m_data) => {
    });
    this.index++;
  }

  removePlacemark(event: YaReadyEvent) {
    let placemark = event.target as ymaps.Placemark;
    let [latitude, longitude] = placemark.geometry?.getCoordinates() as number[];
    let title = placemark.properties.get('iconContent');

    console.log('placemark = ', placemark);
    this.map?.geoObjects.remove(event.target);
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
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
