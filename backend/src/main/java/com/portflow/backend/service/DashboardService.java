package com.portflow.backend.service;

import com.portflow.backend.dto.DashboardStatsResponse;
import com.portflow.backend.repository.AchievementRepository;
import com.portflow.backend.repository.CertificationRepository;
import com.portflow.backend.repository.ContactMessageRepository;
import com.portflow.backend.repository.EducationRepository;
import com.portflow.backend.repository.ExperienceRepository;
import com.portflow.backend.repository.ProfileRepository;
import com.portflow.backend.repository.ProjectRepository;
import com.portflow.backend.repository.SkillRepository;

import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final AchievementRepository achievementRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardService(
            ProfileRepository profileRepository,
            ProjectRepository projectRepository,
            SkillRepository skillRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificationRepository certificationRepository,
            AchievementRepository achievementRepository,
            ContactMessageRepository contactMessageRepository
    ) {
        this.profileRepository = profileRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.achievementRepository = achievementRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public DashboardStatsResponse getStats() {

        return new DashboardStatsResponse(

                profileRepository.count(),

                projectRepository.count(),

                skillRepository.count(),

                experienceRepository.count(),

                educationRepository.count(),

                certificationRepository.count(),

                achievementRepository.count(),

                contactMessageRepository.count()
        );
    }
}