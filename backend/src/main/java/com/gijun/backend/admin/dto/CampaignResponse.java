package com.gijun.backend.admin.dto;

import com.gijun.backend.common.model.id.CampaignId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignResponse {
    private CampaignId id;
    private String title;
    private String content;
    private String storeName;
    private String storeAddress;
    private LocalDateTime applicationDeadline;
    private LocalDateTime reviewDeadline;
    private int requiredBloggerCount;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int appliedCount;
    private int approvedCount;
    private int reviewCount;
}
