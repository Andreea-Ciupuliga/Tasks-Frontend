import {Component, OnInit} from '@angular/core';
import {GetTaskDto} from "../../DTOs/TaskDTO/get-task-dto";
import {TaskService} from "../../Services/TaskService/task.service";
import {UserService} from "../../Services/UserService/user.service";
import {GetUserDto} from "../../DTOs/UserDTO/get-user-dto";
import {Status} from "../../Models/status";
import {MatDialog} from "@angular/material/dialog";
import {UpdateTaskComponent} from "../../Components/update-task/update-task.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @ts-ignore
  selectedUser: GetUserDto;
  public oldTask: any;
  public dataSourceTasks = new MatTableDataSource<GetTaskDto>();

  // @ts-ignore
  selectedStatus: string;

  public text: string = "";
  public tasks: GetTaskDto[] = [];
  public users: GetUserDto[] = [];
  displayedColumns: string[] = ['dueDate', 'subject', 'status', 'assigned', 'actions'];
  // @ts-ignore
  selected: Date;

  constructor(private readonly taskService: TaskService, public dialog: MatDialog, private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllTasksByText(text: string) {
    this.taskService.getAllTasksByText(text).subscribe((data: GetTaskDto[]) => {
      this.tasks = data;
      this.dataSourceTasks.data = this.tasks;
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: GetUserDto[]) => {
      this.users = data;
    });
  }

  getAllTasksByUserUsername(username: string) {
    this.taskService.getAllTasksByUserUsername(username).subscribe((data: GetTaskDto[]) => {
      this.tasks = data;
      this.dataSourceTasks.data = this.tasks;
    });
  }

  getAllTasksByStatus(status: string) {
    this.taskService.getAllTasksByStatus(status).subscribe((data: GetTaskDto[]) => {
      this.tasks = data;
      this.dataSourceTasks.data = this.tasks;
    });
  }

  getAllTasksAfterDate(date: Date) {
    this.taskService.getAllTasksAfterDate(date).subscribe((data: GetTaskDto[]) => {
      this.tasks = data;
      this.dataSourceTasks.data = this.tasks;
    });
  }

  openDialogUpdateTask(id: number) {
    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: {
        taskId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.taskService.getTaskById(id).subscribe((data: GetTaskDto) => {
        const task = this.tasks.find(task => task.id == id)

        if (task) {
          this.oldTask = task;
          var index = this.tasks.indexOf(this.oldTask)
          this.tasks[index] = data;
          this.dataSourceTasks.data = this.tasks;
        }
      });
    });

  }
}
