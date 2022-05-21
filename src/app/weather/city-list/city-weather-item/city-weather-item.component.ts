import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { CityWeatherService } from "../../city-weather.service";
import { RootObject } from "../../weather-response.model";

@Component({
  selector: "app-city-weather-item",
  templateUrl: "./city-weather-item.component.html",
  styleUrls:["./city-weather-item.component.css"]
})
export class CityWeatherItemComponent implements OnInit {

  @Input() cityName: string = "";
  cityWeather!: RootObject;
  time: Date = new Date();
  iconUrl:string  = "";

  constructor(private http: HttpClient, private cityWeatherService:CityWeatherService) { }

  ngOnInit(): void {
   this.cityWeatherService.getWeatherForCity(this.cityName)
      .subscribe(res => {
        if(res){
        console.log(res);
        this.cityWeather = res;
        this.iconUrl = `http://openweathermap.org/img/wn/${this.cityWeather.weather[0].icon}@2x.png`
        }
      });


  }

}