package com.portflow.backend.service;

import com.portflow.backend.entity.Skill;
import com.portflow.backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    // GET all skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // GET skill by ID
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    // CREATE skill
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // UPDATE skill
    public Optional<Skill> updateSkill(Long id, Skill updatedSkill) {

        return skillRepository.findById(id)
                .map(existingSkill -> {

                    existingSkill.setCategory(updatedSkill.getCategory());
                    existingSkill.setName(updatedSkill.getName());
                    existingSkill.setIcon(updatedSkill.getIcon());

                    return skillRepository.save(existingSkill);
                });
    }

    // DELETE skill
    public boolean deleteSkill(Long id) {

        if (!skillRepository.existsById(id)) {
            return false;
        }

        skillRepository.deleteById(id);
        return true;
    }
}