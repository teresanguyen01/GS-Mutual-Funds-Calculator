package com.example.restservice;

public record NewtonApiResponse(
        String status,
        String statusMessage,
        double data,
        String disclaimer
) { }
