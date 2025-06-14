package com.capstone.project.reply;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/editors/{editorId}/replies")
public class ReplyController {

    private final ReplyService replyService;

    @Autowired
    public ReplyController(ReplyService replyService) {
        this.replyService = replyService;
    }

    // 댓글 추가 (대댓글 포함)
    @PostMapping
    public ResponseEntity<Reply> createReply(@PathVariable Long editorId, @RequestBody ReplyRequestDto requestDto) {
        Reply reply = replyService.createReply(editorId, requestDto);
        return ResponseEntity.ok(reply);
    }

    // 댓글 조회 (대댓글 포함)
    @GetMapping
    public ResponseEntity<List<ReplyResponseDto>> getReplies(@PathVariable Long editorId) {
        List<ReplyResponseDto> replies = replyService.getRepliesByEditorId(editorId);
        return ResponseEntity.ok(replies);
    }

    // 댓글 수정
    @PutMapping("/{replyId}")
    public ResponseEntity<Reply> updateReply(@PathVariable Long editorId, @PathVariable Long replyId, @RequestBody ReplyRequestDto requestDto) {
        Reply updatedReply = replyService.updateReply(replyId, requestDto);
        return ResponseEntity.ok(updatedReply);
    }

    // 댓글 삭제
    @DeleteMapping("/{replyId}")
    public ResponseEntity<Void> deleteReply(@PathVariable Long editorId, @PathVariable Long replyId) {
        replyService.deleteReply(replyId);
        return ResponseEntity.noContent().build();
    }
}
