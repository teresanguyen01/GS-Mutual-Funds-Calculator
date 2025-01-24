import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  { path: 'about', component:AboutComponent },
  { path: 'calculator', component:CalculatorComponent },
  { path: 'spreadsheet', component:SpreadsheetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
