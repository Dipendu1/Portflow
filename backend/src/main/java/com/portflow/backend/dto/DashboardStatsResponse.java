package com.portflow.backend.dto;

public class DashboardStatsResponse {

    private long profile;
    private long projects;
    private long skills;
    private long experience;
    private long education;
    private long certifications;
    private long achievements;
    private long messages;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(
            long profile,
            long projects,
            long skills,
            long experience,
            long education,
            long certifications,
            long achievements,
            long messages
    ) {
        this.profile = profile;
        this.projects = projects;
        this.skills = skills;
        this.experience = experience;
        this.education = education;
        this.certifications = certifications;
        this.achievements = achievements;
        this.messages = messages;
    }

    public long getProfile() {
        return profile;
    }

    public void setProfile(long profile) {
        this.profile = profile;
    }

    public long getProjects() {
        return projects;
    }

    public void setProjects(long projects) {
        this.projects = projects;
    }

    public long getSkills() {
        return skills;
    }

    public void setSkills(long skills) {
        this.skills = skills;
    }

    public long getExperience() {
        return experience;
    }

    public void setExperience(long experience) {
        this.experience = experience;
    }

    public long getEducation() {
        return education;
    }

    public void setEducation(long education) {
        this.education = education;
    }

    public long getCertifications() {
        return certifications;
    }

    public void setCertifications(long certifications) {
        this.certifications = certifications;
    }

    public long getAchievements() {
        return achievements;
    }

    public void setAchievements(long achievements) {
        this.achievements = achievements;
    }

    public long getMessages() {
        return messages;
    }

    public void setMessages(long messages) {
        this.messages = messages;
    }
}