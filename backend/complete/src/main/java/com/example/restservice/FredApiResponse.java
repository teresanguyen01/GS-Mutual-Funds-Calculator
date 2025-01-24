package com.example.restservice;

import java.util.List;

public record FredApiResponse(
        String realtime_start,
        String realtime_end,
        String observation_start,
        String observation_end,
        String units,
        String output_type,
        String file_type,
        String order_by,
        String sort_order,
        int count,
        int offset,
        int limit,
        List<FredObservation> observations
) { }
