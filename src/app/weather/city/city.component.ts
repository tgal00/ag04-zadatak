import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CityWeatherService } from "../city-weather.service";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls:["./city.component.css"]
})
export class CityComponent implements OnInit {

  cityName: string | null = null;
  cityList: any[] = [];
  city:any;

  constructor(private cityWeatherService: CityWeatherService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.cityName = this.route.snapshot.paramMap.get('city');

    this.cityWeatherService.get5DayWeatherForCity(this.cityName!).subscribe(res => {
      console.log(res);
      this.city = res;
      for (let i = 0; i < 40; i += 8) {
        res.list[i].main.temp_min = res.list[i+4].main.temp_min
        res.list[i].main.temp_max = res.list[i+1].main.temp_max
        console.log(res.list[i+1].dt_txt+" "+res.list[i+4].dt_txt)
        this.cityList.push(res.list[i]);
      }
      console.log(this.cityList)
    })
  }
}