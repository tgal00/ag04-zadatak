import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{

  loginMode: boolean = true;
  error: HttpErrorResponse | null = null;
  isLoading: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  changeMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;

    if (!this.loginMode) {
      authObservable = this.authService.register(email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }

    const subscription = authObservable.subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/weather']);
    },
      error => {
        this.error = error
        this.isLoading = false;
      });
      
    this.authSubscription.add(subscription);

    form.reset();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}