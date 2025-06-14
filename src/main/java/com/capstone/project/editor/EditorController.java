package com.capstone.project.editor;

import com.capstone.project.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")  // React 도메인에서 접근 허용
@RestController
@RequestMapping("/api/editors")
public class EditorController {

    private final EditorRepository editorRepository;
    private final EditorService editorService;
    private final MemberRepository memberRepository;

    @Autowired
    public EditorController(EditorRepository editorRepository, EditorService editorService, MemberRepository memberRepository) {
        this.editorRepository = editorRepository;
        this.editorService = editorService;
        this.memberRepository = memberRepository;
    }

    // 게시글 추가 (memberId 검증 포함)
    @PostMapping("/{memberId}")
    public ResponseEntity<Editor> createEditor(
            @RequestBody EditorRequestDto requestDto,
            @PathVariable Long memberId
    ) {
        // 디버깅 로그 추가
        System.out.println("📌 Received memberId: " + memberId);
        System.out.println("📌 Received editorTitle: " + requestDto.getEditorTitle());
        System.out.println("📌 Received editorContent: " + requestDto.getEditorContent());

        // memberId가 null이면 예외 처리
        if (memberId == null) {
            throw new IllegalArgumentException("❌ memberId가 null입니다!");
        }

        Editor editor = editorService.createEditor(requestDto, memberId);
        return ResponseEntity.ok(editor);
    }

    // 📌 게시글 전체 조회 (페이지네이션 적용)
    @GetMapping
    public Page<EditorResponseDto> getAllEditors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("editorCreatedAt")));
        Page<Editor> editorPage = editorRepository.findAll(pageable);

        return editorPage.map(editor -> {
            // memberId로 Member 엔티티에서 name 가져오기
            String authorName = "알 수 없음";
            if (editor.getMember() != null) {
                authorName = editor.getMember().getName();
            }

            return new EditorResponseDto(editor, authorName, null, editorPage.getTotalPages(), editorPage.getTotalElements(), editorPage.getNumber(), editorPage.getSize());
        });
    }

    // 📌 게시글 단건 조회 (조회수 증가)
    @GetMapping("/{editorId}")
    public ResponseEntity<EditorResponseDto> getEditorById(@PathVariable Long editorId) {
        editorService.incrementViewCount(editorId);
        Editor editor = editorService.getEditorById(editorId);

        // memberId로 Member 엔티티에서 name 가져오기
        String authorName = "알 수 없음";
        if (editor.getMember() != null) {
            authorName = editor.getMember().getName();
        }

        return ResponseEntity.ok(new EditorResponseDto(editor, authorName, null, 1, 1, 1, 1));
    }

    // 게시글 수정
    @PutMapping("/{editorId}")
    public ResponseEntity<Editor> updateEditor(@PathVariable Long editorId, @RequestBody EditorRequestDto requestDto) {
        Editor updatedEditor = editorService.updateEditor(editorId, requestDto);
        return ResponseEntity.ok(updatedEditor);
    }

    // 게시글 삭제
    @DeleteMapping("/{editorId}")
    public ResponseEntity<Void> deleteEditor(@PathVariable Long editorId) {
        editorService.deleteEditor(editorId);
        return ResponseEntity.noContent().build();
    }

    // 좋아요 증가
    @PostMapping("/{editorId}/like")
    public ResponseEntity<Editor> likeEditor(@PathVariable Long editorId) {
        Editor editor = editorService.likeEditor(editorId);
        return ResponseEntity.ok(editor);
    }

    // 좋아요 감소
    @PostMapping("/{editorId}/unlike")
    public ResponseEntity<Editor> unlikePost(@PathVariable Long editorId) {
        Editor editor = editorService.unlikeEditor(editorId);
        return ResponseEntity.ok(editor);
    }
}
