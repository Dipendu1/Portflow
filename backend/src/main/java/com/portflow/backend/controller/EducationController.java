package com.portflow.backend.controller;

import com.portflow.backend.entity.Education;
import com.portflow.backend.service.EducationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    private final EducationService educationService;

    public EducationController(
            EducationService educationService) {

        this.educationService = educationService;
    }

    // GET /api/education
    @GetMapping
    public ResponseEntity<List<Education>> getAllEducation() {

        return ResponseEntity.ok(
                educationService.getAllEducation()
        );
    }

    // GET /api/education/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Education> getEducationById(
            @PathVariable Long id) {

        return educationService.getEducationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // POST /api/education
    @PostMapping
    public ResponseEntity<Education> createEducation(
            @RequestBody Education education) {

        Education createdEducation =
                educationService.createEducation(
                        education
                );

        return ResponseEntity.ok(createdEducation);
    }

    // PUT /api/education/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Education> updateEducation(
            @PathVariable Long id,
            @RequestBody Education education) {

        return educationService.updateEducation(
                id,
                education
        )
        .map(ResponseEntity::ok)
        .orElseGet(
                () -> ResponseEntity.notFound().build()
        );
    }

    // DELETE /api/education/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable Long id) {

        if (!educationService.deleteEducation(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}