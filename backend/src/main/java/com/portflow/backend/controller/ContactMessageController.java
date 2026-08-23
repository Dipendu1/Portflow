package com.portflow.backend.controller;

import com.portflow.backend.entity.ContactMessage;
import com.portflow.backend.service.ContactMessageService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService) {

        this.contactMessageService = contactMessageService;
    }

    // GET /api/contact
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {

        return ResponseEntity.ok(
                contactMessageService.getAllMessages()
        );
    }

    // GET /api/contact/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(
            @PathVariable Long id) {

        return contactMessageService
                .getMessageById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // POST /api/contact
    @PostMapping
    public ResponseEntity<ContactMessage> createMessage(
            @RequestBody ContactMessage contactMessage) {

        ContactMessage createdMessage =
                contactMessageService.createMessage(
                        contactMessage
                );

        return ResponseEntity.ok(createdMessage);
    }

    // DELETE /api/contact/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long id) {

        if (!contactMessageService.deleteMessage(id)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}