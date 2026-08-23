package com.portflow.backend.service;

import com.portflow.backend.entity.Project;
import com.portflow.backend.repository.ProjectRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // GET all projects
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    // GET project by ID
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    // CREATE project
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    // UPDATE project
    public Optional<Project> updateProject(
            Long id,
            Project updatedProject) {

        return projectRepository.findById(id)
                .map(existingProject -> {

                    existingProject.setNumber(
                            updatedProject.getNumber()
                    );

                    existingProject.setTitle(
                            updatedProject.getTitle()
                    );

                    existingProject.setCategory(
                            updatedProject.getCategory()
                    );

                    existingProject.setDescription(
                            updatedProject.getDescription()
                    );

                    existingProject.setImpact(
                            updatedProject.getImpact()
                    );

                    existingProject.setTechnologies(
                            updatedProject.getTechnologies()
                    );

                    existingProject.setAchievement(
                            updatedProject.getAchievement()
                    );

                    return projectRepository.save(existingProject);
                });
    }

    // DELETE project
    public boolean deleteProject(Long id) {

        if (!projectRepository.existsById(id)) {
            return false;
        }

        projectRepository.deleteById(id);

        return true;
    }
}