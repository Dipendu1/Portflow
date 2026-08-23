package com.portflow.backend.controller;

import com.portflow.backend.entity.Skill;
import com.portflow.backend.service.SkillService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    // GET /api/skills
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {

        return ResponseEntity.ok(
                skillService.getAllSkills()
        );
    }

    // GET /api/skills/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(
            @PathVariable Long id) {

        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // POST /api/skills
    @PostMapping
    public ResponseEntity<Skill> createSkill(
            @RequestBody Skill skill) {

        Skill createdSkill =
                skillService.createSkill(skill);

        return ResponseEntity.ok(createdSkill);
    }

    // PUT /api/skills/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(
            @PathVariable Long id,
            @RequestBody Skill skill) {

        return skillService.updateSkill(id, skill)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // DELETE /api/skills/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable Long id) {

        if (!skillService.deleteSkill(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}