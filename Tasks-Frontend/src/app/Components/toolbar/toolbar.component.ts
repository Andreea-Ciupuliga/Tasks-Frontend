import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  roles = this.keycloakService.getUserRoles();
  constructor(private keycloakService: KeycloakService,private router: Router) { }

  ngOnInit(): void {
    this.roles.forEach(value => {
      //console.log(value)
    })
  }
  logout() {
    this.keycloakService.logout();
    this.router.navigate(['/MyTasks']);
  }
}
