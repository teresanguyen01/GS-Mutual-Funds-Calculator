import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculatorStateService } from '../calculator-state/calculator-state.service'; // for saving the data!
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

// The CalculatorComponent class is the controller for the calculator component.
export class CalculatorComponent {
  // all hardcoded mutual funds Victoria provided
  mutualFunds = ['BTCFX', 'VFIAX', 'FXAIX', 'SWPPX', 'QSPRX', 'VOO'];
  selectedFund: string;
  initialInvestment: number | null;
  timeHorizon: number | null;
  futureValue: number | null;
  beta: number | null;
  marketRate: number | null;
  riskFreeRate: number | null;

  // Inject the HttpClient and CalculatorStateService services --> for saving the data!
  constructor(private http: HttpClient, private stateService: CalculatorStateService) {
    this.selectedFund = this.stateService.selectedFund;
    this.initialInvestment = this.stateService.initialInvestment;
    this.timeHorizon = this.stateService.timeHorizon;
    this.futureValue = this.stateService.futureValue;
    this.beta = this.stateService.beta;
    this.marketRate = this.stateService.marketRate;
    this.riskFreeRate = this.stateService.riskFreeRate;
  }

  // Function to calculate the future value of the investment
  calculateFutureValue() {
    if (!this.selectedFund || !this.initialInvestment || !this.timeHorizon) {
      // If any of the fields are empty, alert the user to fill out all fields
      alert('Please fill out all fields! :)');
      return;
    }

    // Parameters to send to the server
    const params = {
      initialInvestment: this.initialInvestment.toString(),
      time: this.timeHorizon.toString(),
      ticker: this.selectedFund
    };

    // Make a GET request to the server to calculate the future value from the backend
    // similar to the link Victoria provided to test
    this.http.get<{ futureValue: number; beta: number; marketReturnRate: number }>(
      'http://localhost:8080/futureValue',
      { params }
    ).subscribe(response => {
      this.futureValue = response.futureValue;
      this.beta = response.beta;
      this.marketRate = response.marketReturnRate;

      // Save the state in the service (this is so that way when we switch to a new tab, the data is still there)
      this.stateService.saveState(
        this.selectedFund,
        this.initialInvestment,
        this.timeHorizon,
        this.futureValue,
        this.beta,
        this.marketRate,
        this.riskFreeRate
      );
      // added if statement to alert user if the future value is less than the initial investment
    }, error => {
      console.error('Error calculating future value:', error);
      alert('Error calculating future value. Please try again.');
    });
  }
}
