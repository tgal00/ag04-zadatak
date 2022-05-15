import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscriber, Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy{

  private userSubsciption: Subscription = new Subscription();
  isAuthenticated = false;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    })
    this.userSubsciption.add(this.userSubsciption);
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubsciption.unsubscribe();
  }
}