import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { RootObject } from "./weather-response.model";

@Injectable({providedIn:"root"})
export class CityWeatherService{

  constructor(private http:HttpClient){}

  getWeatherForCity(cityName:string){
    return this.http.get<RootObject>(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=c74421f64ebac952e7d8a6bea147f0b3`)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(err);
    }));
  }

}