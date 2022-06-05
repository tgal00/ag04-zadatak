import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Timestamp } from "rxjs";
import { CityWeatherService } from "../city-weather.service";
import { List, RootObject5Day } from "../weather-response5day.model";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls:["./city.component.css"]
})
export class CityComponent implements OnInit, OnDestroy {

  cityName: string | null = null;
  cityList: List[] = [];
  city!:RootObject5Day;
  private subscription:Subscription = new Subscription();
  readonly NUMBER_FORMAT: string = '1.0-0';

  constructor(private cityWeatherService: CityWeatherService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.cityName = this.route.snapshot.paramMap.get('city');

    let sub = this.cityWeatherService.get5DayWeatherForCity(this.cityName!).subscribe(res => {
      this.city = res;
      for (let i = 0; i < 40; i += 8) {
        res.list[i].main.temp_min = res.list[i+4].main.temp_min
        res.list[i].main.temp_max = res.list[i+1].main.temp_max
        this.cityList.push(res.list[i] as List);
      }
    })
    
    this.subscription.add(sub);
  }


  onShowCityHourly(day:string){

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    console.log(day);
    let dayofWeek = days[new Date(day).getUTCDay()];
    console.log(dayofWeek);
    this.router.navigate([`${dayofWeek}`],{relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}