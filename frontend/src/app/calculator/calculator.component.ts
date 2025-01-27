import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  selectedFund: string = '';
  initialInvestment: number | null = null;
  timeHorizon: number | null = null;

  futureValue: number | null = null;
  beta: number | null = null;
  marketRate: number | null = null;
  riskFreeRate: number | null = 0.046; // Hardcoded value from backend

  constructor(private http: HttpClient) {}

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
    }, error => {
      console.error('Error calculating future value:', error);
      alert('Error calculating future value. Please try again.');
    });
  }
}
