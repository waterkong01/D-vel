package com.capstone.project.reply;

import com.capstone.project.editor.Editor;
import com.capstone.project.editor.EditorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final EditorRepository editorRepository;

    @Autowired
    public ReplyService(ReplyRepository replyRepository, EditorRepository editorRepository) {
        this.replyRepository = replyRepository;
        this.editorRepository = editorRepository;
    }

    // 댓글 생성 (대댓글 포함)
    public Reply createReply(Long editorId, ReplyRequestDto requestDto) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

        Reply reply = new Reply();
        reply.setContent(requestDto.getContent());
        reply.setEditor(editor);

        // 부모 댓글 설정 (대댓글일 경우)
        if (requestDto.getParentReplyId() != null) {
            Reply parentReply = replyRepository.findById(requestDto.getParentReplyId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));
            reply.setParentReplyId(parentReply);
        }

        return replyRepository.save(reply);
    }

    // 게시글의 댓글 목록 조회 (대댓글 포함)
    public List<ReplyResponseDto> getRepliesByEditorId(Long editorId) {
        List<Reply> parentReplies = replyRepository.findByEditor_EditorIdAndParentReplyIdIsNull(editorId);
        return parentReplies.stream()
                .map(reply -> {
                    ReplyResponseDto dto = ReplyResponseDto.fromEntity(reply);
                    List<Reply> replies = replyRepository.findByParentReplyId_ReplyId(reply.getReplyId());
                    dto.setReplies(replies.stream().map(ReplyResponseDto::fromEntity).collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    // 댓글 수정
    public Reply updateReply(Long replyId, ReplyRequestDto requestDto) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
        reply.setContent(requestDto.getContent());
        return replyRepository.save(reply);
    }

    // 댓글 삭제 (대댓글 포함)
    public void deleteReply(Long replyId) {
        Reply reply = replyRepository.findById(replyId)
                .orElseThrow(() -> new IllegalArgumentException("댓글이 존재하지 않습니다."));

        replyRepository.delete(reply);
    }

    // 게시글의 모든 댓글 삭제
    public void deleteRepliesByEditorId(Long editorId) {
        List<Reply> replies = replyRepository.findByEditor_EditorId(editorId);
        replyRepository.deleteAll(replies);
    }
}
