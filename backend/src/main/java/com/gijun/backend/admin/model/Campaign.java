package com.gijun.backend.admin.model;

import com.gijun.backend.common.model.BaseTimeEntity;
import com.gijun.backend.admin.model.id.CampaignId;
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
    
    private String imageUrl;
    
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
