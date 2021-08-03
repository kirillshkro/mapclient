import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {PlacemarkModel} from "../models/placemark.model";
import {Observable} from "rxjs";

const URL = "http://localhost:8000/placemarks/";

@Injectable({
  providedIn: 'root'
})
export class PlacemarkService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<PlacemarkModel[]> {
    return this.httpClient.get<PlacemarkModel[]>(URL);
  }

  getById(id: any): Observable<PlacemarkModel> {
    return this.httpClient.get<PlacemarkModel>(`${URL}${id}`);
  }

  create(data: any): Observable<any> {
    return this.httpClient.post<PlacemarkModel>(URL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.httpClient.put<PlacemarkModel>(`${URL}/${id}`, data);
  }

  remove(id: any): Observable<PlacemarkModel> {
    return this.httpClient.delete<PlacemarkModel>(`${URL}/${id}`);
  }

  removeAll(): Observable<any> {
    return this.httpClient.delete(`${URL}`);
  }

  findByTitle(title: any) {
    return this.httpClient.get<PlacemarkModel>(`${URL}?title=${title}`);
  }

  getIdByTitle(title: any) {
    const res = this.findByTitle(title);
    res.subscribe(item => {
      return item.id;
    });
  }

}
