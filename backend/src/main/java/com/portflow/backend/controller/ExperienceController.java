package com.portflow.backend.controller;

import com.portflow.backend.entity.Experience;
import com.portflow.backend.service.ExperienceService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(
            ExperienceService experienceService) {

        this.experienceService = experienceService;
    }

    // GET /api/experience
    @GetMapping
    public ResponseEntity<List<Experience>> getAllExperiences() {

        return ResponseEntity.ok(
                experienceService.getAllExperiences()
        );
    }

    // GET /api/experience/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(
            @PathVariable Long id) {

        return experienceService.getExperienceById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // POST /api/experience
    @PostMapping
    public ResponseEntity<Experience> createExperience(
            @RequestBody Experience experience) {

        Experience createdExperience =
                experienceService.createExperience(
                        experience
                );

        return ResponseEntity.ok(createdExperience);
    }

    // PUT /api/experience/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(
            @PathVariable Long id,
            @RequestBody Experience experience) {

        return experienceService.updateExperience(
                id,
                experience
        )
        .map(ResponseEntity::ok)
        .orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    // DELETE /api/experience/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(
            @PathVariable Long id) {

        if (!experienceService.deleteExperience(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}