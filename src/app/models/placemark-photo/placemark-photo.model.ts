import {PlacemarkModel} from "../placemark.model";

export class PlacemarkPhotoModel extends PlacemarkModel {
  photoUri?: string;

  constructor(title: string, latitude: number, longitude: number, photoUri?: string) {
    super(title, latitude, longitude);
    this.photoUri = photoUri;
  }
}

