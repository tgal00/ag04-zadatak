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


  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  register(email: string, password: string): Observable<AuthResponseData> {

    return this.http.post<AuthResponseData>(environment.registerUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        this.handleAuth(res.email!);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(environment.loginUrl,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(res => {
        this.handleAuth(res.email!);
      }));
  }

  private handleAuth(email: string): void {
    let todaysDate = new Date().toLocaleDateString().replace(/\s/g, "").split('.').join("");
    const xToken = email + todaysDate;
    const user = new User(email,xToken);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    

  }

  autoLogin() {
    const userToken: {email:string,  xToken: string } = JSON.parse(localStorage.getItem("userData")!);
    if (!userToken) {
      return;
    }
    const loadedUser = new User(userToken.email,userToken.xToken);
    if (userToken) {
      this.user.next(loadedUser);
    }
  }

  getUser(){
    const userToken: {email:string,  xToken: string } = JSON.parse(localStorage.getItem("userData")!);
    if (userToken) {
      return userToken.email
    }
    else{
      return "";
    }
  }


  logout(): void {
    this.user.next(null);
    localStorage.removeItem("userData");
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