package com.gijun.backend.admin.service;

import com.gijun.backend.admin.dto.ApplicationStatusRequest;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.blogger.model.Application;
import com.gijun.backend.blogger.repository.ApplicationRepository;
import com.gijun.backend.common.exception.ResourceNotFoundException;
import com.gijun.backend.common.model.User;
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
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getCampaignApplications(Long campaignId, Pageable pageable) {
        Page<Application> applications = applicationRepository.findByCampaignId(campaignId, pageable);
        return applications.map(this::convertToResponse);
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatusRequest request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application", "id", applicationId));

        application.setStatus(Application.Status.valueOf(request.getStatus()));
        if (request.getReason() != null) {
            application.setRejectionReason(request.getReason());
        }

        Application updatedApplication = applicationRepository.save(application);
        return convertToResponse(updatedApplication);
    }

    private ApplicationResponse convertToResponse(Application application) {
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
                .build();
    }
}
