package com.portflow.backend.service;

import com.portflow.backend.entity.ContactMessage;
import com.portflow.backend.repository.ContactMessageRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(
            ContactMessageRepository contactMessageRepository) {

        this.contactMessageRepository = contactMessageRepository;
    }

    // GET all messages
    public List<ContactMessage> getAllMessages() {

        return contactMessageRepository.findAll();
    }

    // GET message by ID
    public Optional<ContactMessage> getMessageById(Long id) {

        return contactMessageRepository.findById(id);
    }

    // CREATE message
    public ContactMessage createMessage(
            ContactMessage contactMessage) {

        return contactMessageRepository.save(contactMessage);
    }

    // DELETE message
    public boolean deleteMessage(Long id) {

        if (!contactMessageRepository.existsById(id)) {
            return false;
        }

        contactMessageRepository.deleteById(id);

        return true;
    }
}