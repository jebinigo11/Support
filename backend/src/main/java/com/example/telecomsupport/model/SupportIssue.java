package com.example.telecomsupport.model;

import jakarta.persistence.*;

@Entity
public class SupportIssue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String issueType;
    private String description;

    public SupportIssue() {}

    public SupportIssue(String issueType, String description) {
        this.issueType = issueType;
        this.description = description;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIssueType() { return issueType; }
    public void setIssueType(String issueType) { this.issueType = issueType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
