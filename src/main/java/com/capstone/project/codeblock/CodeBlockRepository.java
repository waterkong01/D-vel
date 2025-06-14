package com.capstone.project.codeblock;

import com.capstone.project.editor.Editor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeBlockRepository extends JpaRepository<CodeBlock, Long> {
    void deleteByEditor(Editor editor);  // 해당 게시글의 코드 블록 삭제
}
