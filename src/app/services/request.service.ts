import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(public http: HttpClient) {}
  getData<Type>(url:string){
    return this.http.get<Type>(url)
  }
}
