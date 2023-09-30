import {User} from "./user";
import {Status} from "./status";

export interface Task {

  id: number;
  dueDate: string;
  subject: string;
  status: Status;
  user: User;
}
