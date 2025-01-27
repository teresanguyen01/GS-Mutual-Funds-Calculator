import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorStateService {
  selectedFund: string = '';
  initialInvestment: number | null = null;
  timeHorizon: number | null = null;
  futureValue: number | null = null;
  beta: number | null = null;
  marketRate: number | null = null;
  riskFreeRate: number | null = 0.046;

  saveState(
    selectedFund: string,
    initialInvestment: number | null,
    timeHorizon: number | null,
    futureValue: number | null,
    beta: number | null,
    marketRate: number | null,
    riskFreeRate: number | null
  ) {
    this.selectedFund = selectedFund;
    this.initialInvestment = initialInvestment;
    this.timeHorizon = timeHorizon;
    this.futureValue = futureValue;
    this.beta = beta;
    this.marketRate = marketRate;
    this.riskFreeRate = riskFreeRate;
  }
}
