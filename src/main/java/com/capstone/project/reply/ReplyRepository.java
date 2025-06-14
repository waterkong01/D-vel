package com.capstone.project.reply;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findByEditor_EditorIdAndParentReplyIdIsNull(Long editorId); // 부모 댓글만 조회
    List<Reply> findByParentReplyId_ReplyId(Long parentReplyId); // 특정 댓글의 대댓글 조회
    List<Reply> findByEditor_EditorId(Long editorId);
}
