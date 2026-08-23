package com.portflow.backend.service;

import com.portflow.backend.entity.Admin;
import com.portflow.backend.repository.AdminRepository;
import com.portflow.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String login(String username, String password) {

        Admin admin = adminRepository
                .findByUsername(username)
                .orElse(null);

        if (admin == null) {
            return null;
        }

        if (!passwordEncoder.matches(
                password,
                admin.getPassword())) {

            return null;
        }

        return jwtService.generateToken(
                admin.getUsername(),
                admin.getRole()
        );
    }
}