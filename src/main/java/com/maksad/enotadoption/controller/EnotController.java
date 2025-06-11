package com.maksad.enotadoption.controller;

import org.springframework.http.ResponseEntity;
import com.maksad.enotadoption.model.Enot;
import com.maksad.enotadoption.repository.EnotRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;


import java.util.List;

@RestController
@RequestMapping("/enots")
public class EnotController {

    private final EnotRepository enotRepository;

    public EnotController(EnotRepository enotRepository) {
        this.enotRepository = enotRepository;
    }

    @GetMapping
    public List<Enot> getAllEnots() {
        System.out.println("Fetching all raccoons...");
        return enotRepository.findAll();
    }

    @PostMapping
    public Enot createEnot(@RequestBody Enot enot) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        enot.setCreatedBy(username);
        return enotRepository.save(enot);
    }

    @PutMapping("/{id}/name")
    public Enot giveUserName(@PathVariable Long id, @RequestBody String userGivenName) {
        Enot enot = enotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Raccoon not found"));

        enot.setUserGivenName(userGivenName);
        return enotRepository.save(enot);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnot(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("User attempting delete: " + username);
        return enotRepository.findById(id).map(enot -> {
            if (!username.equals(enot.getCreatedBy()) && !username.equals("admin")) {
                return ResponseEntity.status(403).body("You are not allowed to delete this raccoon.");
            }
            enotRepository.delete(enot);
            return ResponseEntity.ok("Raccoon deleted.");
        }).orElse(ResponseEntity.notFound().build());
    }

}
