import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError, Subscription } from "rxjs";
import { CityListService } from "../city-list.service";
import { CityWeatherService } from "../city-weather.service";

@Component({
  selector: "app-city-add",
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit, OnDestroy {


  addCityForm!: FormGroup;
  cityNumber:number = 0;
  private subscription:Subscription = new Subscription();
  constructor(private cityListService: CityListService) { }

  ngOnInit(): void {
    let sub =this.cityListService.cityListSubject.subscribe(res => this.cityNumber=res.length);
    this.subscription.add(sub);
    this.initForm();
    this.cityListService.getCities();
  }

  onSubmit(): void {
    let city = this.addCityForm.value["cityName"]
    this.cityListService.addCity(city);
    this.addCityForm.controls["cityName"].setValue("");
  }

  initForm() {
    let cityName = "";

    this.addCityForm = new FormGroup({
      'cityName': new FormControl(cityName, Validators.required)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}