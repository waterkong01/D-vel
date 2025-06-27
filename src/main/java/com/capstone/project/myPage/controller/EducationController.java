package com.capstone.project.myPage.controller;

import com.capstone.project.myPage.dto.EducationResponseDto;
import com.capstone.project.myPage.entity.Education;
import com.capstone.project.myPage.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/education/{mypageId}")
public class EducationController {
    private final EducationService educationService;

    @Autowired
    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

/*    // 교육 추가
    @PostMapping
    public Education createEducation(@PathVariable Integer mypageId, @RequestBody Education education) {
        return educationService.createEducation(mypageId, education);
    }

    // 교육 특정 ID 조회
    @GetMapping
    public List<Education> getEducationByMypageId(@PathVariable Integer mypageId) {
        return educationService.getEducationByMypageId(mypageId);
    }

    // 교육 수정
    @PutMapping("/{educationId}")
    public ResponseEntity<Education> updateEducation(@PathVariable Integer mypageId, @PathVariable Integer educationId, @RequestBody Education education) {
        Education updatedEducation = educationService.updateEducation(mypageId, educationId, education);
        return ResponseEntity.ok(updatedEducation);
    }

    // 교육 삭제
    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Integer mypageId, @PathVariable Integer educationId) {
        educationService.deleteEducation(mypageId, educationId);
        return ResponseEntity.noContent().build();
    }*/
// 교육 추가
@PostMapping
public EducationResponseDto createEducation(@PathVariable Integer mypageId, @RequestBody Education education) {
    Education saved = educationService.createEducation(mypageId, education);
    return new EducationResponseDto(saved);
}

    // 교육 조회
    @GetMapping
    public List<EducationResponseDto> getEducationByMypageId(@PathVariable Integer mypageId) {
        return educationService.getEducationByMypageId(mypageId)
                .stream()
                .map(EducationResponseDto::new)
                .collect(Collectors.toList());
    }

    // 교육 수정
    @PutMapping("/{educationId}")
    public ResponseEntity<EducationResponseDto> updateEducation(
            @PathVariable Integer mypageId,
            @PathVariable Integer educationId,
            @RequestBody Education education) {
        Education updated = educationService.updateEducation(mypageId, educationId, education);
        return ResponseEntity.ok(new EducationResponseDto(updated));
    }

    // 교육 삭제
    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> deleteEducation(@PathVariable Integer mypageId, @PathVariable Integer educationId) {
        educationService.deleteEducation(mypageId, educationId);
        return ResponseEntity.noContent().build();
    }
}
