package com.gijun.backend.campaign.model;

import com.gijun.backend.common.model.BaseTimeEntity;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Campaign extends BaseTimeEntity {

    @EmbeddedId
    private CampaignId id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private String storeName;

    @Column(nullable = false)
    private String storeAddress;
    
    @Column(nullable = false)
    private LocalDateTime applicationDeadline;
    
    @Column(nullable = false)
    private LocalDateTime reviewDeadline;
    
    @Column(nullable = false)
    private int requiredBloggerCount;
    
    @Column
    private String imageUrl;
    
    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "store_id"))
    })
    @Embedded
    private UserId storeId;
    
    @Column(nullable = false)
    private boolean deleted = false;
    
    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "created_by", nullable = false))
    })
    @Embedded
    private UserId createdBy;
    
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = CampaignId.generate();
        }
    }
}
