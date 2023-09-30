import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {GetUserDto} from "../../DTOs/UserDTO/get-user-dto";
import {GetTaskDto} from "../../DTOs/TaskDTO/get-task-dto";
import {UserService} from "../../Services/UserService/user.service";
import {TaskService} from "../../Services/TaskService/task.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  registrationForm = this.fb.group({

    dueDate: ['', Validators.required],
    subject: ['', Validators.required],
    status: ['', Validators.required],
    username: ['', Validators.required],
  })

  taskRegisterDto: any;

  selectedUser: string = "";
  selectedStatus: string = "";

  dueDate: any;
  subject: string = "";

  public users: GetUserDto[] = [];


  constructor(private readonly userService: UserService, private fb: FormBuilder, private readonly taskService: TaskService) {
  }

  ngOnInit(): void {

    this.getAllUsers()

  }

  submit(): void {

    this.taskRegisterDto = this.registrationForm.value;
    this.taskRegisterDto.dueDate = this.dueDate;

    this.taskService.registerTask(this.taskRegisterDto).subscribe((data: any) => {
    });

  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: GetUserDto[]) => {
      this.users = data;
    });
  }

}
