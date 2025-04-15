package com.gijun.backend.store.controller;

import com.gijun.backend.admin.model.id.CampaignId;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.common.dto.ApiResponse;
import com.gijun.backend.common.model.id.UserId;
import com.gijun.backend.common.repository.UserRepository;
import com.gijun.backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;
    private final UserRepository userRepository;

    @GetMapping("/campaigns")
    public ApiResponse<?> getStoreCampaigns(
            Pageable pageable,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserId storeId = getUserIdFromUsername(userDetails.getUsername());
        
        return ApiResponse.success(storeService.getStoreCampaigns(storeId, pageable));
    }
    
    @GetMapping("/campaigns/{campaignId}/reviews")
    public ApiResponse<Page<ApplicationResponse>> getCampaignReviews(
            @PathVariable("campaignId") String campaignId,
            Pageable pageable) {
        CampaignId id = CampaignId.of(campaignId);
        return ApiResponse.success(storeService.getCampaignReviews(id, pageable));
    }
    
    private UserId getUserIdFromUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalStateException("User not found"))
                .getId();
    }
}
