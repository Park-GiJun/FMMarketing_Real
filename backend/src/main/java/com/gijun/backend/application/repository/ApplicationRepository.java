package com.gijun.backend.application.repository;

import com.gijun.backend.application.model.Application;
import com.gijun.backend.application.model.Application.ApplicationStatus;
import com.gijun.backend.common.model.id.ApplicationId;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Application entity
 * This is the primary implementation - all other ApplicationRepository interfaces should be removed
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, ApplicationId> {
    Page<Application> findByCampaignId(CampaignId campaignId, Pageable pageable);
    
    List<Application> findByBloggerId(UserId bloggerId);
    
    Page<Application> findByBloggerId(UserId bloggerId, Pageable pageable);
    
    Optional<Application> findByBloggerIdAndCampaignId(UserId bloggerId, CampaignId campaignId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.campaignId = :campaignId")
    int countByCampaignId(CampaignId campaignId);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.campaignId = :campaignId AND a.status = :status")
    int countByCampaignIdAndStatus(CampaignId campaignId, ApplicationStatus status);
    
    @Query("SELECT COUNT(a) FROM Application a WHERE a.campaignId = :campaignId AND a.status = :status AND a.reviewUrl IS NOT NULL")
    int countByCampaignIdAndStatusAndReviewUrlIsNotNull(CampaignId campaignId, ApplicationStatus status);
    
    List<Application> findByCampaignIdAndStatus(CampaignId campaignId, ApplicationStatus status);
    
    Page<Application> findByCampaignIdAndStatusAndReviewUrlIsNotNull(
            CampaignId campaignId, ApplicationStatus status, Pageable pageable);
}
