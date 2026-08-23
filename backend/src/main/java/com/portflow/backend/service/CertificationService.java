package com.portflow.backend.service;

import com.portflow.backend.entity.Certification;
import com.portflow.backend.repository.CertificationRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificationService {

    private final CertificationRepository certificationRepository;

    public CertificationService(
            CertificationRepository certificationRepository) {

        this.certificationRepository = certificationRepository;
    }

    // GET all certifications
    public List<Certification> getAllCertifications() {

        return certificationRepository.findAll();
    }

    // GET certification by ID
    public Optional<Certification> getCertificationById(Long id) {

        return certificationRepository.findById(id);
    }

    // CREATE certification
    public Certification createCertification(
            Certification certification) {

        return certificationRepository.save(certification);
    }

    // UPDATE certification
    public Optional<Certification> updateCertification(
            Long id,
            Certification updatedCertification) {

        return certificationRepository.findById(id)
                .map(existingCertification -> {

                    existingCertification.setNumber(
                            updatedCertification.getNumber()
                    );

                    existingCertification.setTitle(
                            updatedCertification.getTitle()
                    );

                    existingCertification.setCategory(
                            updatedCertification.getCategory()
                    );

                    existingCertification.setOrganization(
                            updatedCertification.getOrganization()
                    );

                    existingCertification.setYear(
                            updatedCertification.getYear()
                    );

                    existingCertification.setDescription(
                            updatedCertification.getDescription()
                    );

                    existingCertification.setPdf(
                            updatedCertification.getPdf()
                    );

                    return certificationRepository.save(
                            existingCertification
                    );
                });
    }

    // DELETE certification
    public boolean deleteCertification(Long id) {

        if (!certificationRepository.existsById(id)) {
            return false;
        }

        certificationRepository.deleteById(id);

        return true;
    }
}