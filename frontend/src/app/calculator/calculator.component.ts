import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculatorStateService } from '../calculator-state/calculator-state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  mutualFunds = ['BTCFX', 'VFIAX', 'FXAIX', 'SWPPX', 'QSPRX', 'VOO'];

  selectedFund: string;
  initialInvestment: number | null;
  timeHorizon: number | null;
  futureValue: number | null;
  beta: number | null;
  marketRate: number | null;
  riskFreeRate: number | null;

  constructor(private http: HttpClient, private stateService: CalculatorStateService) {
    this.selectedFund = this.stateService.selectedFund;
    this.initialInvestment = this.stateService.initialInvestment;
    this.timeHorizon = this.stateService.timeHorizon;
    this.futureValue = this.stateService.futureValue;
    this.beta = this.stateService.beta;
    this.marketRate = this.stateService.marketRate;
    this.riskFreeRate = this.stateService.riskFreeRate;
  }

  calculateFutureValue() {
    if (!this.selectedFund || !this.initialInvestment || !this.timeHorizon) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const params = {
      initialInvestment: this.initialInvestment.toString(),
      time: this.timeHorizon.toString(),
      ticker: this.selectedFund
    };

    this.http.get<{ futureValue: number; beta: number; marketReturnRate: number }>(
      'http://localhost:8080/futureValue',
      { params }
    ).subscribe(response => {
      this.futureValue = response.futureValue;
      this.beta = response.beta;
      this.marketRate = response.marketReturnRate;

      // Save the state in the service
      this.stateService.saveState(
        this.selectedFund,
        this.initialInvestment,
        this.timeHorizon,
        this.futureValue,
        this.beta,
        this.marketRate,
        this.riskFreeRate
      );
    }, error => {
      console.error('Error calculating future value:', error);
      alert('Error calculating future value. Please try again.');
    });
  }
}
