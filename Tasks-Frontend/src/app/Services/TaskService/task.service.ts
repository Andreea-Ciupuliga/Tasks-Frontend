import { Injectable } from '@angular/core';
import {ApiService} from "../Api/api.service";
import {Status} from "../../Models/status";
import {RegisterTaskDto} from "../../DTOs/TaskDTO/register-task-dto";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly endpoint = '/task';
  constructor(private apiService: ApiService) { }

  registerTask(taskRegisterDTO: RegisterTaskDto) {
    return this.apiService.post<Task>(this.endpoint + '/register' , taskRegisterDTO);
  }

  getAllTasksByUserUsername(username: string) {
    return this.apiService.get<Task>(this.endpoint + '/getAllTasksByUsername/' + username);
  }

  getAllTasksByText(text: string) {
    return this.apiService.get<Task>(this.endpoint + '/getAllTasksByText/' + text);
  }

  getAllTasksByStatus(status: string) {
    return this.apiService.get<Task>(this.endpoint + '/getAllTasksByStatus/' + status);
  }

  getAllTasksAfterDate(date: Date) {
    return this.apiService.get<Task>(this.endpoint + '/getAllTasksAfterDate/' + date);
  }
  getTaskById(id: number) {
    return this.apiService.get<Task>(this.endpoint + '/getTaskById/' + id);
  }

  updateTask(id: number, taskRegisterDTO: RegisterTaskDto) {
    return this.apiService.put<Task>(this.endpoint + '/' + id, taskRegisterDTO);
  }

}
