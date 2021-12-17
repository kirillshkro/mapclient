import { Component, OnInit } from '@angular/core';
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {Observable, of} from "rxjs";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  private placemarks$: Observable<PlacemarkPhotoModel[]>;
  currentPlacemark: PlacemarkPhotoModel = {
    height_photo: 0, id: undefined, latitude: 0, longitude: 0, title: "", width_photo: 0

  };

  constructor(private service: PlacemarkPhotoService,
              private router: Router,
              private route: ActivatedRoute) {
    this.placemarks$ = route.snapshot.params['placemarks'];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id).subscribe(((placemark) => {
      this.currentPlacemark = placemark;
      console.log(this.currentPlacemark);
    })
    );
  }


  deletePlacemark() {
    this.service.remove(this.currentPlacemark.id).subscribe(
      () => {
        console.log("id = ", this.currentPlacemark.id)
      },
      error => {
        console.log(error)
      },
      () => {
        this.service.getAll().pipe(() => this.placemarks$ = this.service.getAll());
        this.router.navigate(['photos']).then(resp => resp);
      }
    );
  }

}
