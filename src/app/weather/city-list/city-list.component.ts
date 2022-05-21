import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { CityListService } from "../city-list.service";

@Component({
  selector:'app-city-list',
  templateUrl:"./city-list.component.html"
})
export class CityListComponent implements OnInit,OnDestroy{

  subscription:Subscription = new Subscription();
  cityList:string[] = [];

  constructor(private cityListService:CityListService){}
  ngOnInit(): void {
    let sub = this.cityListService.cityListSubject.subscribe(res => this.cityList = res);
    this.subscription.add(sub);
    this.cityList = this.cityListService.getCities();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}