package com.gijun.backend.store.service;

import com.gijun.backend.admin.dto.CampaignResponse;
import com.gijun.backend.admin.model.Campaign;
import com.gijun.backend.admin.model.id.CampaignId;
import com.gijun.backend.admin.repository.CampaignRepository;
import com.gijun.backend.blogger.dto.ApplicationResponse;
import com.gijun.backend.blogger.model.Application;
import com.gijun.backend.blogger.repository.ApplicationRepository;
import com.gijun.backend.common.exception.ResourceNotFoundException;
import com.gijun.backend.common.model.id.UserId;
import com.gijun.backend.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    
    private final CampaignRepository campaignRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    
    @Transactional(readOnly = true)
    public Page<CampaignResponse> getStoreCampaigns(UserId storeId, Pageable pageable) {
        // Here, we would need to know which campaigns are associated with this store
        // For now, let's assume a store can see all campaigns (in real implementation, 
        // this would be filtered by a store ID field in Campaign or a relation table)
        Page<Campaign> campaigns = campaignRepository.findByDeletedFalse(pageable);
        
        return campaigns.map(campaign -> {
            int appliedCount = applicationRepository.countByCampaignId(campaign.getId());
            int approvedCount = applicationRepository.countByCampaignIdAndStatus(campaign.getId(), Application.Status.APPROVED);
            int reviewCount = applicationRepository.countByCampaignIdAndStatusAndReviewUrlIsNotNull(campaign.getId(), Application.Status.APPROVED);
            
            return CampaignResponse.builder()
                    .id(campaign.getId())
                    .title(campaign.getTitle())
                    .content(campaign.getContent())
                    .storeName(campaign.getStoreName())
                    .storeAddress(campaign.getStoreAddress())
                    .applicationDeadline(campaign.getApplicationDeadline())
                    .reviewDeadline(campaign.getReviewDeadline())
                    .requiredBloggerCount(campaign.getRequiredBloggerCount())
                    .imageUrl(campaign.getImageUrl())
                    .createdAt(campaign.getCreatedAt())
                    .updatedAt(campaign.getUpdatedAt())
                    .appliedCount(appliedCount)
                    .approvedCount(approvedCount)
                    .reviewCount(reviewCount)
                    .build();
        });
    }
    
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getCampaignReviews(CampaignId campaignId, Pageable pageable) {
        Campaign campaign = campaignRepository.findByIdAndDeletedFalse(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));
        
        // Get only completed applications with reviews
        Page<Application> applications = applicationRepository.findByCampaignIdAndStatusAndReviewUrlIsNotNull(
                campaignId, Application.Status.COMPLETED, pageable);
        
        return applications.map(application -> {
            var blogger = userRepository.findById(application.getBloggerId())
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
                    .reviewUrl(application.getReviewUrl())
                    .createdAt(application.getCreatedAt())
                    .updatedAt(application.getUpdatedAt())
                    .campaignTitle(campaign.getTitle())
                    .storeName(campaign.getStoreName())
                    .build();
        });
    }
}
