package com.portflow.backend.controller;

import com.portflow.backend.dto.DashboardStatsResponse;
import com.portflow.backend.service.DashboardService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")

public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getStats() {

        return ResponseEntity.ok(
                dashboardService.getStats()
        );
    }
}