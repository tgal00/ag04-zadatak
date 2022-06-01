import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { catchError } from "rxjs";
import { CityListService } from "../city-list.service";
import { CityWeatherService } from "../city-weather.service";

@Component({
  selector: "app-city-add",
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css']
})
export class CityAddComponent implements OnInit {


  addCityForm!: FormGroup;
  constructor(private cityListService: CityListService) { }

  ngOnInit(): void {
    this.initForm();
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

}