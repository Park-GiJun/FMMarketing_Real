package com.gijun.backend.campaign.dto;

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
    private String id;
    private String title;
    private String content;
    private String storeName;
    private String storeAddress;
    private LocalDateTime applicationDeadline;
    private LocalDateTime reviewDeadline;
    private int requiredBloggerCount;
    private String imageUrl;
    private String storeId;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int appliedCount;
    private int approvedCount;
    private int reviewCount;
}
