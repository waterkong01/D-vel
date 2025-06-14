package com.capstone.project.editor;

import com.capstone.project.codeblock.CodeBlockRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class EditorRequestDto {

    private String editorTitle;
    private String editorContent;
    private List<CodeBlockRequestDto> codeBlocks;  // 코드 블록 리스트
    private Long memberId;  // memberId 추가

    // Getters and Setters
    public String getEditorTitle() {
        return editorTitle;
    }

    public void setEditorTitle(String editorTitle) {
        this.editorTitle = editorTitle;
    }

    public String getEditorContent() {
        return editorContent;
    }

    public void setEditorContent(String editorContent) {
        this.editorContent = editorContent;
    }

    public List<CodeBlockRequestDto> getCodeBlocks() {
        return codeBlocks;
    }

    public void setCodeBlocks(List<CodeBlockRequestDto> codeBlocks) {
        this.codeBlocks = codeBlocks;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId){
        this.memberId=memberId;
    }
}
