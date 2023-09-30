import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTasksComponent} from './Pages/my-tasks/my-tasks.component';
import {SearchComponent} from "./Pages/search/search.component";
import {AuthGuard} from "./auth/auth.guard";
import {NewTaskComponent} from "./Pages/new-task/new-task.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/MyTasks',
    pathMatch: 'full'
  },
  {
    path: 'MyTasks',
    component: MyTasksComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'Search',
    component: SearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'NewTask',
    component: NewTaskComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
