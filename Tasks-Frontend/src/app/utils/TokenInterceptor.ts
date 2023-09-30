import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {combineLatest, mergeMap, Observable} from "rxjs";
import {ExcludedUrlRegex} from "keycloak-angular/lib/core/interfaces/keycloak-options";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private keycloak: KeycloakService) {
  }

  /**
   * Calls to update the keycloak token if the request should update the token.
   *
   * @param req http request from @angular http module.
   * @returns
   * A promise boolean for the token update or noop result.
   */
  private async conditionallyUpdateToken(
    req: HttpRequest<unknown>
  ): Promise<boolean> {
    // @ts-ignore
    if (this.keycloak.shouldUpdateToken(req)) {
      return await this.keycloak.updateToken();
    }

    return true;
  }

  /**
   * @deprecated
   * Checks if the url is excluded from having the Bearer Authorization
   * header added.
   *
   * @param req http request from @angular http module.
   * @param excludedUrlRegex contains the url pattern and the http methods,
   * excluded from adding the bearer at the Http Request.
   */
  private isUrlExcluded(
    {method, url}: HttpRequest<unknown>,
    {urlPattern, httpMethods}: ExcludedUrlRegex
  ): boolean {
    // @ts-ignore
    const httpTest = httpMethods.length === 0 || httpMethods.join().indexOf(method.toUpperCase()) > -1;

    const urlTest = urlPattern.test(url);

    return httpTest && urlTest;
  }

  /**
   * Intercept implementation that checks if the request url matches the excludedUrls.
   * If not, adds the Authorization header to the request if the user is logged in.
   *
   * @param req
   * @param next
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const {enableBearerInterceptor, excludedUrls} = this.keycloak;
    if (!enableBearerInterceptor) {
      return next.handle(req);
    }

    // @ts-ignore
    const shallPass: boolean = !this.keycloak.shouldAddToken(req) ||
      excludedUrls.findIndex((item) => this.isUrlExcluded(req, item)) > -1;
    if (shallPass) {
      return next.handle(req);
    }

    return combineLatest([
      this.conditionallyUpdateToken(req),
      this.keycloak.isLoggedIn()
    ]).pipe(
      mergeMap(([_, isLoggedIn]) =>
        isLoggedIn
          ? this.handleRequestWithTokenHeader(req, next)
          : next.handle(req)
      )
    );
  }

  /**
   * Adds the token of the current user to the Authorization header
   *
   * @param req
   * @param next
   */
  private handleRequestWithTokenHeader(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // @ts-ignore
    return this.keycloak.addTokenToHeader(req.headers).pipe(
      mergeMap((headersWithBearer) => {
        // @ts-ignore
        const kcReq = req.clone({headers: headersWithBearer});
        return next.handle(kcReq);
      })
    );
  }
}
