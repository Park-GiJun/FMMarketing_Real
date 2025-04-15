package com.gijun.backend.admin.controller;

import com.gijun.backend.admin.dto.CampaignRequest;
import com.gijun.backend.admin.dto.CampaignResponse;
import com.gijun.backend.admin.service.AdminCampaignService;
import com.gijun.backend.common.dto.ApiResponse;
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

    @PostMapping
    public ApiResponse<CampaignResponse> createCampaign(
            @Valid @RequestBody CampaignRequest request,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Long adminId = getUserIdFromUsername(userDetails.getUsername());
        return ApiResponse.success("Campaign created successfully", adminCampaignService.createCampaign(request, adminId));
    }

    @GetMapping("/{id}")
    public ApiResponse<CampaignResponse> getCampaign(@PathVariable Long id) {
        return ApiResponse.success(adminCampaignService.getCampaign(id));
    }

    @GetMapping
    public ApiResponse<Page<CampaignResponse>> getAllCampaigns(Pageable pageable) {
        return ApiResponse.success(adminCampaignService.getAllCampaigns(pageable));
    }

    @PutMapping("/{id}")
    public ApiResponse<CampaignResponse> updateCampaign(
            @PathVariable Long id,
            @Valid @RequestBody CampaignRequest request) {
        return ApiResponse.success("Campaign updated successfully", adminCampaignService.updateCampaign(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteCampaign(@PathVariable Long id) {
        adminCampaignService.deleteCampaign(id);
        return ApiResponse.success("Campaign deleted successfully");
    }

    // 이 메서드는 실제 구현에서 사용자 저장소에서 ID를 가져오는 부분임
    private Long getUserIdFromUsername(String username) {
        // 실제 구현에서는 UserRepository에서 이메일로 User를 조회하여 ID를 반환
        // 임시로 1L 반환
        return 1L;
    }
}
