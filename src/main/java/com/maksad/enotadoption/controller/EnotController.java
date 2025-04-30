package com.maksad.enotadoption.controller;

import com.maksad.enotadoption.model.Enot;
import com.maksad.enotadoption.repository.EnotRepository;
import org.springframework.web.bind.annotation.*;

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
        return enotRepository.findAll();
    }

    @PostMapping
    public Enot createEnot(@RequestBody Enot enot) {
        return enotRepository.save(enot);
    }

    @PutMapping("/{id}/name")
    public Enot giveUserName(@PathVariable Long id, @RequestBody String userGivenName) {
        Enot enot = enotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enot not found"));

        enot.setUserGivenName(userGivenName);
        return enotRepository.save(enot);
    }
}
