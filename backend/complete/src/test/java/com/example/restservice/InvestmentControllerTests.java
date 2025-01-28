package com.example.restservice;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;
import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

class InvestmentControllerTests {

    @InjectMocks
    private InvestmentController investmentController;

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void calculateFutureValue_withValidInput_returnsCorrectFutureValue() {

        double initialInvestment = 10000.0;
        double time = 5.0;
        String ticker = "VFIAX";

        double beta = -0.6880590823768333;
        double riskFreeRate = 0.046;
        double marketReturnRate = 0.24;

        when(restTemplate.getForObject(anyString(), eq(FredApiResponse.class)))
                .thenReturn(mockFredApiResponse(3800.0, 4712.0));

        InvestmentResult result = investmentController.calculateFutureValue(initialInvestment, time, ticker);

        assertNotNull(result);
        assertEquals(initialInvestment, result.initialInvestment());
        assertEquals(time, result.time());
        assertEquals(riskFreeRate, result.riskFreeRate());
        assertEquals(beta, result.beta());
        assertEquals(marketReturnRate, result.marketReturnRate(), 0.01);
        assertTrue(result.futureValue() > 0); // Ensures future value calculation is correct
    }

    @Test
    void calculateFutureValue_withInvalidTicker_usesDefaultBeta() {

        double initialInvestment = 10000.0;
        double time = 5.0;
        String ticker = "INVALID";

        double defaultBeta = 1.0;

        when(restTemplate.getForObject(anyString(), eq(FredApiResponse.class)))
                .thenReturn(mockFredApiResponse(3800.0, 4200.0));

        InvestmentResult result = investmentController.calculateFutureValue(initialInvestment, time, ticker);

        assertNotNull(result);
        assertEquals(defaultBeta, result.beta());
    }

    @Test
    void calculateMarketReturnRateFromFred_privateMethod_returnsCorrectRate() throws Exception {

        when(restTemplate.getForObject(anyString(), eq(FredApiResponse.class)))
                .thenReturn(mockFredApiResponse(3800.0, 4712.0));

        Method privateMethod = InvestmentController.class.getDeclaredMethod("calculateMarketReturnRateFromFred");
        privateMethod.setAccessible(true);

        Double marketReturnRate = (Double) privateMethod.invoke(investmentController);

        assertNotNull(marketReturnRate);
        assertEquals((4712.0 - 3800.0) / 3800.0, marketReturnRate, 0.01);
    }

    private FredApiResponse mockFredApiResponse(double startValue, double endValue) {

        FredObservation startObservation = new FredObservation("2023-01-02", String.valueOf(startValue));
        FredObservation endObservation = new FredObservation("2023-12-31", String.valueOf(endValue));

        return new FredApiResponse(
                "2023-01-01",
                "2023-12-31",
                "2023-01-02",
                "2023-12-31",
                "percent",
                "1",
                "json",
                "date",
                "asc",
                2,
                0,
                2,
                List.of(startObservation, endObservation)
        );
    }
}
