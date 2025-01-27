// Import all the components and modules and provide the client hydration and event replay to the application.

import { NgModule } from '@angular/core'; // The NgModule is a decorator function that takes a single metadata object whose properties describe the module.
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser'; // The BrowserModule module is used to run the application in the browser.
import { AppRoutingModule } from './app-routing.module'; // The AppRoutingModule module is used to define the routes of the application.
import { AppComponent } from './app.component'; // The AppComponent is the root component of the application.

// All the page components are imported here (note: CalculatorComponent is standalone and not imported here).
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http'; // The HttpClientModule module is used to make HTTP requests. (note: is depreciated)
import { FormsModule } from '@angular/forms'; // The FormsModule module is used to work with forms in Angular.


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    SpreadsheetComponent,
    HomeComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    // The provideClientHydration function is used to provide hydration to the client.
    // hydration is the process of restoring the state of the application on the client side.
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
