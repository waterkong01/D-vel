package com.capstone.project.editor;

import com.capstone.project.reply.ReplyResponseDto;
import com.capstone.project.codeblock.CodeBlockResponseDto;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@Getter
public class EditorResponseDto {
    private Long editorId;
    private String editorTitle;
    private String editorContent;
    private LocalDateTime editorCreatedAt;
    private String authorName;
    private List<CodeBlockResponseDto> codeBlocks;
    private List<ReplyResponseDto> replies;

    // 조회수와 좋아요 수 추가
    private Integer viewsCount;
    private Integer likesCount;

    // 페이지네이션 관련 필드
    private int totalPages;
    private long totalElements;
    private int currentPage;
    private int pageSize;

    public EditorResponseDto(Editor editor, String authorName, List<ReplyResponseDto> replies,
                             int totalPages, long totalElements, int currentPage, int pageSize) {
        this.editorId = editor.getEditorId();
        this.editorTitle = editor.getEditorTitle();
        this.editorContent = editor.getEditorContent();
        this.editorCreatedAt = editor.getEditorCreatedAt();
        this.authorName = authorName;
        this.codeBlocks = editor.getCodeBlocks().stream()
                .map(CodeBlockResponseDto::new)
                .collect(Collectors.toList());
        this.replies = replies;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.currentPage = currentPage;
        this.pageSize = pageSize;

        // 조회수와 좋아요 수 설정
        this.viewsCount = editor.getViewsCount();
        this.likesCount = editor.getLikesCount();
    }
}
