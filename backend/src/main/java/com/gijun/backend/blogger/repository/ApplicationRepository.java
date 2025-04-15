package com.gijun.backend.blogger.repository;

import com.gijun.backend.admin.model.id.CampaignId;
import com.gijun.backend.blogger.model.Application;
import com.gijun.backend.blogger.model.id.ApplicationId;
import com.gijun.backend.common.model.id.UserId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, ApplicationId> {
    Page<Application> findByCampaignId(CampaignId campaignId, Pageable pageable);
    
    Page<Application> findByBloggerId(UserId bloggerId, Pageable pageable);
    
    int countByCampaignId(CampaignId campaignId);
    
    int countByCampaignIdAndStatus(CampaignId campaignId, Application.Status status);
    
    int countByCampaignIdAndStatusAndReviewUrlIsNotNull(CampaignId campaignId, Application.Status status);
    
    Optional<Application> findByCampaignIdAndBloggerId(CampaignId campaignId, UserId bloggerId);
    
    Page<Application> findByCampaignIdAndStatusAndReviewUrlIsNotNull(
            CampaignId campaignId, Application.Status status, Pageable pageable);
}
