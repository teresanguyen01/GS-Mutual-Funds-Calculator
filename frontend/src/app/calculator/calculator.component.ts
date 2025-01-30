import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculatorStateService } from '../calculator-state/calculator-state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule, BaseChartDirective],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  mutualFunds = ['BTCFX', 'VFIAX', 'FXAIX', 'SWPPX', 'QSPRX', 'VOO'];
  selectedFund: string = '';
  initialInvestment: number | null = null;
  timeHorizon: number | null = null;
  futureValue: number | null = null;
  beta: number | null = null;
  marketRate: number | null = null;
  riskFreeRate: number | null = null;

  // Chart data
  performanceChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Future Value of Investment',
        data: [],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  performanceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (Years)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Future Value of Investment'
        }
      }
    }
  };

  constructor(private http: HttpClient, private stateService: CalculatorStateService) {}

  ngOnInit(): void {
    this.loadState();
    this.loadChartData();
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

  loadChartData(): void {
    const chartData = this.stateService.getChartData();
    this.performanceChartData.labels = chartData.labels;
    this.performanceChartData.datasets[0].data = chartData.data;

    // Update the chart display if data exists
    if (chartData.labels.length > 0) {
      this.chart?.update();
    }
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

        this.stateService.saveState(
          this.selectedFund,
          this.initialInvestment,
          this.timeHorizon,
          this.futureValue,
          this.beta,
          this.marketRate,
          this.riskFreeRate
        );

        this.updateChart();
      },
      error => {
        console.error('Error calculating future value:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  updateChart() {
    if (this.timeHorizon && this.futureValue) {
      const timeValues = Array.from({ length: this.timeHorizon }, (_, i) => i + 1);
      const investmentValues = timeValues.map(year => (this.futureValue! / this.timeHorizon!) * year);
  
      // Convert labels to strings
      const stringLabels = timeValues.map(year => `Year ${year}`);
  
      // Update the chart data
      this.performanceChartData.labels = stringLabels;
      this.performanceChartData.datasets[0].data = investmentValues;
  
      // Save the updated chart data to the state service
      this.stateService.saveChartData(stringLabels, investmentValues);
  
      this.chart?.update();
    }
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
