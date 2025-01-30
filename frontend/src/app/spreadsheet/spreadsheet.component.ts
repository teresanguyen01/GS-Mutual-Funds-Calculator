import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorStateService } from '../calculator-state/calculator-state.service';

interface Investment {
  mutualFund: string;
  initialInvestment: number;
  timeHorizon: number;
  futureValue: number;
}

@Component({
  selector: 'app-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SpreadsheetComponent implements OnInit {
  investments: Investment[] = [];

  constructor(private stateService: CalculatorStateService) {}

  ngOnInit(): void {
    this.loadInvestments();
  }

  loadInvestments(): void {
    this.investments = this.stateService.getInvestments();
  }

  clearInvestments(): void {
    this.stateService.clearInvestments();
    this.investments = [];
  }
}
