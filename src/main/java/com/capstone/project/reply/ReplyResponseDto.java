package com.capstone.project.reply;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ReplyResponseDto {

    private Long replyId; // 댓글 ID
    private String content; // 댓글 내용
    private LocalDateTime createdAt; // 댓글 생성 시간
    private List<ReplyResponseDto> replies; // 대댓글 리스트

    // 생성자
    public ReplyResponseDto(Reply reply) {
        this.replyId = reply.getReplyId(); // 댓글 ID (기존 id -> replyId로 변경)
        this.content = reply.getContent();
        this.createdAt = reply.getCreatedAt();
    }

    // 정적 메소드로 Entity에서 DTO로 변환하는 로직 추가
    public static ReplyResponseDto fromEntity(Reply reply) {
        return new ReplyResponseDto(reply);
    }
}
