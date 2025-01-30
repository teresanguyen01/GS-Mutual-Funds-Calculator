import { Component, OnInit } from '@angular/core';
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
export class CalculatorComponent implements OnInit {
  mutualFunds = ['BTCFX', 'VFIAX', 'FXAIX', 'SWPPX', 'QSPRX', 'VOO'];
  selectedFund: string = '';
  initialInvestment: number | null = null;
  timeHorizon: number | null = null;
  futureValue: number | null = null;
  beta: number | null = null;
  marketRate: number | null = null;
  riskFreeRate: number | null = null;

  constructor(private http: HttpClient, private stateService: CalculatorStateService) {}

  ngOnInit(): void {
    // Load the state from the service when the component is initialized
    this.loadState();
  }

  loadState(): void {
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
      alert('Please fill out all fields.');
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
    ).subscribe(
      response => {
        this.futureValue = response.futureValue;
        this.beta = response.beta;
        this.marketRate = response.marketReturnRate;

        // Save the state after calculating the future value
        this.stateService.saveState(
          this.selectedFund,
          this.initialInvestment,
          this.timeHorizon,
          this.futureValue,
          this.beta,
          this.marketRate,
          this.riskFreeRate
        );
      },
      error => {
        console.error('Error calculating future value:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  addInvestment() {
    if (!this.selectedFund || !this.initialInvestment || !this.timeHorizon || !this.futureValue) {
      alert('Please calculate the future value first.');
      return;
    }

    const newInvestment = {
      mutualFund: this.selectedFund,
      initialInvestment: this.initialInvestment,
      timeHorizon: this.timeHorizon,
      futureValue: this.futureValue
    };

    this.stateService.addInvestment(newInvestment);
    alert('Investment added successfully!');
  }
}
