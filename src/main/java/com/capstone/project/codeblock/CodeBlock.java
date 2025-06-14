package com.capstone.project.codeblock;

import com.capstone.project.editor.Editor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "codeblocks")
public class CodeBlock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String language; // 코드 언어 (Java, Python 등)

    @Column(name = "code", columnDefinition = "TEXT")
    @Lob
    private String code;     // 소스 코드 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "editor_id")
    @JsonBackReference
    private Editor editor;  // 해당 코드 블록이 속한 게시글

    // 코드 블록 언어별 카운트 반영
    public void addCodeBlockToEditor(Editor editor) {
        this.setEditor(editor);

        // 코드 블록 언어에 따라 해당 언어의 카운트 증가
        if ("Java".equalsIgnoreCase(this.language)) {
            editor.incrementJavaCount();
        } else if ("Python".equalsIgnoreCase(this.language)) {
            editor.incrementPythonCount();
        } else if ("C".equalsIgnoreCase(this.language)) {
            editor.incrementCCount();
        } else if ("C++".equalsIgnoreCase(this.language)) {
            editor.incrementCPlusPlusCount();
        } else if ("JavaScript".equalsIgnoreCase(this.language)) {
            editor.incrementJavaScriptCount();
        } else if ("HTML".equalsIgnoreCase(this.language)) {
            editor.incrementHtmlCount();
        } else if ("CSS".equalsIgnoreCase(this.language)) {
            editor.incrementCssCount();
        }
    }
}
