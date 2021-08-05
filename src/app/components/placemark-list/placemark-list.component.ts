import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacemarkService} from "../../service/placemark.service";
import {PlacemarkModel} from "../../models/placemark.model";
import {YaEvent} from "angular8-yandex-maps";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-placemark-list',
  templateUrl: './placemark-list.component.html',
  styleUrls: ['./placemark-list.component.css']
})
export class PlacemarkListComponent implements OnInit, OnDestroy {
  placemarks: PlacemarkModel[];
  private index: number;
  private sub?: Subscription;

  constructor(private service: PlacemarkService) {
    this.placemarks = [];
    this.index = 0;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.list();
  }

  private readonly URL_FETCH = "http://localhost:8000/placemarks/";

  addPlacemark(event: YaEvent) {
    let id = Math.round(Math.random() * 10000);
    const coords = event.event.get('coords');
    let latitude: number = coords[0].toPrecision(6);
    let longitude: number = coords[1].toPrecision(6);
    let title = this.URL_FETCH + id.toString();
    const mPlacemark = new PlacemarkModel(title, latitude, longitude);
    this.service.create(mPlacemark).subscribe(() => {
      this.list();
      console.log(this.placemarks);
      return this.placemarks;
    });
    this.index++;
  }

  removePlacemark(event: YaEvent) {
    const placemark = event.target as ymaps.Placemark;
    const title = placemark.properties.get('iconContent') as unknown as string;
    const findPlacemark = this.service.findByTitle(title);
    findPlacemark.subscribe(
      item => open(this.URL_FETCH + item[0].id)
    );
    /*findPlacemark.subscribe(item => this.service.remove(item[0].id).
    subscribe(() => {
      this.list();
      console.log(this.placemarks);
      return this.placemarks;
    }
    ));*/
  }

  getPlacemarks() {
    return this.placemarks;
  }

  list(): void {
    this.sub = this.service.getAll().subscribe(
      data => {
        this.placemarks = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
