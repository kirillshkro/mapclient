export class PlacemarkModel {
  id: any
  title: string
  latitude: number
  longitude: number

  constructor(title: string, latitude: number, longitude: number) {
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
