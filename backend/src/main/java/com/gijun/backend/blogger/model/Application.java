package com.gijun.backend.blogger.model;

import com.gijun.backend.common.model.BaseTimeEntity;
import com.gijun.backend.blogger.model.id.ApplicationId;
import com.gijun.backend.admin.model.id.CampaignId;
import com.gijun.backend.common.model.id.UserId;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Application extends BaseTimeEntity {

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED,
        COMPLETED,
        EXPIRED
    }

    @EmbeddedId
    private ApplicationId id;

    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "campaign_id", nullable = false))
    })
    @Embedded
    private CampaignId campaignId;

    @AttributeOverrides({
        @AttributeOverride(name = "id", column = @Column(name = "blogger_id", nullable = false))
    })
    @Embedded
    private UserId bloggerId;

    @Column(nullable = false)
    private String blogUrl;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String reason;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    private String rejectionReason;

    private String reviewUrl;

    @PrePersist
    public void prePersist() {
        if (this.id == null) {
            this.id = ApplicationId.generate();
        }
    }
}
