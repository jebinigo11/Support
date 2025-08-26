package com.example.telecomsupport.controller;

import com.example.telecomsupport.model.SupportIssue;
import com.example.telecomsupport.repository.SupportIssueRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:3001")
public class SupportIssueController {

    private final SupportIssueRepository repo;
    private final SimpMessagingTemplate messagingTemplate;

    public SupportIssueController(SupportIssueRepository repo, SimpMessagingTemplate messagingTemplate) {
        this.repo = repo;
        this.messagingTemplate = messagingTemplate;
    }

    @GetMapping
    public List<SupportIssue> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public SupportIssue create(@RequestBody SupportIssue issue) {
        SupportIssue saved = repo.save(issue);
        // realtime broadcast to subscribers
        messagingTemplate.convertAndSend("/topic/issues", saved);
        return saved;
    }
}
