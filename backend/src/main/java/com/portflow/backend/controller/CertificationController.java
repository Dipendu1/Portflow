
package com.portflow.backend.controller;

import com.portflow.backend.entity.Certification;
import com.portflow.backend.service.CertificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(
            CertificationService certificationService) {

        this.certificationService = certificationService;
    }


    // =========================================
    // GET ALL CERTIFICATIONS
    // GET /api/certifications
    // =========================================

    @GetMapping
    public ResponseEntity<List<Certification>>
    getAllCertifications() {

        return ResponseEntity.ok(
                certificationService.getAllCertifications()
        );
    }


    // =========================================
    // GET CERTIFICATION BY ID
    // GET /api/certifications/{id}
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Certification>
    getCertificationById(
            @PathVariable Long id) {

        return certificationService
                .getCertificationById(id)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }


    // =========================================
    // CREATE CERTIFICATION
    // POST /api/certifications
    // =========================================

    @PostMapping
    public ResponseEntity<Certification>
    createCertification(
            @RequestBody Certification certification) {

        Certification createdCertification =
                certificationService.createCertification(
                        certification
                );

        return ResponseEntity.ok(createdCertification);
    }


    // =========================================
    // UPDATE CERTIFICATION
    // PUT /api/certifications/{id}
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<Certification>
    updateCertification(
            @PathVariable Long id,
            @RequestBody Certification certification) {

        return certificationService
                .updateCertification(id, certification)
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }


    // =========================================
    // DELETE CERTIFICATION
    // DELETE /api/certifications/{id}
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteCertification(
            @PathVariable Long id) {

        if (!certificationService.deleteCertification(id)) {

            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }


    // =========================================
    // UPLOAD CERTIFICATION PDF
    // POST /api/certifications/upload
    // =========================================

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCertificate(
            @RequestParam("file") MultipartFile file) {

        try {

            // Check if file exists
            if (file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Please select a PDF file.");
            }


            // Check PDF type
            String contentType =
                    file.getContentType();

            if (!"application/pdf"
                    .equalsIgnoreCase(contentType)) {

                return ResponseEntity
                        .badRequest()
                        .body("Only PDF files are allowed.");
            }


            // Create upload directory
            Path uploadDirectory =
                    Paths.get("uploads/certificates");

            Files.createDirectories(
                    uploadDirectory
            );


            // Get original filename
            String originalFilename =
                    file.getOriginalFilename();

            if (originalFilename == null ||
                    originalFilename.trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid file name.");
            }


            // Make filename safe
            String safeFilename =
                    originalFilename
                            .replaceAll(
                                    "[^a-zA-Z0-9._-]",
                                    "_"
                            );


            // Create unique filename
            String filename =
                    System.currentTimeMillis()
                    + "_"
                    + safeFilename;


            // Final file path
            Path filePath =
                    uploadDirectory.resolve(
                            filename
                    );


            // Save PDF
            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );


            // URL returned to frontend
            String fileUrl =
                    "/uploads/certificates/"
                    + filename;


            return ResponseEntity.ok(
                    fileUrl
            );


        } catch (IOException e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Failed to upload certificate."
                    );
        }
    }
}

