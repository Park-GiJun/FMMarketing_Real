package com.gijun.backend.common.dto;

import com.gijun.backend.common.model.id.UserId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private UserId id;
    private String email;
    private String name;
    private String role;
    private String token;
}
