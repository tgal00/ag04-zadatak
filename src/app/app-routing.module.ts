import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CityHourlyComponent } from './weather/city/city-hourly/city-hourly.component';
import { CityComponent } from './weather/city/city.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  { path: "", redirectTo: '/weather', pathMatch: 'full' },
  { path: "auth", component: AuthComponent },
  { path: "weather", component: WeatherComponent, canActivate: [AuthGuard] },
  { path: "weather/:city", component: CityComponent },
  { path: "weather/:city/:day", component: CityHourlyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
