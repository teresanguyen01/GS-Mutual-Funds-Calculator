package com.example.restservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * returns the hard-coded list of mutual funds
 */
@RestController
public class MutualFundController {

    @GetMapping("/mutualFunds")
    public List<MutualFund> getMutualFunds() {
        return List.of(
                new MutualFund("VFIAX", "Vanguard 500 Index Fund", -0.6880590823768333),
                new MutualFund("FXAIX", "Fidelity 500 Index Fund", -0.7772885364632738),
                new MutualFund("SWPPX", "Schwab S&P 500 Index Fund", -0.8406390392309634),
                new MutualFund("QSPRX", "Invesco S&P 500 Pure Growth ETF", -0.30069851428560307),
                new MutualFund("VOO", "Vanguard S&P 500 ETF", 1.009531907549889)
        );
    }
}
