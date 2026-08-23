package com.portflow.backend.config;

import com.portflow.backend.entity.Admin;
import com.portflow.backend.repository.AdminRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createDefaultAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (adminRepository.findByUsername("admin").isEmpty()) {

                Admin admin = new Admin();

                admin.setUsername("admin");

                admin.setPassword(
                        passwordEncoder.encode("Admin@123")
                );

                admin.setRole("ADMIN");

                adminRepository.save(admin);

                System.out.println("=================================");
                System.out.println("DEFAULT ADMIN CREATED");
                System.out.println("Username: admin");
                System.out.println("Password: Admin@123");
                System.out.println("=================================");

            } else {

                System.out.println("Admin already exists.");

            }
        };
    }
}