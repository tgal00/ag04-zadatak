import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CityAddComponent } from './weather/city-add/city-add.component';
import { CityListComponent } from './weather/city-list/city-list.component';
import { CityWeatherItemComponent } from './weather/city-list/city-weather-item/city-weather-item.component';
import { CityWeatherService } from './weather/city-weather.service';
import { CityComponent } from './weather/city/city.component';
import { CityHourlyComponent } from './weather/city/city-hourly/city-hourly.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    WeatherComponent,
    LoadingSpinnerComponent,
    CityAddComponent,
    CityListComponent,
    CityWeatherItemComponent,
    CityComponent,
    CityHourlyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
