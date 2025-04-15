package com.gijun.backend.admin.repository;

import com.gijun.backend.admin.model.Campaign;
import com.gijun.backend.admin.model.id.CampaignId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, CampaignId> {
    Page<Campaign> findByDeletedFalse(Pageable pageable);
    
    Optional<Campaign> findByIdAndDeletedFalse(CampaignId id);
    
    @Query("SELECT c FROM Campaign c WHERE c.deleted = false AND c.applicationDeadline > :now")
    Page<Campaign> findActiveByDeletedFalse(LocalDateTime now, Pageable pageable);
    
    @Query("SELECT c FROM Campaign c WHERE c.deleted = false AND c.applicationDeadline > :now AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.storeName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Campaign> searchActiveCampaigns(String keyword, LocalDateTime now, Pageable pageable);
}
