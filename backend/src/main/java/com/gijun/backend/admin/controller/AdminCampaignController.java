package com.gijun.backend.admin.controller;

import com.gijun.backend.admin.dto.CampaignRequest;
import com.gijun.backend.admin.dto.CampaignResponse;
import com.gijun.backend.admin.service.AdminCampaignService;
import com.gijun.backend.common.dto.ApiResponse;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import com.gijun.backend.common.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/campaigns")
@RequiredArgsConstructor
public class AdminCampaignController {

    private final AdminCampaignService adminCampaignService;
    private final UserRepository userRepository;

    @PostMapping
    public ApiResponse<CampaignResponse> createCampaign(
            @Valid @RequestBody CampaignRequest request,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserId adminId = getUserIdFromUsername(userDetails.getUsername());
        return ApiResponse.success("Campaign created successfully", adminCampaignService.createCampaign(request, adminId));
    }

    @GetMapping("/{id}")
    public ApiResponse<CampaignResponse> getCampaign(@PathVariable("id") String id) {
        CampaignId campaignId = CampaignId.of(id);
        return ApiResponse.success(adminCampaignService.getCampaign(campaignId));
    }

    @GetMapping
    public ApiResponse<Page<CampaignResponse>> getAllCampaigns(Pageable pageable) {
        return ApiResponse.success(adminCampaignService.getAllCampaigns(pageable));
    }

    @PutMapping("/{id}")
    public ApiResponse<CampaignResponse> updateCampaign(
            @PathVariable("id") String id,
            @Valid @RequestBody CampaignRequest request) {
        CampaignId campaignId = CampaignId.of(id);
        return ApiResponse.success("Campaign updated successfully", adminCampaignService.updateCampaign(campaignId, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteCampaign(@PathVariable("id") String id) {
        CampaignId campaignId = CampaignId.of(id);
        adminCampaignService.deleteCampaign(campaignId);
        return ApiResponse.success("Campaign deleted successfully");
    }

    private UserId getUserIdFromUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalStateException("User not found"))
                .getId();
    }
}
