package com.example.domain.enumeration;

/**
 * The Language enumeration.
 */
public enum Language {
    Polish ("POLISH"),
    English ("ENGLISH");

    private final String value;


    Language(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
