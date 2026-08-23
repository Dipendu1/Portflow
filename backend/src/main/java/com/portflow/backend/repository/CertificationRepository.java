package com.portflow.backend.repository;

import com.portflow.backend.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificationRepository
        extends JpaRepository<Certification, Long> {
}