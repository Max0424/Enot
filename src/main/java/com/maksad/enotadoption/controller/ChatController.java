package com.maksad.enotadoption.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Value("${openai.api.key}")
    private String apiKey;

    private static final String OPENAI_URL = "https://api.openai.com/v1/chat/completions";

    @PostMapping
    public ResponseEntity<String> chatWithRaccoonBot(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> payload = new HashMap<>();
        payload.put("model", "gpt-4o-mini");

        List<Map<String, String>> messages = List.of(
                Map.of("role", "system", "content", "You are a helpful raccoon expert. Only talk about raccoons."),
                Map.of("role", "user", "content", userMessage)
        );
        payload.put("messages", messages);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(OPENAI_URL, entity, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            String reply = (String) ((Map<String, Object>) choices.get(0).get("message")).get("content");
            return ResponseEntity.ok(reply.trim());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
