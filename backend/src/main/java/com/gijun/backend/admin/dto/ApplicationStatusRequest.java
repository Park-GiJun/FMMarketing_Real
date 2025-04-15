package com.gijun.backend.admin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatusRequest {
    
    @NotBlank(message = "Status is required")
    private String status; // APPROVED, REJECTED
    
    private String reason; // Required when status is REJECTED
}
