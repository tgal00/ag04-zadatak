import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";


export class AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {


  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string) {

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsdIJLI0jUhn7oPtpQ7_WTrWpP4AWfVHE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError),tap(res => {
        const user = new User(res.email);
        this.user.next(user);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsdIJLI0jUhn7oPtpQ7_WTrWpP4AWfVHE',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        const user = new User(res.email);
        this.user.next(user);
      }));;
  }

  logout() {
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