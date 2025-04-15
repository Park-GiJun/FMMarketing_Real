package com.gijun.backend.admin.controller;

import com.gijun.backend.admin.dto.ApplicationStatusRequest;
import com.gijun.backend.admin.service.AdminApplicationService;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/applications")
@RequiredArgsConstructor
public class AdminApplicationController {

    private final AdminApplicationService adminApplicationService;

    @GetMapping("/campaign/{campaignId}")
    public ApiResponse<Page<ApplicationResponse>> getCampaignApplications(
            @PathVariable Long campaignId,
            Pageable pageable) {
        return ApiResponse.success(adminApplicationService.getCampaignApplications(campaignId, pageable));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody ApplicationStatusRequest request) {
        return ApiResponse.success("Application status updated", adminApplicationService.updateApplicationStatus(id, request));
    }
}
