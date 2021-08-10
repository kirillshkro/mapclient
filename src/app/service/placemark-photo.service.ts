import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlacemarkPhotoModel} from "../models/placemark-photo/placemark-photo.model";

@Injectable({
  providedIn: 'root'
})
export class PlacemarkPhotoService {
  private readonly URL = "http://localhost:8000/photos/";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<PlacemarkPhotoModel[]> {
    return this.http.get<PlacemarkPhotoModel[]>(`${this.URL}`);
  }

  create(data: any): Observable<PlacemarkPhotoModel> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<PlacemarkPhotoModel>(`${this.URL}`, data, {
      headers: headers
    });
  }

  update(data: any): Observable<PlacemarkPhotoModel> {
    return this.http.put<PlacemarkPhotoModel>(`${this.URL}`, data);
  }

  findByTitle(title: string): Observable<PlacemarkPhotoModel[]> {
    return this.http.get<PlacemarkPhotoModel[]>(`${this.URL}?title=${title}`);
  }

  remove(id: any): Observable<PlacemarkPhotoModel> {
    return this.http.delete<PlacemarkPhotoModel>(`${this.URL}${id}`);
  }
}
