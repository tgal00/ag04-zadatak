import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, Subscription, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "./user.model";


export class AuthResponseData {
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {


  user: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string): Observable<AuthResponseData> {

    return this.http.post<AuthResponseData>(environment.registerUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        const user = new User(res.email!);
        this.user.next(user);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(environment.loginUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        const user = new User(res.email!);
        this.user.next(user);
      }));;
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(["/auth"]);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Uknown error';
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMessage);
    errorMessage = errorRes.error.error.message;
    return throwError(errorMessage);
  }
}