import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CityListService } from "../city-list.service";

@Component({
  selector:"app-favorites",
  templateUrl:"./favorites.component.html"
})
export class FavoritesComponent implements OnInit, OnDestroy{

  private subscription:Subscription = new Subscription();
  favoriteList:string[] = [];

  constructor(private cityListService:CityListService){}
  ngOnInit(): void {
    let sub = this.cityListService.favoriteListSubject.subscribe(res => this.favoriteList = res);
    this.subscription.add(sub);
    this.favoriteList = this.cityListService.getFavorites();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}