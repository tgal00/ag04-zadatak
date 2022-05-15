import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginMode = true;
  error = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

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

    authObservable.subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/weather']);
    },
      error => {
        this.error = error
        this.isLoading = false;
      });

    form.reset();
  }
}