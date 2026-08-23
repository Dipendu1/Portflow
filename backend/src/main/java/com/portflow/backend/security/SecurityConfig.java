package com.portflow.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                // =========================
                // CSRF
                // =========================

                .csrf(csrf -> csrf.disable())


                // =========================
                // CORS
                // =========================

                .cors(cors -> {
                })


                // =========================
                // SESSION
                // =========================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =========================
                // PDF / IFRAME
                // =========================

                .headers(headers ->
                        headers.frameOptions(
                                HeadersConfigurer.FrameOptionsConfig::disable
                        )
                )


                // =========================
                // AUTHORIZATION
                // =========================

                .authorizeHttpRequests(auth -> {

                    // =========================
                    // AUTH
                    // =========================

                    auth.requestMatchers("/api/auth/**")
                            .permitAll();


                    // =========================
                    // PUBLIC PORTFOLIO APIs
                    // =========================

                    auth.requestMatchers("/api/profile")
                            .permitAll();

                    auth.requestMatchers("/api/skills/**")
                            .permitAll();

                    auth.requestMatchers("/api/projects/**")
                            .permitAll();

                    auth.requestMatchers("/api/experience/**")
                            .permitAll();

                    auth.requestMatchers("/api/education/**")
                            .permitAll();

                    auth.requestMatchers("/api/certifications/**")
                            .permitAll();

                    auth.requestMatchers("/api/achievements/**")
                            .permitAll();


                    // =========================
                    // CONTACT MESSAGES
                    // =========================

                    // Public users can SEND messages
                    auth.requestMatchers(
                            HttpMethod.POST,
                            "/api/contact"
                    ).permitAll();


                    // Admin must be logged in to VIEW messages
                    auth.requestMatchers(
                            HttpMethod.GET,
                            "/api/contact/**"
                    ).authenticated();


                    // Admin must be logged in to DELETE messages
                    auth.requestMatchers(
                            HttpMethod.DELETE,
                            "/api/contact/**"
                    ).authenticated();


                    // =========================
                    // UPLOADED FILES
                    // =========================

                    auth.requestMatchers("/uploads/**")
                            .permitAll();


                    // =========================
                    // EVERYTHING ELSE
                    // =========================

                    auth.anyRequest()
                            .authenticated();
                })


                // =========================
                // JWT FILTER
                // =========================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}