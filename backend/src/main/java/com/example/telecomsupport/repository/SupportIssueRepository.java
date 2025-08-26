package com.example.telecomsupport.repository;

import com.example.telecomsupport.model.SupportIssue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportIssueRepository extends JpaRepository<SupportIssue, Long> {
}
