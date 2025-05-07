package com.maksad.enotadoption.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class EnotTest {

    @Test
    void testEnotProperties() {
        Enot enot = new Enot();
        enot.setOriginalName("Rocky");
        enot.setAge(3);
        enot.setFavoriteFood("Fish");
        enot.setPhotoUrl("https://example.com/rocky.jpg");
        enot.setUserGivenName("Mr. Fluffy");

        assertEquals("Rocky", enot.getOriginalName());
        assertEquals(3, enot.getAge());
        assertEquals("Fish", enot.getFavoriteFood());
        assertEquals("https://example.com/rocky.jpg", enot.getPhotoUrl());
        assertEquals("Mr. Fluffy", enot.getUserGivenName());
    }
}
