import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  private baseUrl = 'http://localhost:4200';  // Change to your backend URL if different

  constructor(private http: HttpClient) {}

  getMutualFunds(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mutualFunds`);
  }

  calculateFutureValue(initialInvestment: number, time: number, ticker: string): Observable<any> {
    let params = new HttpParams()
      .set('initialInvestment', initialInvestment.toString())
      .set('time', time.toString())
      .set('ticker', ticker);

    return this.http.get(`${this.baseUrl}/futureValue`, { params });
  }
}
