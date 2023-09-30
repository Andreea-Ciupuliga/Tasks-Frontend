import { Injectable } from '@angular/core';
import {ApiService} from "../Api/api.service";
import {User} from "../../Models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpoint = '/user';
  constructor(private apiService: ApiService) { }

  getAllUsers() {
    return this.apiService.get<User>(this.endpoint + '/getAllUser');
  }

  getUserByUsername(username: string) {
    return this.apiService.get<User>(this.endpoint + '/getUserByUsername/' + username);
  }
}
