import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly serverUrl = environment.serverUrl;

  constructor(private readonly httpClient: HttpClient) {
  }
  get<T>(path: string, params = {}): Observable<any> {
    return this.httpClient.get<T>(`${this.serverUrl}${path}`, {params})
  }
  put<T>(path: string, body = {}): Observable<any> {
    return this.httpClient.put<T>(`${this.serverUrl}${path}`, body)
  }
  post<T>(path: string, body = {},params = {}): Observable<any> {
    return this.httpClient.post<T>(`${this.serverUrl}${path}`, body,{params})
  }
  delete<T>(path: string): Observable<any> {
    return this.httpClient.delete<T>(`${this.serverUrl}${path}`)
  }
}
