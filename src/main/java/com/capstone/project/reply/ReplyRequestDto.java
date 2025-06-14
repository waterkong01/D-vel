package com.capstone.project.reply;

public class ReplyRequestDto {
    private String content; // 댓글 내용
    private Long parentReplyId; // 대댓글일 경우 부모 댓글 ID

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getParentReplyId() {
        return parentReplyId;
    }

    public void setParentReplyId(Long parentReplyId) {
        this.parentReplyId = parentReplyId;
    }
}
