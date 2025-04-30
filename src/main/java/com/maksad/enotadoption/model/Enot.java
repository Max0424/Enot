package com.maksad.enotadoption.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Enot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName;
    private int age;
    private String favoriteFood;
    private String photoUrl;
    private String userGivenName;

    // Constructors
    public Enot() {}

    public Enot(String originalName, int age, String favoriteFood, String photoUrl) {
        this.originalName = originalName;
        this.age = age;
        this.favoriteFood = favoriteFood;
        this.photoUrl = photoUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getOriginalName() { return originalName; }
    public void setOriginalName(String originalName) { this.originalName = originalName; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getFavoriteFood() { return favoriteFood; }
    public void setFavoriteFood(String favoriteFood) { this.favoriteFood = favoriteFood; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public String getUserGivenName() { return userGivenName; }
    public void setUserGivenName(String userGivenName) { this.userGivenName = userGivenName; }
}
