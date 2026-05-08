package com.example.demo.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        String username,
        String role
) {
}
