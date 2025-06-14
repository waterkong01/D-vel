package com.capstone.project.reply;

import com.capstone.project.editor.Editor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Column(name = "content", columnDefinition = "TEXT")
    @Lob
    private String content;

    // 게시글과의 관계 (다대일)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "editor_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "replys"})
    private Editor editor;

    // 부모 댓글과의 관계 (대댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_reply_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "replies"})
    private Reply parentReplyId; // 부모 댓글 (대댓글 구현)

    // 대댓글 리스트
    @OneToMany(mappedBy = "parentReplyId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "parentReplyId"})
    private List<Reply> replies; // 대댓글 리스트

    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
