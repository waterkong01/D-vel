package com.capstone.project.codeblock;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CodeBlockResponseDto {

    private Long Id;   // 코드 블록 ID
    private String language;    // 코드 블록 언어
    private String code;        // 코드 내용

    // 생성자
    public CodeBlockResponseDto(CodeBlock codeBlock) {
        this.Id = codeBlock.getId();
        this.language = codeBlock.getLanguage();
        this.code = codeBlock.getCode();
    }
}
