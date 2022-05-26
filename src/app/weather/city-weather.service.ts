import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { RootObject } from "./weather-response.model";

@Injectable({providedIn:"root"})
export class CityWeatherService{

  constructor(private http:HttpClient){}

  getWeatherForCity(cityName:string){
    return this.http.get<RootObject>(environment.openWeatherUrl+ `weather?q=${cityName}&units=metric&appid=`+environment.openWeatherAPIKey)
    .pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(err);
    }));
  }

}