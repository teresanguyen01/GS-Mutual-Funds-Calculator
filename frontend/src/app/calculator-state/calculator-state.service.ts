import { Injectable } from '@angular/core';

interface Investment {
  mutualFund: string;
  initialInvestment: number;
  timeHorizon: number;
  futureValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorStateService {
  // State for current investment data
  selectedFund: string = '';
  initialInvestment: number | null = null;
  timeHorizon: number | null = null;
  futureValue: number | null = null;
  beta: number | null = null;
  marketRate: number | null = null;
  riskFreeRate: number | null = 0.046;

  // List of investments
  private investments: Investment[] = [];

  // Save the current calculator state
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

  // Add a new investment to the list
  addInvestment(investment: Investment) {
    this.investments.push(investment);
  }

  // Retrieve all stored investments
  getInvestments(): Investment[] {
    return this.investments;
  }

  // Clear all stored investments
  clearInvestments() {
    this.investments = [];
  }
}
