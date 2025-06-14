package com.capstone.project.codeblock;

public class CodeBlockRequestDto {

    private String language;  // 코드 언어
    private String code;      // 코드 내용

    // Getters and Setters
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
