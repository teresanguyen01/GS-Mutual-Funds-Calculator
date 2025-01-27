package com.example.restservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class InvestmentController {

	private static final String NEWTON_API_URL = "https://api.newtonanalytics.com/v1/beta";
	private static final String FRED_API_URL = "https://api.stlouisfed.org/fred/series/observations";
	private static final String FRED_API_KEY = "d26079fc190512773ac705629a92f8ea";

	@GetMapping("/futureValue")
	public InvestmentResult calculateFutureValue(
			@RequestParam(value = "initialInvestment") double initialInvestment,
			@RequestParam(value = "time") double time,
			@RequestParam(value = "ticker", required = false) String ticker
	) {

		Double beta = fetchBetaFromHardcodedMutualFunds(ticker);
		//Double beta = 1.0;
		Double marketReturnRate = calculateMarketReturnRateFromFred();

		// interest rate as of January 22, 2025
		Double riskFreeRate = 0.046;

		// Calculate the rate
		Double rate = riskFreeRate + beta * (marketReturnRate - riskFreeRate);

		// Calculate the future value
		double futureValue = initialInvestment * Math.exp(rate * time);

		return new InvestmentResult(initialInvestment, time, riskFreeRate, beta, marketReturnRate, rate, futureValue);
	}

	private Double calculateMarketReturnRateFromFred() {
		RestTemplate restTemplate = new RestTemplate();

		// Define the date range for the previous year
		int previousYear = Year.now().getValue() - 1;
		String observationStart = previousYear + "-01-02";
		String observationEnd = previousYear + "-12-31";

		// Build the API URL
		String url = String.format(
				"%s?series_id=SP500&api_key=%s&file_type=json&observation_start=%s&observation_end=%s",
				FRED_API_URL, FRED_API_KEY, observationStart, observationEnd
		);

		// Fetch data from the FRED API
		FredApiResponse response = restTemplate.getForObject(url, FredApiResponse.class);

		if (response == null || response.observations() == null || response.observations().isEmpty()) {
			throw new RuntimeException("Failed to fetch S&P 500 data from FRED API.");
		}

		// Extract the first and last observation values
		List<FredObservation> observations = response.observations();
		System.out.println("Observation values: " + observations);
		double firstValue = Double.parseDouble(observations.get(0).value());
		double lastValue = Double.parseDouble(observations.get(observations.size() - 1).value());

		// Calculate the market return rate
		return (lastValue - firstValue) / firstValue;
	}

	private Double fetchBetaFromHardcodedMutualFunds(String ticker) {
		// Find the mutual fund by ticker
		switch(ticker){
			case "VFIAX":
				return -0.6880590823768333;
			case "FXAIX":
				return -0.7772885364632738;
			case "SWPPX":
				return -0.8406390392309634;
			case "QSPRX":
				return -0.30069851428560307;
			case "VOO":
				return 1.009531907549889;
			default:
				return 1.0;
		}


	}


	private Double fetchBetaFromNewtonAPI(String ticker) {
		RestTemplate restTemplate = new RestTemplate();
		//String url = String.format("https://api.newtonanalytics.com/stock-beta/ticker=%s&index=GSPC&interval=daily&observations=100", ticker);
		String url = "https://api.newtonanalytics.com/stock-beta/?ticker=fxaix&index=^GSPC&interval=1mo%E2%80%8B&observations=10";
		try {
			NewtonApiResponse response = restTemplate.getForObject(url, NewtonApiResponse.class);
			if (response != null && "200".equals(response.status())) {
				return response.data();
			}
		} catch (Exception e) {
			throw new RuntimeException("Failed to fetch beta from Newton API for ticker: " + ticker);
		}

		throw new RuntimeException("Invalid response from Newton API for ticker: " + ticker);
	}
}
