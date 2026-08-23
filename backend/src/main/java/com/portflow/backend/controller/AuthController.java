package com.portflow.backend.controller;

import com.portflow.backend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        String token = authService.login(
                request.username(),
                request.password()
        );

        if (token == null) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        request.username(),
                        "ADMIN"
                )
        );
    }

    public record LoginRequest(
            String username,
            String password
    ) {
    }

    public record LoginResponse(
            String token,
            String username,
            String role
    ) {
    }
}