import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      AuthComponent,
      WeatherComponent,
      LoadingSpinnerComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
