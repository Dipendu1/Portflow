package com.portflow.backend.service;

import com.portflow.backend.entity.Experience;
import com.portflow.backend.repository.ExperienceRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExperienceService {

    private final ExperienceRepository experienceRepository;

    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }

    // GET all experiences
    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    // GET experience by ID
    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    // CREATE experience
    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    // UPDATE experience
    public Optional<Experience> updateExperience(
            Long id,
            Experience updatedExperience) {

        return experienceRepository.findById(id)
                .map(existingExperience -> {

                    existingExperience.setType(
                            updatedExperience.getType()
                    );

                    existingExperience.setPosition(
                            updatedExperience.getPosition()
                    );

                    existingExperience.setCompany(
                            updatedExperience.getCompany()
                    );

                    existingExperience.setDuration(
                            updatedExperience.getDuration()
                    );

                    existingExperience.setDescription(
                            updatedExperience.getDescription()
                    );

                    existingExperience.setHighlights(
                            updatedExperience.getHighlights()
                    );

                    existingExperience.setTechnologies(
                            updatedExperience.getTechnologies()
                    );

                    existingExperience.setCertificate(
                            updatedExperience.getCertificate()
                    );

                    return experienceRepository.save(
                            existingExperience
                    );
                });
    }

    // DELETE experience
    public boolean deleteExperience(Long id) {

        if (!experienceRepository.existsById(id)) {
            return false;
        }

        experienceRepository.deleteById(id);

        return true;
    }
}