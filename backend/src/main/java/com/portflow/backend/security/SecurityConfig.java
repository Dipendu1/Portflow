
package com.portflow.backend.security;

import org.springframework.beans.factory.annotation.Value;
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

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    // Frontend URL from Render Environment Variable
    @Value("${FRONTEND_URL}")
    private String frontendUrl;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter
    ) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }


    // =========================
    // PASSWORD ENCODER
    // =========================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(frontendUrl)
        );

        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type",
                        "Accept"
                )
        );

        configuration.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );

        configuration.setAllowCredentials(true);


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }


    // =========================
    // SECURITY
    // =========================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

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
                    // PUBLIC ROOT
                    // =========================

                    auth.requestMatchers("/")
                            .permitAll();


                    // =========================
                    // AUTH
                    // =========================

                    auth.requestMatchers(
                            "/api/auth/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC PROFILE
                    // =========================

                    auth.requestMatchers(
                            "/api/profile"
                    ).permitAll();


                    // =========================
                    // PUBLIC SKILLS
                    // =========================

                    auth.requestMatchers(
                            "/api/skills/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC PROJECTS
                    // =========================

                    auth.requestMatchers(
                            "/api/projects/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC EXPERIENCE
                    // =========================

                    auth.requestMatchers(
                            "/api/experience/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC EDUCATION
                    // =========================

                    auth.requestMatchers(
                            "/api/education/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC CERTIFICATIONS
                    // =========================

                    auth.requestMatchers(
                            "/api/certifications/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC ACHIEVEMENTS
                    // =========================

                    auth.requestMatchers(
                            "/api/achievements/**"
                    ).permitAll();


                    // =========================
                    // PUBLIC CONTACT FORM
                    // =========================

                    auth.requestMatchers(
                            HttpMethod.POST,
                            "/api/contact"
                    ).permitAll();


                    // =========================
                    // ADMIN VIEW CONTACT MESSAGES
                    // =========================

                    auth.requestMatchers(
                            HttpMethod.GET,
                            "/api/contact/**"
                    ).authenticated();


                    // =========================
                    // ADMIN DELETE CONTACT MESSAGES
                    // =========================

                    auth.requestMatchers(
                            HttpMethod.DELETE,
                            "/api/contact/**"
                    ).authenticated();


                    // =========================
                    // PUBLIC UPLOADS
                    // =========================

                    auth.requestMatchers(
                            "/uploads/**"
                    ).permitAll();


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
