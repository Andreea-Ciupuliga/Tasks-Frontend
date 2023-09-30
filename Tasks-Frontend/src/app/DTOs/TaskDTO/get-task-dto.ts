import {Status} from "../../Models/status";

export interface GetTaskDto {
  id: number;
  dueDate: string;
  subject: string;
  status: Status;
  userFirstName: string;
  userLastName: string;
  username: string;
}
