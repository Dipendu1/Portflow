package com.portflow.backend.service;

import com.portflow.backend.entity.Achievement;
import com.portflow.backend.repository.AchievementRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;

    public AchievementService(
            AchievementRepository achievementRepository) {

        this.achievementRepository = achievementRepository;
    }

    // GET all achievements
    public List<Achievement> getAllAchievements() {

        return achievementRepository.findAll();
    }

    // GET achievement by ID
    public Optional<Achievement> getAchievementById(Long id) {

        return achievementRepository.findById(id);
    }

    // CREATE achievement
    public Achievement createAchievement(
            Achievement achievement) {

        return achievementRepository.save(achievement);
    }

    // UPDATE achievement
    public Optional<Achievement> updateAchievement(
            Long id,
            Achievement updatedAchievement) {

        return achievementRepository.findById(id)
                .map(existingAchievement -> {

                    existingAchievement.setIcon(
                            updatedAchievement.getIcon()
                    );

                    existingAchievement.setCategory(
                            updatedAchievement.getCategory()
                    );

                    existingAchievement.setTitle(
                            updatedAchievement.getTitle()
                    );

                    existingAchievement.setDescription(
                            updatedAchievement.getDescription()
                    );

                    return achievementRepository.save(
                            existingAchievement
                    );
                });
    }

    // DELETE achievement
    public boolean deleteAchievement(Long id) {

        if (!achievementRepository.existsById(id)) {
            return false;
        }

        achievementRepository.deleteById(id);

        return true;
    }
}