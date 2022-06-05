import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { RootObject } from "./weather-response.model";
import { RootObject5Day } from "./weather-response5day.model";

@Injectable({providedIn:"root"})
export class CityWeatherService{

  constructor(private http:HttpClient){}

  getWeatherForCity(cityName:string){
    return this.http.get<RootObject>(environment.openWeatherUrl+ `weather?q=${cityName}&units=metric&appid=`+environment.openWeatherAPIKey)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(err);
    }));
  }

  get5DayWeatherForCity(cityName:string){
    return this.http.get<RootObject5Day>(environment.openWeatherUrl+ `forecast?q=${cityName}&units=metric&appid=`+environment.openWeatherAPIKey)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(err);
    }));
  }

  getWeatherHourly(cityName:string){
    let date = new Date().getTime();
    return this.http.get(environment.openWeatherUrl+ `forecast?q=${cityName}&units=metric&appid=`+environment.openWeatherAPIKey)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(err);
    }));
  }

}