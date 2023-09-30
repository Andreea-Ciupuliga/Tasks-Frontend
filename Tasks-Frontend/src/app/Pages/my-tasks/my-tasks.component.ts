import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../Services/TaskService/task.service";
import {GetTaskDto} from "../../DTOs/TaskDTO/get-task-dto";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  displayedColumns: string[] = ['dueDate', 'subject', 'status'];

  private userUsername: string = "";
  public tasks: GetTaskDto[] = [];



  constructor(private readonly taskService: TaskService, private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.getAllTasksByUserUsername();
  }

  getAllTasksByUserUsername() {
    this.userUsername = this.keycloakService.getUsername();
    this.taskService.getAllTasksByUserUsername(this.userUsername).subscribe((data: GetTaskDto[]) => {
      this.tasks = data;

      console.log(this.tasks)
    });
  }

}
