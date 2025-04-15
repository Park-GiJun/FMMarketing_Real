package com.gijun.backend.admin.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CampaignRequest {
    
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    @NotBlank(message = "Store name is required")
    private String storeName;
    
    @NotBlank(message = "Store address is required")
    private String storeAddress;
    
    @NotNull(message = "Application deadline is required")
    @Future(message = "Application deadline must be in the future")
    private LocalDateTime applicationDeadline;
    
    @NotNull(message = "Review deadline is required")
    @Future(message = "Review deadline must be in the future")
    private LocalDateTime reviewDeadline;
    
    @NotNull(message = "Required blogger count is required")
    @Min(value = 1, message = "Required blogger count must be at least 1")
    private int requiredBloggerCount;
    
    private String imageUrl;
}
