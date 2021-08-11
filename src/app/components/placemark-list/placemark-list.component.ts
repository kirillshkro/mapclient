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
  private sub?: Subscription;

  constructor(private service: PlacemarkService) {
    this.placemarks = [];
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.list();
  }

  private readonly URL_FETCH = "http://localhost:8000/placemarks/";

  addPlacemark(event: YaEvent) {
    const lastIndex = this.placemarks.length;
    const id = this.placemarks[lastIndex - 1].id + 1;
    console.log("last id = ", this.placemarks[this.placemarks.length - 1].id);
    console.log("id = ", id);
    const coords = event.event.get('coords');
    let latitude: number = coords[0].toPrecision(6);
    let longitude: number = coords[1].toPrecision(6);
    let title = this.URL_FETCH + id.toString();
    const mPlacemark = new PlacemarkModel(title, latitude, longitude);
    this.service.create(JSON.stringify(mPlacemark)).subscribe(() => {
      this.list();
      return this.placemarks;
    });
  }

  removePlacemark(event: YaEvent) {
    const placemark = event.target as ymaps.Placemark;
    const title = placemark.properties.get('iconContent') as unknown as string;
    const findPlacemark = this.service.findByTitle(title);
    findPlacemark.subscribe(
      item => {
        this.service.remove(item[0].id).subscribe(
          () => {
            this.list();
            return this.placemarks;
          },
          error => console.error(error));
      }
    );
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
        console.error(error);
      }
    )
  }

  showPlacemark(event: YaEvent) {
    const placemark = event.target as ymaps.Placemark;
    const title = placemark.properties.get('iconContent') as unknown as string;
    console.log(title);
    const htmlCode = `<a href="${title}">${title}</a>`;
    const findPlacemark = this.service.findByTitle(title);
    findPlacemark.subscribe(
      () => {
        placemark.options.set('balloonCloseButton', 'false');
        placemark.properties.set('balloonContent', htmlCode);
      }
    );
  }
}
