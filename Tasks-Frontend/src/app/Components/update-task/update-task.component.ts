import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GetTaskDto} from "../../DTOs/TaskDTO/get-task-dto";
import {TaskService} from "../../Services/TaskService/task.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {GetUserDto} from "../../DTOs/UserDTO/get-user-dto";
import {UserService} from "../../Services/UserService/user.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
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

  // @ts-ignore
  public user: GetUserDto;
  // @ts-ignore
  public task: GetTaskDto;
  public users: GetUserDto[] = [];



  disabled = true;


  constructor(private readonly userService: UserService, private fb: FormBuilder, private readonly taskService: TaskService, @Inject(MAT_DIALOG_DATA) public data: any,) {
  }

  ngOnInit(): void {

    this.getAllUsers()

    this.getTask()

  }

  getTask(){
    this.taskService.getTaskById(this.data.taskId).subscribe((data: GetTaskDto) => {
      this.task = data;

      this.dueDate = this.task.dueDate;
      this.subject = this.task.subject;

      this.selectedStatus = this.task.status.toString();
      this.selectedUser = this.task.username;

    });
  }

  submit(): void {

    this.taskRegisterDto = this.registrationForm.value;

    //ca sa fac data de tipul yyyy.mm.dd si sa o trimit asa pe backend
    var splitted = this.taskRegisterDto.dueDate.split(".");
    this.taskRegisterDto.dueDate = splitted[2] + "-" + splitted[1] + "-" + splitted[0]

    if (this.selectedStatus != "")
      this.taskRegisterDto.status = this.selectedStatus;


    if (this.selectedUser != "") {
      this.userService.getUserByUsername(this.selectedUser).subscribe((data: GetUserDto) => {
        this.user = data
        this.taskRegisterDto.username = this.user.username;
      });

    }

    this.taskService.updateTask(this.data.taskId, this.taskRegisterDto).subscribe((data: any) => {
    });

  }


  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: GetUserDto[]) => {
      this.users = data;
    });
  }

}
