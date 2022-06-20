import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { CityWeatherService } from "./city-weather.service";

@Injectable({ providedIn: "root" })
export class CityListService {

  cityListSubject = new Subject<string[]>();
  private cityList: string[] = [];

  favoriteListSubject = new Subject<string[]>();
  private favoriteList: string[] = [];



  constructor(private cityWeatherService: CityWeatherService) { }
  getCities() {
    return this.cityList.slice();
  }

  addCity(cityName: string) {
    let flag = true;

    if (this.cityList.length > 9) {
      flag = false;
      alert("City Number Limit!")
    } else
      if (this.cityList.find(e => e == cityName)) {
        flag = false;
        alert("City exists")
      }

    if (flag) {
      this.cityWeatherService.getWeatherForCity(cityName).subscribe(res => {
        this.cityList.push(cityName);
        this.cityListSubject.next(this.cityList.slice());
      }, err => {
        alert(err.error.message);
      })
    }
  }

  deleteCity(cityName: string) {

    this.deleteFavorite(cityName);
    this.cityList = this.cityList.filter(c => c != cityName);
    this.cityListSubject.next(this.cityList.slice());

  }

  getFavorites() {
    return this.favoriteList.slice();
  }

  addFavorite(cityName: string) {
    if (!this.favoriteList.find(e => e == cityName)) {
      this.favoriteList.push(cityName);
      this.favoriteListSubject.next(this.favoriteList.slice());
    }
  }

  deleteFavorite(cityName: string) {
    this.favoriteList = this.favoriteList.filter(c => c != cityName);
    this.favoriteListSubject.next(this.favoriteList.slice());
  }

}