import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Subscription } from "rxjs";
import { CityWeatherService } from "../../city-weather.service";
import { RootObjectHourly } from "../../weather-hourly.model";
import { RootObject } from "../../weather-response.model";
import { List, RootObject5Day } from "../../weather-response5day.model";

@Component({
  selector: "app-city-hourly",
  templateUrl: "./city-hourly.component.html",
  styleUrls: ["./city-hourly.component.css"]
})
export class CityHourlyComponent implements OnInit,OnDestroy {

  cityName: string | null = "";
  day: string | null = "";
  cityHourlyList: List[] = [];
  subscription: Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.0-0';

  constructor(private route: ActivatedRoute, private cityWeatherService: CityWeatherService) { }
  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('city');
    this.day = this.route.snapshot.paramMap.get('day');

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayIndex = days.indexOf(this.day as string);

    let sub = this.cityWeatherService.get5DayWeatherForCity(this.cityName!).subscribe(res => {
      for (let item of res.list) {
        if (new Date(item.dt_txt).getUTCDay() == dayIndex) {
          this.cityHourlyList.push(item);
        }
      }
    }
    )
    this.subscription.add(sub);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}