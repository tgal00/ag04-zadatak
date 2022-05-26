import { HttpClient } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { CityWeatherService } from "../../city-weather.service";
import { RootObject } from "../../weather-response.model";

@Component({
  selector: "app-city-weather-item",
  templateUrl: "./city-weather-item.component.html",
  styleUrls: ["./city-weather-item.component.css"]
})
export class CityWeatherItemComponent implements OnInit, OnDestroy {

  @Input() cityName: string = "";
  cityWeather!: RootObject;
  time: Date = new Date();
  iconUrl: string = "";
  private subscription = new Subscription();

  constructor(private http: HttpClient, private cityWeatherService: CityWeatherService) { }

  ngOnInit(): void {
    this.subscription = this.cityWeatherService.getWeatherForCity(this.cityName)
      .subscribe(res => {
        if (res) {
          this.cityWeather = res;
          this.iconUrl = environment.weatherResIconUrl +`${this.cityWeather.weather[0].icon}@2x.png`;
        }
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}