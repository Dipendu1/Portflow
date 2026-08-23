package com.portflow.backend.service;

import com.portflow.backend.entity.Education;
import com.portflow.backend.repository.EducationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    // GET all education records
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    // GET education by ID
    public Optional<Education> getEducationById(Long id) {
        return educationRepository.findById(id);
    }

    // CREATE education
    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }

    // UPDATE education
    public Optional<Education> updateEducation(
            Long id,
            Education updatedEducation) {

        return educationRepository.findById(id)
                .map(existingEducation -> {

                    existingEducation.setYear(
                            updatedEducation.getYear()
                    );

                    existingEducation.setType(
                            updatedEducation.getType()
                    );

                    existingEducation.setDegree(
                            updatedEducation.getDegree()
                    );

                    existingEducation.setField(
                            updatedEducation.getField()
                    );

                    existingEducation.setInstitution(
                            updatedEducation.getInstitution()
                    );

                    existingEducation.setDescription(
                            updatedEducation.getDescription()
                    );

                    return educationRepository.save(
                            existingEducation
                    );
                });
    }

    // DELETE education
    public boolean deleteEducation(Long id) {

        if (!educationRepository.existsById(id)) {
            return false;
        }

        educationRepository.deleteById(id);

        return true;
    }
}