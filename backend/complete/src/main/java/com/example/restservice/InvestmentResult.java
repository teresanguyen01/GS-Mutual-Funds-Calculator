package com.example.restservice;

public record InvestmentResult(
        double initialInvestment,
        double time,
        double riskFreeRate,
        double beta,
        double marketReturnRate,
        double rate,
        double futureValue
) { }