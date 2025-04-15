package com.gijun.backend.application.model;

import com.gijun.backend.common.model.BaseTimeEntity;
import com.gijun.backend.common.model.id.ApplicationId;
import com.gijun.backend.common.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"blogger_id", "campaign_id"}))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application extends BaseTimeEntity {

    @EmbeddedId
    private ApplicationId id;

    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "blogger_id", nullable = false))
    })
    @Embedded
    private UserId bloggerId;

    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "campaign_id", nullable = false))
    })
    @Embedded
    private CampaignId campaignId;

    @Column(nullable = false)
    private String blogUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status;
    
    @Column(columnDefinition = "TEXT")
    private String rejectionReason;
    
    @Column
    private String reviewUrl;
    
    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = ApplicationId.generate();
        }
        if (this.status == null) {
            this.status = ApplicationStatus.PENDING;
        }
    }
    
    public enum ApplicationStatus {
        PENDING,
        APPROVED,
        REJECTED,
        COMPLETED,
        CANCELED
    }
}
