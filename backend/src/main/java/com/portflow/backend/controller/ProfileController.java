package com.portflow.backend.controller;

import com.portflow.backend.entity.Profile;
import com.portflow.backend.service.ProfileService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")

public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // GET /api/profile
    @GetMapping
    public ResponseEntity<Profile> getProfile() {

        return profileService.getProfile()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/profile
    @PostMapping
    public ResponseEntity<Profile> createProfile(
            @RequestBody Profile profile) {

        Profile createdProfile =
                profileService.createProfile(profile);

        return ResponseEntity.ok(createdProfile);
    }

    // PUT /api/profile/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(
            @PathVariable Long id,
            @RequestBody Profile profile) {

        return profileService.updateProfile(id, profile)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}