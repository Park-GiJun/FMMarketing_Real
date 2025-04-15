package com.gijun.backend.admin.controller;

import com.gijun.backend.admin.dto.ApplicationStatusRequest;
import com.gijun.backend.admin.service.AdminApplicationService;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.common.dto.ApiResponse;
import com.gijun.backend.common.model.id.ApplicationId;
import com.gijun.backend.common.model.id.CampaignId;
import jakarta.validation.Valid;
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
            @PathVariable("campaignId") String campaignId,
            Pageable pageable) {
        CampaignId id = CampaignId.of(campaignId);
        return ApiResponse.success(adminApplicationService.getCampaignApplications(id, pageable));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<ApplicationResponse> updateApplicationStatus(
            @PathVariable("id") String id,
            @Valid @RequestBody ApplicationStatusRequest request) {
        ApplicationId applicationId = ApplicationId.of(id);
        return ApiResponse.success("Application status updated", 
            adminApplicationService.updateApplicationStatus(applicationId, request));
    }
}
