import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard extends KeycloakAuthGuard {


  constructor(
    // @ts-ignore
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    // @ts-ignore
    super(router, keycloak);
  }

  // @ts-ignore
  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Obligam userul sa se autentifice daca nu a facut-o inca.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Extragem rolurile necesare din route.
    // @ts-ignore
    const requiredRoles = route.data.roles;

    // Permitem utilizatorului sa continue daca nu sunt necesare roluri suplimentare pentru a accesa ruta.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Permitem utilizatorului sa continue daca are toate rolurile necesare.
    if (requiredRoles.every((role) => this.roles.includes(role))) {
      return true;
    } else {
      // redirectionam pe pagina de home daca nu are rolurile necesare
      this.router.navigate(['/MyTasks']);
      return false;
    }
  }
}
