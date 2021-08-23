import {Component, OnInit} from '@angular/core';
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";

@Component({
  selector: 'app-placemark-photo-detail',
  templateUrl: './placemark-photo-detail.component.html',
  styleUrls: ['./placemark-photo-detail.component.css']
})
export class PlacemarkPhotoDetailComponent implements OnInit {

  constructor(private placemark: PlacemarkPhotoModel) {
  }

  ngOnInit(): void {
  }

  getPlacemark() {
    return this.placemark;
  }
}
