export class PlacemarkModel {
  id?: any
  title?: string
  latitude?: number
  longitude?: number
  color: string = "#000";
  constructor(title: string, latitude: number, longitude: number, color: string) {
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
    this.color = color;
  }
}
