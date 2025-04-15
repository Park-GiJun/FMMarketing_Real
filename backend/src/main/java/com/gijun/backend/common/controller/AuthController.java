package com.gijun.backend.common.controller;

import com.gijun.backend.common.dto.ApiResponse;
import com.gijun.backend.common.dto.LoginRequest;
import com.gijun.backend.common.dto.LoginResponse;
import com.gijun.backend.common.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ApiResponse.success("Login successful", authService.login(loginRequest));
    }
}
