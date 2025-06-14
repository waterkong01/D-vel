package com.capstone.project.editor;

import com.capstone.project.codeblock.CodeBlock;
import com.capstone.project.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "editors")
public class Editor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "editor_id") // DB 컬럼명: editor_id
    private Long editorId;

    @Column(name = "editor_title", columnDefinition = "TEXT") // DB 컬럼명: editor_title
    @Lob
    private String editorTitle;

    @Column(name = "editor_content", columnDefinition = "TEXT") // DB 컬럼명: editor_content
    @Lob
    private String editorContent;

    @Column(name = "editor_created_at", updatable = false) // 작성 시간 컬럼 추가
    private LocalDateTime editorCreatedAt; // 게시글 생성 시간

    @PrePersist
    public void onCreate() {
        this.editorCreatedAt = LocalDateTime.now(); // 게시글 생성 시 현재 시간 자동 저장
    }

    // 각 언어에 해당하는 코드 블록 개수를 추적하는 칼럼
    @Column(name = "java_count")
    private Integer javaCount = 0;

    @Column(name = "python_count")
    private Integer pythonCount = 0;

    @Column(name = "c_count")
    private Integer cCount = 0;

    @Column(name = "c_plus_plus_count")
    private Integer cPlusPlusCount = 0;

    @Column(name = "javascript_count")
    private Integer javaScriptCount = 0;

    @Column(name = "html_count")
    private Integer htmlCount = 0;

    @Column(name = "css_count")
    private Integer cssCount = 0;

    // 조회 수 추적
    @Column(name = "views_count")
    private Integer ViewsCount = 0;

    // 좋아요 수 추적
    @Column(name = "likes_count")
    private Integer likesCount = 0;

    @OneToMany(mappedBy = "editor", cascade = CascadeType.ALL)
    private List<CodeBlock> codeBlocks = new ArrayList<>(); // 코드 블록 리스트

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    // 언어별 코드 블록 개수 증가 메서드
    public void incrementJavaCount() {
        this.javaCount++;
    }

    public void incrementPythonCount() {
        this.pythonCount++;
    }

    public void incrementCCount() {
        this.cCount++;
    }

    public void incrementCPlusPlusCount() {
        this.cPlusPlusCount++;
    }

    public void incrementJavaScriptCount() {
        this.javaScriptCount++;
    }

    public void incrementHtmlCount() {
        this.htmlCount++;
    }

    public void incrementCssCount() {
        this.cssCount++;
    }

    // 기존 카운트를 초기화하는 메서드
    public void resetLanguageCounts() {
        this.javaCount = 0;
        this.pythonCount = 0;
        this.cCount = 0;
        this.cPlusPlusCount = 0;
        this.javaScriptCount = 0;
        this.htmlCount = 0;
        this.cssCount = 0;
    }

    // 좋아요 수 증가 메서드
    public void incrementLikes() {
        this.likesCount++;
    }

    // 좋아요 수 감소 메서드
    public void decrementLikes() {
        if (this.likesCount > 0) {
            this.likesCount--;
        }
    }

    // 작성자 이름을 반환하는 메서드
    public String getAuthorName() {
        return member != null ? member.getName() : "알 수 없음";
    }

}

