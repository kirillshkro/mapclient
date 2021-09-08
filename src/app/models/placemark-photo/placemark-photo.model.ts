import {PlacemarkModel} from "../placemark.model";

export class PlacemarkPhotoModel extends PlacemarkModel {
  image?: string;
  width_photo: number = 0;
  height_photo: number = 0;

  constructor(title: string, latitude: number, longitude: number, photoUri: string = "") {
    super(title, latitude, longitude);
    this.image = photoUri;
  }
}

