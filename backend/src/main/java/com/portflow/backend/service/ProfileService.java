package com.portflow.backend.service;

import com.portflow.backend.entity.Profile;
import com.portflow.backend.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    // GET profile
    public Optional<Profile> getProfile() {
        return profileRepository.findAll()
                .stream()
                .findFirst();
    }

    // CREATE profile
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    // UPDATE profile
    public Optional<Profile> updateProfile(Long id, Profile updatedProfile) {

        return profileRepository.findById(id)
                .map(existingProfile -> {

                    existingProfile.setName(updatedProfile.getName());
                    existingProfile.setTitle(updatedProfile.getTitle());
                    existingProfile.setLocation(updatedProfile.getLocation());
                    existingProfile.setBio(updatedProfile.getBio());
                    existingProfile.setEmail(updatedProfile.getEmail());
                    existingProfile.setGithub(updatedProfile.getGithub());
                    existingProfile.setLinkedin(updatedProfile.getLinkedin());

                    return profileRepository.save(existingProfile);
                });
    }
}