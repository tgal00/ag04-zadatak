import { HttpClient } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { map, Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { CityWeatherService } from "../../city-weather.service";
import { RootObject } from "../../weather-response.model";

@Component({
  selector: "app-city-weather-item",
  templateUrl: "./city-weather-item.component.html",
  styleUrls: ["./city-weather-item.component.css"]
})
export class CityWeatherItemComponent implements OnInit {

  @Input() cityName: string = "";
  time: Date = new Date();
  readonly NUMBER_FORMAT: string = '1.0-0';


  cityWeather$!: Observable<RootObject>;
  iconUrl$!: Observable<string>;

  constructor(private http: HttpClient, private cityWeatherService: CityWeatherService) { }

  ngOnInit(): void {

    this.cityWeather$ = this.cityWeatherService.getWeatherForCity(this.cityName);

    this.iconUrl$ = this.cityWeatherService.getWeatherForCity(this.cityName).pipe(
      map(value => value ? environment.weatherResIconUrl + `${value.weather[0].icon}@2x.png` : ""));

  }

}