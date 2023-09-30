import {Status} from "../../Models/status";

export interface RegisterTaskDto {

  dueDate: string;
  subject: string;
  status: Status;
  username: string;
}
