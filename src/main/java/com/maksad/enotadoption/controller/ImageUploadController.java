package com.maksad.enotadoption.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;

@RestController
@RequestMapping("/upload")
public class ImageUploadController {

    @Value("${enot.upload.dir}")
    private String uploadDir;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            String originalFilename = StringUtils.getFilename(file.getOriginalFilename());
            String safeFilename = UUID.randomUUID() + "-" + originalFilename.replaceAll("[^a-zA-Z0-9.\\-]", "_");
            Path path = Paths.get(uploadDir).resolve(safeFilename);
            Files.createDirectories(path.getParent());
            file.transferTo(path.toFile());

            return ResponseEntity.ok("/images/" + safeFilename);


        } catch (IOException e) {
            e.printStackTrace();  // Add this to see error details in console
            return ResponseEntity.internalServerError().body("Upload failed: " + e.getMessage());
        }
    }

}
