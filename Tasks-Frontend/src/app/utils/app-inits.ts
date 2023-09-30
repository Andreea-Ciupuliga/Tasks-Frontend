import {environment} from "../../environments/environment";
import {KeycloakService} from "keycloak-angular";

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.authURL,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },

          // daca este setat "false" atunci nu putem obtine info despre user cum ar fi username-ul folosind functia keycloakService.getUserName()
          //eu folosesc functia aceea pentru a obtine informatii despre user deci o sa las setarea ca "true"
          loadUserProfileAtStartUp: true,
          initOptions: {
            /*Aceasta este o acțiune pe care o specificam cand se incarca keycloak
              -exista 2 optiuni 'login-required' si 'check-sso'
              -daca este setat la 'login-required' inseamna ca browserul va face o redirecționare către serverul Keycloak și înapoi la aplicația noastra.
              -daca este setat la la „check-sso”, aceasta acțiune va fi efectuată într-un iframe ascuns, a.i. resursele aplicației trebuie să fie incarcate și analizate o sg data de browser.
              Daca mergem pe a 2 a optiune va trebui sa adaug silentCheckSsoRedirectUri si sa creez un fișier html silent-check-sso.html cu acest conținut:
               <html>
                <body>
                     <script>
                       parent.postMessage(location.href, location.origin);
                     </script>
                  </body>
               </html>
            */
            onLoad: 'login-required',
            checkLoginIframe: true,
            // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          },

          //In mod implicit, keycloak adaugă Autorizare: Bearer TOKEN la toate solicitările http. Daca vreau sa exclud adresa URL care sa nu aiba antetul de autorizare pot sa le pun aici:
          enableBearerInterceptor: true,
          bearerExcludedUrls: [],
        });
        resolve(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}
