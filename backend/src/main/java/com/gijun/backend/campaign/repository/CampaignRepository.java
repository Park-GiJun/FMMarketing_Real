package com.gijun.backend.campaign.repository;

import com.gijun.backend.campaign.model.Campaign;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, CampaignId> {
    Page<Campaign> findByDeletedFalse(Pageable pageable);
    
    @Query("SELECT c FROM Campaign c WHERE c.deleted = false AND c.applicationDeadline > :now")
    Page<Campaign> findActiveByDeletedFalse(LocalDateTime now, Pageable pageable);
    
    @Query("SELECT c FROM Campaign c WHERE c.deleted = false AND c.applicationDeadline > :now AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.storeName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Campaign> searchActiveCampaigns(String keyword, LocalDateTime now, Pageable pageable);
    
    List<Campaign> findByStoreIdAndDeletedFalse(UserId storeId);
    
    Optional<Campaign> findByIdAndDeletedFalse(CampaignId id);
}
