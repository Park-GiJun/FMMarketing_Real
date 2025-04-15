package com.gijun.backend.blogger.dto;

import com.gijun.backend.admin.model.id.CampaignId;
import com.gijun.backend.blogger.model.id.ApplicationId;
import com.gijun.backend.common.model.id.UserId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
    private ApplicationId id;
    private CampaignId campaignId;
    private UserId bloggerId;
    private String bloggerName;
    private String bloggerEmail;
    private String blogUrl;
    private String reason;
    private String status;
    private String rejectionReason;
    private String reviewUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String campaignTitle;
    private String storeName;
}
