package com.gijun.backend.blogger.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
    
    @NotBlank(message = "Blog URL is required")
    private String blogUrl;
    
    @NotBlank(message = "Application reason is required")
    private String reason;
}
