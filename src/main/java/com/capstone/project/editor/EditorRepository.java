package com.capstone.project.editor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EditorRepository extends JpaRepository<Editor, Long> {
    // JpaRepository는 이미 PagingAndSortingRepository를 상속하고 있어,
    // 페이지네이션을 위한 메서드(findAll(Pageable pageable))를 지원합니다.
}
