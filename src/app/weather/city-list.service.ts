import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class CityListService {

  cityListSubject = new Subject<string[]>();
  private cityList: string[] = [];


  getCities() {
    return this.cityList.slice();
  }

  addCity(cityName: string) {
    if (this.cityList.length < 10) {
      this.cityList.push(cityName);
      this.cityListSubject.next(this.cityList.slice());
    } else {
      alert("City Number Limit!")
    }
  }


}