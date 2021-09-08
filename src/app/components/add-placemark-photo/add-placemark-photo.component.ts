import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlacemarkPhotoModel} from "../../models/placemark-photo/placemark-photo.model";
import {PlacemarkPhotoService} from "../../service/placemark-photo.service";

@Component({
  selector: 'app-add-placemark-photo',
  templateUrl: './add-placemark-photo.component.html',
  styleUrls: ['./add-placemark-photo.component.css']
})
export class AddPlacemarkPhotoComponent implements OnInit {

  placemark: PlacemarkPhotoModel = {
    id: 0,
    title: '',
    latitude: 0,
    longitude: 0,
    image: '',
    width_photo: 0,
    height_photo: 0
  };
  formData = new FormData();

  constructor(private service: PlacemarkPhotoService,
              private router: Router,
              private route: ActivatedRoute) {
    const latitude = this.route.snapshot.queryParamMap.get('lat')
    const longitude = this.route.snapshot.queryParamMap.get('long');
    this.placemark.longitude = longitude as unknown as number;
    this.placemark.latitude = latitude as unknown as number;
  }

  savePlace(): void {
    const data = {
      title: this.placemark.title,
      latitude: this.placemark.latitude,
      longitude: this.placemark.longitude,
      image: this.placemark.image,
      width_photo: this.placemark.width_photo,
      height_photo: this.placemark.height_photo
    };
    this.service.create(data).subscribe((response) => {
        console.log(response);
      },
      error => {
        console.error(error)
      });
    this.router.navigate(['photos']).then(result => result);
  }

  ngOnInit(): void {
  }

  loadFile(event: any) {
    let result: string = "";
    const reader = new FileReader();
    if (event.target.files.length) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formData.append('image', file, file.name);
        result = reader.result as string;
        this.placemark.image = result;
      }
      reader.onerror = () => {
        console.log(reader.error);
      }
    }
  }
}
