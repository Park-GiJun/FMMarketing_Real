package com.gijun.backend.blogger.controller;

import com.gijun.backend.blogger.dto.ApplicationRequest;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.blogger.dto.ReviewSubmissionRequest;
import com.gijun.backend.blogger.service.BloggerService;
import com.gijun.backend.common.dto.ApiResponse;
import com.gijun.backend.common.model.id.UserId;
import com.gijun.backend.common.model.key.CampaignId;
import com.gijun.backend.common.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blogger")
@RequiredArgsConstructor
public class BloggerController {

    private final BloggerService bloggerService;
    private final UserRepository userRepository;

    @PostMapping("/campaigns/{campaignId}/apply")
    public ApiResponse<ApplicationResponse> applyToCampaign(
            @PathVariable("campaignId") String campaignId,
            @Valid @RequestBody ApplicationRequest request,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserId bloggerId = getUserIdFromUsername(userDetails.getUsername());
        CampaignId id = CampaignId.of(campaignId);
        
        return ApiResponse.success("Application submitted successfully", 
            bloggerService.applyToCampaign(bloggerId, id, request));
    }

    @PostMapping("/campaigns/{campaignId}/review")
    public ApiResponse<ApplicationResponse> submitReview(
            @PathVariable("campaignId") String campaignId,
            @Valid @RequestBody ReviewSubmissionRequest request,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserId bloggerId = getUserIdFromUsername(userDetails.getUsername());
        CampaignId id = CampaignId.of(campaignId);
        
        return ApiResponse.success("Review submitted successfully", 
            bloggerService.submitReview(bloggerId, id, request));
    }

    @GetMapping("/applications")
    public ApiResponse<Page<ApplicationResponse>> getMyApplications(
            Pageable pageable,
            Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserId bloggerId = getUserIdFromUsername(userDetails.getUsername());
        
        return ApiResponse.success(bloggerService.getBloggerApplications(bloggerId, pageable));
    }
    
    private UserId getUserIdFromUsername(String username) {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalStateException("User not found"))
                .getId();
    }
}
