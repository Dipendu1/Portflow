package com.portflow.backend.controller;

import com.portflow.backend.entity.Achievement;
import com.portflow.backend.service.AchievementService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achievements")
@CrossOrigin(origins = "http://localhost:5173")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(
            AchievementService achievementService) {

        this.achievementService = achievementService;
    }

    // GET /api/achievements
    @GetMapping
    public ResponseEntity<List<Achievement>>
    getAllAchievements() {

        return ResponseEntity.ok(
                achievementService.getAllAchievements()
        );
    }

    // GET /api/achievements/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Achievement>
    getAchievementById(
            @PathVariable Long id) {

        return achievementService
                .getAchievementById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // POST /api/achievements
    @PostMapping
    public ResponseEntity<Achievement>
    createAchievement(
            @RequestBody Achievement achievement) {

        Achievement createdAchievement =
                achievementService.createAchievement(
                        achievement
                );

        return ResponseEntity.ok(createdAchievement);
    }

    // PUT /api/achievements/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Achievement>
    updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement achievement) {

        return achievementService
                .updateAchievement(id, achievement)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // DELETE /api/achievements/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteAchievement(
            @PathVariable Long id) {

        if (!achievementService.deleteAchievement(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}