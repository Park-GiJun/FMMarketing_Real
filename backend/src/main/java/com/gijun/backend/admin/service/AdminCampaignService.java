package com.gijun.backend.admin.service;

import com.gijun.backend.admin.dto.CampaignRequest;
import com.gijun.backend.admin.dto.CampaignResponse;
import com.gijun.backend.admin.model.Campaign;
import com.gijun.backend.admin.repository.CampaignRepository;
import com.gijun.backend.blogger.model.Application;
import com.gijun.backend.blogger.repository.ApplicationRepository;
import com.gijun.backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminCampaignService {

    private final CampaignRepository campaignRepository;
    private final ApplicationRepository applicationRepository;

    @Transactional
    public CampaignResponse createCampaign(CampaignRequest request, Long adminId) {
        Campaign campaign = Campaign.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .storeName(request.getStoreName())
                .storeAddress(request.getStoreAddress())
                .applicationDeadline(request.getApplicationDeadline())
                .reviewDeadline(request.getReviewDeadline())
                .requiredBloggerCount(request.getRequiredBloggerCount())
                .imageUrl(request.getImageUrl())
                .createdBy(adminId)
                .build();

        Campaign savedCampaign = campaignRepository.save(campaign);
        return convertToResponse(savedCampaign, 0, 0, 0);
    }

    @Transactional(readOnly = true)
    public CampaignResponse getCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));

        int appliedCount = applicationRepository.countByCampaignId(campaignId);
        int approvedCount = applicationRepository.countByCampaignIdAndStatus(campaignId, Application.Status.APPROVED);
        int reviewCount = applicationRepository.countByCampaignIdAndStatusAndReviewUrlIsNotNull(campaignId, Application.Status.APPROVED);

        return convertToResponse(campaign, appliedCount, approvedCount, reviewCount);
    }

    @Transactional(readOnly = true)
    public Page<CampaignResponse> getAllCampaigns(Pageable pageable) {
        Page<Campaign> campaigns = campaignRepository.findByDeletedFalse(pageable);
        return campaigns.map(campaign -> {
            int appliedCount = applicationRepository.countByCampaignId(campaign.getId());
            int approvedCount = applicationRepository.countByCampaignIdAndStatus(campaign.getId(), Application.Status.APPROVED);
            int reviewCount = applicationRepository.countByCampaignIdAndStatusAndReviewUrlIsNotNull(campaign.getId(), Application.Status.APPROVED);
            return convertToResponse(campaign, appliedCount, approvedCount, reviewCount);
        });
    }

    @Transactional
    public CampaignResponse updateCampaign(Long campaignId, CampaignRequest request) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));

        campaign.setTitle(request.getTitle());
        campaign.setContent(request.getContent());
        campaign.setStoreName(request.getStoreName());
        campaign.setStoreAddress(request.getStoreAddress());
        campaign.setApplicationDeadline(request.getApplicationDeadline());
        campaign.setReviewDeadline(request.getReviewDeadline());
        campaign.setRequiredBloggerCount(request.getRequiredBloggerCount());
        campaign.setImageUrl(request.getImageUrl());

        Campaign updatedCampaign = campaignRepository.save(campaign);

        int appliedCount = applicationRepository.countByCampaignId(campaignId);
        int approvedCount = applicationRepository.countByCampaignIdAndStatus(campaignId, Application.Status.APPROVED);
        int reviewCount = applicationRepository.countByCampaignIdAndStatusAndReviewUrlIsNotNull(campaignId, Application.Status.APPROVED);

        return convertToResponse(updatedCampaign, appliedCount, approvedCount, reviewCount);
    }

    @Transactional
    public void deleteCampaign(Long campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign", "id", campaignId));
        
        campaign.setDeleted(true);
        campaignRepository.save(campaign);
    }

    private CampaignResponse convertToResponse(Campaign campaign, int appliedCount, int approvedCount, int reviewCount) {
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
    }
}
