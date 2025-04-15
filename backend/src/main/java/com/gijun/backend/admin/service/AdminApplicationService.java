package com.gijun.backend.admin.service;

import com.gijun.backend.admin.dto.ApplicationStatusRequest;
import com.gijun.backend.application.model.Application;
import com.gijun.backend.application.repository.ApplicationRepository;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.campaign.model.Campaign;
import com.gijun.backend.campaign.repository.CampaignRepository;
import com.gijun.backend.common.exception.BadRequestException;
import com.gijun.backend.common.exception.ResourceNotFoundException;
import com.gijun.backend.common.model.User;
import com.gijun.backend.common.model.id.ApplicationId;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getCampaignApplications(CampaignId campaignId, Pageable pageable) {
        // Validate campaign exists
        Campaign campaign = campaignRepository.findByIdAndDeletedFalse(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));
                
        Page<Application> applications = applicationRepository.findByCampaignId(campaignId, pageable);
        return applications.map(application -> convertToResponse(application, campaign));
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(ApplicationId applicationId, ApplicationStatusRequest request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        // Validate status
        try {
            Application.ApplicationStatus newStatus = Application.ApplicationStatus.valueOf(request.getStatus());
            
            if (newStatus == Application.ApplicationStatus.REJECTED && (request.getReason() == null || request.getReason().trim().isEmpty())) {
                throw new BadRequestException("Rejection reason is required when rejecting an application");
            }
            
            application.setStatus(newStatus);
            
            if (newStatus == Application.ApplicationStatus.REJECTED) {
                application.setRejectionReason(request.getReason());
            }
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status: " + request.getStatus());
        }

        Application updatedApplication = applicationRepository.save(application);
        
        Campaign campaign = campaignRepository.findById(application.getCampaignId())
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", application.getCampaignId()));
                
        return convertToResponse(updatedApplication, campaign);
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
