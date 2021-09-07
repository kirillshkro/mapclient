import {Component, OnInit} from '@angular/core';
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-placemark-photo-detail',
  templateUrl: './placemark-photo-detail.component.html',
  styleUrls: ['./placemark-photo-detail.component.css']
})
export class PlacemarkPhotoDetailComponent implements OnInit {

  placemarkDetail: PlacemarkPhotoModel = {
    id: "",
    title: "",
    latitude: 0.0,
    longitude: 0.0,
    image: ""
  };
  placemarks$: Observable<PlacemarkPhotoModel[]>;

  constructor(private service: PlacemarkPhotoService, private router: Router,
              private route: ActivatedRoute) {
    this.placemarks$ = new Observable<PlacemarkPhotoModel[]>();
    route.params.subscribe(params => {
      this.placemarkDetail.id = params[":id"];
    })
  }

  ngOnInit(): void {
    this.placemarks$ = this.service.getAll();
    this.getPlacemark(this.route.snapshot.params.id);
  }

  getPlacemark(id: string): PlacemarkPhotoModel {
    let result = this.service.getById(id);
    result.subscribe(placemark => this.placemarkDetail = placemark,
      error => {
        console.log(error);
      });
    return this.placemarkDetail;
  }

  deletePlacemark() {
    const tutorial$ = this.service.remove(this.placemarkDetail.id);
    tutorial$.subscribe(response => {
        this.router.navigate(['/photos']).then(result => result).catch(error => console.log(error));
      },
      error => {
        console.log(error);
      });
  }
}
