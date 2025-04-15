package com.gijun.backend.blogger.service;

import com.gijun.backend.admin.model.Campaign;
import com.gijun.backend.admin.repository.CampaignRepository;
import com.gijun.backend.application.model.Application;
import com.gijun.backend.application.repository.ApplicationRepository;
import com.gijun.backend.blogger.dto.ApplicationRequest;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.blogger.dto.ReviewSubmissionRequest;
import com.gijun.backend.common.exception.BadRequestException;
import com.gijun.backend.common.exception.ResourceNotFoundException;
import com.gijun.backend.common.model.User;
import com.gijun.backend.common.model.id.UserId;
import com.gijun.backend.common.model.key.CampaignId;
import com.gijun.backend.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BloggerService {

    private final ApplicationRepository applicationRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    @Transactional
    public ApplicationResponse applyToCampaign(UserId bloggerId, CampaignId campaignId, ApplicationRequest request) {
        // Validate campaign is open for applications
        Campaign campaign = campaignRepository.findByIdAndDeletedFalse(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));
                
        if (campaign.getApplicationDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Campaign application deadline has passed");
        }
        
        // Check if blogger already applied to this campaign
        if (applicationRepository.findByCampaignIdAndBloggerId(campaignId, bloggerId).isPresent()) {
            throw new BadRequestException("You have already applied to this campaign");
        }
        
        Application application = Application.builder()
                .campaignId(campaignId)
                .bloggerId(bloggerId)
                .blogUrl(request.getBlogUrl())
                .reason(request.getReason())
                .status(Application.Status.PENDING)
                .build();
                
        Application savedApplication = applicationRepository.save(application);
        
        return convertToResponse(savedApplication, campaign);
    }
    
    @Transactional
    public ApplicationResponse submitReview(UserId bloggerId, CampaignId campaignId, ReviewSubmissionRequest request) {
        Application application = applicationRepository.findByCampaignIdAndBloggerId(campaignId, bloggerId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "campaignId and bloggerId", 
                    campaignId + " and " + bloggerId));
        
        // Validate application status is APPROVED
        if (application.getStatus() != Application.Status.APPROVED) {
            throw new BadRequestException("Only approved applications can submit reviews");
        }
        
        // Validate review deadline
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));
                
        if (campaign.getReviewDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Review submission deadline has passed");
        }
        
        application.setReviewUrl(request.getReviewUrl());
        application.setStatus(Application.Status.COMPLETED);
        
        Application updatedApplication = applicationRepository.save(application);
        return convertToResponse(updatedApplication, campaign);
    }
    
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getBloggerApplications(UserId bloggerId, Pageable pageable) {
        Page<Application> applications = applicationRepository.findByBloggerId(bloggerId, pageable);
        return applications.map(application -> {
            Campaign campaign = campaignRepository.findById(application.getCampaignId())
                    .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", application.getCampaignId()));
            return convertToResponse(application, campaign);
        });
    }
    
    private ApplicationResponse convertToResponse(Application application, Campaign campaign) {
        User blogger = userRepository.findById(application.getBloggerId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", application.getBloggerId()));
                
        return ApplicationResponse.builder()
                .id(application.getId())
                .campaignId(application.getCampaignId())
                .bloggerId(application.getBloggerId())
                .bloggerName(blogger.getName())
                .bloggerEmail(blogger.getEmail())
                .blogUrl(application.getBlogUrl())
                .reason(application.getReason())
                .status(application.getStatus().name())
                .rejectionReason(application.getRejectionReason())
                .reviewUrl(application.getReviewUrl())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .campaignTitle(campaign.getTitle())
                .storeName(campaign.getStoreName())
                .build();
    }
}
