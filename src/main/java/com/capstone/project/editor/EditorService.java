package com.capstone.project.editor;

import com.capstone.project.codeblock.CodeBlock;
import com.capstone.project.codeblock.CodeBlockRepository;
import com.capstone.project.codeblock.CodeBlockRequestDto;
import com.capstone.project.reply.ReplyService;
import com.capstone.project.member.entity.Member;
import com.capstone.project.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class EditorService {

    @Autowired
    private EditorRepository editorRepository;

    @Autowired
    private CodeBlockRepository codeBlockRepository;

    @Autowired
    private ReplyService replyService;

    @Autowired
    private MemberRepository memberRepository;

    // 게시글 추가 (memberId 검증 추가)
    @Transactional
    public Editor createEditor(EditorRequestDto requestDto, Long memberId) {
        if (memberId == null) {
            throw new IllegalArgumentException("❌ memberId는 null일 수 없습니다!");
        }

        Member member = memberRepository.findById(Math.toIntExact(memberId))
                .orElseThrow(() -> new IllegalArgumentException("❌ 존재하지 않는 회원 ID입니다: " + memberId));

        Editor editor = new Editor();
        editor.setEditorTitle(requestDto.getEditorTitle());
        editor.setEditorContent(requestDto.getEditorContent());
        editor.setMember(member);

        // 코드 블록 처리
        for (CodeBlockRequestDto codeBlockDto : requestDto.getCodeBlocks()) {
            CodeBlock codeBlock = new CodeBlock();
            codeBlock.setLanguage(codeBlockDto.getLanguage());
            codeBlock.setCode(codeBlockDto.getCode());
            codeBlock.setEditor(editor);

            // 언어별 코드 블록 수 증가
            switch (codeBlock.getLanguage().toLowerCase()) {
                case "java":
                    editor.incrementJavaCount();
                    break;
                case "python":
                    editor.incrementPythonCount();
                    break;
                case "c":
                    editor.incrementCCount();
                    break;
                case "c++":
                    editor.incrementCPlusPlusCount();
                    break;
                case "javascript":
                    editor.incrementJavaScriptCount();
                    break;
                case "html":
                    editor.incrementHtmlCount();
                    break;
                case "css":
                    editor.incrementCssCount();
                    break;
                default:
                    throw new IllegalArgumentException("지원하지 않는 언어입니다: " + codeBlock.getLanguage());
            }

            codeBlockRepository.save(codeBlock);
        }

        return editorRepository.save(editor);
    }

    // 게시글 조회
    public Editor getEditorById(Long editorId) {
        return editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID: " + editorId));
    }

    // 게시글 수정
    @Transactional
    public Editor updateEditor(Long editorId, EditorRequestDto requestDto) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID: " + editorId));

        editor.setEditorTitle(requestDto.getEditorTitle());
        editor.setEditorContent(requestDto.getEditorContent());

        // 기존 코드 블록 삭제
        codeBlockRepository.deleteByEditor(editor);
        editor.resetLanguageCounts();

        // 새로운 코드 블록 추가
        for (CodeBlockRequestDto codeBlockDto : requestDto.getCodeBlocks()) {
            CodeBlock codeBlock = new CodeBlock();
            codeBlock.setLanguage(codeBlockDto.getLanguage());
            codeBlock.setCode(codeBlockDto.getCode());
            codeBlock.setEditor(editor);

            switch (codeBlock.getLanguage().toLowerCase()) {
                case "java":
                    editor.incrementJavaCount();
                    break;
                case "python":
                    editor.incrementPythonCount();
                    break;
                case "c":
                    editor.incrementCCount();
                    break;
                case "c++":
                    editor.incrementCPlusPlusCount();
                    break;
                case "javascript":
                    editor.incrementJavaScriptCount();
                    break;
                case "html":
                    editor.incrementHtmlCount();
                    break;
                case "css":
                    editor.incrementCssCount();
                    break;
                default:
                    throw new IllegalArgumentException("지원하지 않는 언어입니다: " + codeBlock.getLanguage());
            }

            codeBlockRepository.save(codeBlock);
        }

        return editorRepository.save(editor);
    }

    // 게시글 삭제
    @Transactional
    public void deleteEditor(Long editorId) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID: " + editorId));

        // 코드 블록 삭제
        replyService.deleteRepliesByEditorId(editorId);
        codeBlockRepository.deleteByEditor(editor);
        editorRepository.delete(editor);
    }

    // 좋아요 증가
    @Transactional
    public Editor likeEditor(Long editorId) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID: " + editorId));

        editor.incrementLikes();
        return editorRepository.save(editor);
    }

    // 좋아요 감소
    @Transactional
    public Editor unlikeEditor(Long editorId) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. ID: " + editorId));

        editor.decrementLikes();
        return editorRepository.save(editor);
    }

    // 조회수 증가
    public Editor incrementViewCount(Long editorId) {
        Editor editor = editorRepository.findById(editorId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        editor.setViewsCount(editor.getViewsCount() + 1);
        return editorRepository.save(editor);
    }
}
